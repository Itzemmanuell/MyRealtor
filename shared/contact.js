export const contactEmail = 'itzemmanuelmurye@gmail.com'
export const limits = { name: 100, email: 254, phone: 40, message: 3000 }
export function validateEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { error: 'Please complete the enquiry form.' }
  const clean = {}
  for (const [key, max] of Object.entries(limits)) {
    if (input[key] !== undefined && typeof input[key] !== 'string') return { error: 'Please use text in the enquiry fields.' }
    clean[key] = (input[key] ?? '').trim()
    if (clean[key].length > max) return { error: 'Your ' + key + ' is too long.' }
  }
  if (clean.name.length < 2) return { error: 'Please enter your name (at least 2 characters).' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || /[\r\n]/.test(clean.email)) return { error: 'Please enter a valid email address.' }
  if (clean.phone && !/^[+\d\s().-]{7,40}$/.test(clean.phone)) return { error: 'Please enter a valid phone number, or leave it blank.' }
  if (clean.message.length < 10) return { error: 'Please write a message of at least 10 characters.' }
  if (input.consent !== true) return { error: 'Please agree to share your enquiry details.' }
  if (input.propertyId !== undefined && input.propertyId !== null && !/^[1-9]\d*$/.test(String(input.propertyId))) return { error: 'This property reference is invalid.' }
  return { data: { ...clean, propertyId: input.propertyId ? Number(input.propertyId) : null } }
}
