import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { contactEmail, limits, validateEnquiry } from '../../shared/contact'
export default function ContactForm({ house }) {
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const [delivery, setDelivery] = useState('checking')
  const feedbackRef = useRef(null)
  const busy = useRef(false)
  useEffect(() => {
    const controller = new AbortController()
    let mounted = true
    const timeout = setTimeout(() => controller.abort(), 8000)
    fetch('/api/contact', { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((result) => { if (mounted) setDelivery(result.ready ? 'ready' : 'unavailable') })
      .catch(() => { if (mounted) setDelivery('unavailable') })
      .finally(() => clearTimeout(timeout))
    return () => { mounted = false; clearTimeout(timeout); controller.abort() }
  }, [])
  useEffect(() => { if (feedback) feedbackRef.current?.focus() }, [feedback])
  async function submit(event) {
    event.preventDefault()
    if (busy.current) return
    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    const input = { ...fields, consent: fields.consent === 'on', propertyId: house?.id ?? null }
    const validated = validateEnquiry(input)
    if (validated.error) { setStatus('error'); setFeedback(validated.error); return }
    busy.current = true
    setStatus('sending'); setFeedback('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input), signal: AbortSignal.timeout(15000),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please email us directly.')
      setStatus('success')
      setFeedback('Your enquiry has been sent to Emmanuel. Thank you for getting in touch.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setFeedback(error.name === 'TimeoutError' ? 'Delivery could not be confirmed. Please email us directly before trying again.' : error.message || 'Unable to connect. Please email us directly.')
    } finally { busy.current = false }
  }
  const phone = import.meta.env.VITE_CONTACT_PHONE?.trim()
  return <div>
    <p className="form-intro">Enquiries are handled by Emmanuel Phanuel at <a href={'mailto:' + contactEmail}>{contactEmail}</a>.</p>
    {delivery === 'unavailable' && <p className="notice">Online messaging is currently unavailable. You can still email us directly.</p>}
    <form className="contact-form" onSubmit={submit} aria-label="Property enquiry">
      <label htmlFor="enquiry-name">Name<input id="enquiry-name" name="name" autoComplete="name" required minLength="2" maxLength={limits.name} placeholder="Your full name" /></label>
      <label htmlFor="enquiry-email">Email<input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={limits.email} placeholder="you@example.com" /></label>
      <label htmlFor="enquiry-phone">Phone <span className="optional">(optional)</span><input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={limits.phone} placeholder="Include your country code" /></label>
      <label htmlFor="enquiry-message">Message<textarea id="enquiry-message" name="message" rows="5" required minLength="10" maxLength={limits.message} defaultValue={house ? 'I would like to know more about ' + house.name + '.' : ''} /></label>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website<input id="website" name="website" tabIndex="-1" autoComplete="off" /></label></div>
      <label className="consent"><input type="checkbox" name="consent" required /><span>I agree to share these details so Emmanuel can respond to my enquiry. <Link to="/privacy">Privacy information</Link>.</span></label>
      {feedback && <p ref={feedbackRef} tabIndex="-1" role={status === 'error' ? 'alert' : 'status'} className={'feedback ' + status}>{feedback}</p>}
      <div className="contact-actions">
        <button className="button" type="submit" disabled={status === 'sending' || delivery !== 'ready'}>{status === 'sending' ? 'Sending…' : delivery === 'checking' ? 'Checking availability…' : 'Send enquiry'}</button>
        {phone && <a className="button button-secondary" href={'tel:' + phone.replace(/[^\d+]/g, '')}>Call Emmanuel</a>}
        <a className="button button-secondary" href={'mailto:' + contactEmail + '?subject=' + encodeURIComponent(house ? 'Enquiry: ' + house.name : 'MyRealtor enquiry')}>Email directly</a>
      </div>
    </form>
  </div>
}
ContactForm.propTypes = { house: PropTypes.object }
