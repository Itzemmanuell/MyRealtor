import { describe, it, expect, vi } from 'vitest'
import { createContactHandler } from '../api/contact'
import { validateEnquiry, contactEmail } from '../shared/contact'

const valid = { name: 'Test Visitor', email: 'visitor@example.com', phone: '', message: 'Please tell me about this sample home.', consent: true, propertyId: 1 }
const env = { RESEND_API_KEY: 'test-only-key', CONTACT_FROM_EMAIL: 'MyRealtor <test@example.com>' }
function request(body = valid, overrides = {}) {
  return { method: 'POST', body, headers: { origin: 'https://myrealtor.test', host: 'myrealtor.test', 'content-type': 'application/json', 'x-forwarded-for': '127.0.0.1' }, ...overrides }
}
async function invoke(handler, req = request()) {
  const result = { headers: {} }
  const res = { statusCode: 200, setHeader: (key,value) => { result.headers[key] = value }, end: (body) => { result.status = res.statusCode; result.body = JSON.parse(body) } }
  await handler(req,res)
  return result
}
describe('Enquiry validation', () => {
  it('trims valid text and allows no phone', () => expect(validateEnquiry({...valid,name:'  Test Visitor  '}).data.name).toBe('Test Visitor'))
  it.each([
    [null], [{...valid,email:'bad'}], [{...valid,name:' '}], [{...valid,message:'short'}],
    [{...valid,consent:false}], [{...valid,phone:'not a number'}], [{...valid,message:'a'.repeat(3001)}],
    [{...valid,name:{}}], [{...valid,propertyId:'1abc'}],
  ])('rejects malformed input %#', (input) => expect(validateEnquiry(input).error).toBeTruthy())
})
describe('Enquiry endpoint (mock delivery only)', () => {
  it('reports missing configuration without disclosing secrets', async () => {
    const handler = createContactHandler({env:{}})
    expect((await invoke(handler,request(null,{method:'GET'}))).body).toEqual({ready:false})
    expect((await invoke(handler)).status).toBe(503)
  })
  it('rejects methods, cross-origin requests, non-JSON, malformed JSON and oversize bodies', async () => {
    const send = vi.fn()
    const handler = createContactHandler({env,send})
    expect((await invoke(handler,request(null,{method:'DELETE'}))).status).toBe(405)
    expect((await invoke(handler,request(valid,{headers:{...request().headers,origin:'https://other.test'}}))).status).toBe(403)
    expect((await invoke(handler,request(valid,{headers:{...request().headers,'content-type':'text/plain'}}))).status).toBe(415)
    expect((await invoke(handler,request('{'))).status).toBe(400)
    expect((await invoke(handler,request('x'.repeat(20001)))).status).toBe(413)
    expect(send).not.toHaveBeenCalled()
  })
  it('blocks honeypots and invalid properties without sending', async () => {
    const send = vi.fn()
    const handler = createContactHandler({env,send})
    expect((await invoke(handler,request({...valid,website:'spam'}))).status).toBe(400)
    expect((await invoke(handler,request({...valid,propertyId:999}))).status).toBe(404)
    expect(send).not.toHaveBeenCalled()
  })
  it('sends only to Emmanuel, uses reply-to, and requires provider confirmation', async () => {
    const send = vi.fn().mockResolvedValue({ok:true,json:async()=>({id:'mock-id'})})
    const handler = createContactHandler({env,send})
    const result = await invoke(handler,request({...valid,to:'attacker@example.com'}))
    expect(result.status).toBe(200)
    const [url, options] = send.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    const payload = JSON.parse(options.body)
    expect(payload.to).toEqual([contactEmail])
    expect(payload.reply_to).toBe(valid.email)
    expect(payload.text).toContain('MR-1')
    expect(options.headers['Idempotency-Key']).toMatch(/^enquiry-/)
  })
  it('reports provider failure without leaking response details', async () => {
    const handler = createContactHandler({env,send:vi.fn().mockResolvedValue({ok:false,json:async()=>({message:'secret provider detail'})})})
    const result = await invoke(handler)
    expect(result.status).toBe(502)
    expect(JSON.stringify(result)).not.toContain('secret provider detail')
  })
  it('never reports success when delivery throws', async () => {
    const handler = createContactHandler({env,send:vi.fn().mockRejectedValue(new Error('network'))})
    expect((await invoke(handler)).status).toBe(502)
  })
  it('limits repeated submissions and permits retry after the window expires', async () => {
    let time = 1000
    const send = vi.fn().mockResolvedValue({ok:true,json:async()=>({id:'mock-id'})})
    const handler = createContactHandler({env,send,now:()=>time})
    for (let i=0;i<3;i++) expect((await invoke(handler)).status).toBe(200)
    expect((await invoke(handler)).status).toBe(429)
    time += 60001
    expect((await invoke(handler)).status).toBe(200)
  })
})
