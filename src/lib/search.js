export const priceRanges = {
  sale: [
    { value: '', label: 'Any price', min: 0, max: Infinity },
    { value: 'under-100000', label: 'Under $100,000', min: 0, max: 100000 },
    { value: '100000-150000', label: '$100,000 – $149,999', min: 100000, max: 150000 },
    { value: '150000-200000', label: '$150,000 – $199,999', min: 150000, max: 200000 },
    { value: '200000-250000', label: '$200,000 – $249,999', min: 200000, max: 250000 },
    { value: '250000-300000', label: '$250,000 – $299,999', min: 250000, max: 300000 },
    { value: '300000-plus', label: '$300,000 and above', min: 300000, max: Infinity },
  ],
  rent: [
    { value: '', label: 'Any monthly rent', min: 0, max: Infinity },
    { value: 'under-1000', label: 'Under $1,000 / month', min: 0, max: 1000 },
    { value: '1000-2000', label: '$1,000 – $1,999 / month', min: 1000, max: 2000 },
    { value: '2000-3000', label: '$2,000 – $2,999 / month', min: 2000, max: 3000 },
    { value: '3000-plus', label: '$3,000+ / month', min: 3000, max: Infinity },
  ],
}

export function filterHouses(houses, { country = '', property = '', price = '', agent = '', purpose = 'sale' } = {}) {
  const ranges = priceRanges[purpose] ?? priceRanges.sale
  const range = ranges.find((item) => item.value === price) ?? ranges[0]
  return houses.filter((house) =>
    (!country || house.country === country) &&
    (!property || house.type === property) &&
    (!agent || house.agent.slug === agent) &&
    (!purpose || house.purpose === purpose) &&
    Number(house.price) >= range.min && Number(house.price) < range.max,
  )
}

export function getFilterOptions(houses) {
  return {
    countries: [...new Set(houses.map((house) => house.country))].sort(),
    properties: [...new Set(houses.map((house) => house.type))].sort(),
  }
}
export const formatPrice = (price) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(Number(price))

export function findHouse(houses, id) {
  return /^\d+$/.test(String(id)) ? houses.find((house) => String(house.id) === String(id)) : undefined
}
