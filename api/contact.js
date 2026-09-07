import { createHash } from 'node:crypto'
import { contactEmail, validateEnquiry } from '../shared/contact.js'
import { listings } from '../shared/listings.js'

const unavailable = 'Online messaging is not available right now. Please email ' + contactEmail + ' directly.'
const hash = (value) => createHash('sha256').update(value).digest('hex')

export function createContactHandler({ env = process.env, send = fetch, now = Date.now } = {}) {
  // Best-effort per-instance throttling; use the hosting firewall for a global limit.
  const attempts = new Map()
  return async function handler(req, res) {
    const reply = (status, data) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.end(JSON.stringify(data))
    }
    const ready = Boolean(env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL)
    if (req.method === 'GET') return reply(200, { ready })
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST')
      return reply(405, { error: 'Method not allowed.' })
    }
    try {
      const origin = new URL(req.headers.origin)
      if (origin.host !== req.headers.host || !['https:', 'http:'].includes(origin.protocol)) {
        return reply(403, { error: 'Please send your enquiry from the MyRealtor website.' })
      }
    } catch { return reply(403, { error: 'Please send your enquiry from the MyRealtor website.' }) }
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { error: 'Please submit the enquiry as JSON.' })
    if (Number(req.headers['content-length']) > 20000) return reply(413, { error: 'Your enquiry is too large.' })
    let input
    try {
      if (req.body !== undefined) {
        const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
        if (Buffer.byteLength(raw) > 20000) return reply(413, { error: 'Your enquiry is too large.' })
        input = JSON.parse(raw)
      } else {
        const chunks = []
        let size = 0
        for await (const chunk of req) {
          size += Buffer.byteLength(chunk)
          if (size > 20000) return reply(413, { error: 'Your enquiry is too large.' })
          chunks.push(Buffer.from(chunk))
        }
        input = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      }
    } catch { return reply(400, { error: 'The enquiry could not be read.' }) }
    if (input?.website) return reply(400, { error: 'The enquiry could not be accepted.' })
    const { data, error } = validateEnquiry(input)
    if (error) return reply(400, { error })
    const house = data.propertyId ? listings.find((item) => item.id === data.propertyId) : null
    if (data.propertyId && !house) return reply(404, { error: 'This property is no longer available.' })
    if (!ready) return reply(503, { error: unavailable })
    const timestamp = now()
    for (const [key, value] of attempts) if (timestamp - value.start >= 60000) attempts.delete(key)
    const address = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0]
    const key = hash(address)
    const previous = attempts.get(key)
    if (previous && previous.count >= 3) {
      res.setHeader('Retry-After', String(Math.max(1, Math.ceil((60000 - timestamp + previous.start) / 1000))))
      return reply(429, { error: 'Too many enquiries. Please wait a minute before trying again.' })
    }
    if (!previous && attempts.size >= 2048) return reply(503, { error: unavailable })
    attempts.set(key, { start: previous?.start ?? timestamp, count: (previous?.count ?? 0) + 1 })
    const text = [
      'MyRealtor enquiry', '', 'Name: ' + data.name, 'Reply email: ' + data.email,
      'Phone: ' + (data.phone || 'Not provided'),
      house ? 'Property: MR-' + house.id + ' — ' + house.name + ' (' + house.purpose + ')' : 'General enquiry',
      '', data.message,
    ].join('\n')
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json',
          'Idempotency-Key': 'enquiry-' + hash(text) },
        body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, to: [contactEmail],
          reply_to: data.email, subject: house ? 'MyRealtor enquiry: ' + house.name : 'MyRealtor enquiry', text }),
        signal: AbortSignal.timeout(10000),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.id) return reply(502, { error: unavailable })
      return reply(200, { ok: true })
    } catch { return reply(502, { error: 'Delivery could not be confirmed. Please email us directly before trying again.' }) }
  }
}
export default createContactHandler()
