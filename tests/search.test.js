import { describe, it, expect } from 'vitest'
import { filterHouses, findHouse, getFilterOptions, priceRanges, formatPrice } from '../src/lib/search'
import { listings } from '../shared/listings'
describe('Property search', () => {
  it('separates sale prices and monthly rents', () => {
    for (const purpose of ['sale', 'rent']) {
      const result = filterHouses(listings, { purpose })
      expect(result.length).toBeGreaterThan(0)
      expect(result.every((house) => house.purpose === purpose)).toBe(true)
    }
  })
  it('combines location, property type, purpose and price', () => {
    const result = filterHouses(listings, { country: 'Canada', property: 'Apartment', purpose: 'rent', price: '1000-2000' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((house) => house.country === 'Canada' && house.type === 'Apartment' && house.price >= 1000 && house.price < 2000)).toBe(true)
  })
  it('uses exclusive upper bounds and includes the final open range', () => {
    const houses = [99999,100000,149999,150000,199999,200000,249999,250000,299999,300000,999999].map((price, id) => ({ id, price, purpose: 'sale' }))
    const groups = priceRanges.sale.slice(1).flatMap((range) => filterHouses(houses, { price: range.value }).map((house) => house.id))
    expect(groups.sort((a,b) => a-b)).toEqual(houses.map((house) => house.id))
    expect(filterHouses(houses, { price: '300000-plus' }).map((house) => house.price)).toEqual([300000,999999])
  })
  it('covers affordable apartments and every rental boundary', () => {
    expect(filterHouses([{ price: 21000, purpose: 'sale' }], { price: 'under-100000' })).toHaveLength(1)
    const houses = [999,1000,1999,2000,2999,3000,5000].map((price,id) => ({id,price,purpose:'rent'}))
    expect(priceRanges.rent.slice(1).flatMap((range) => filterHouses(houses, {purpose:'rent',price:range.value}))).toHaveLength(houses.length)
  })
  it('does not mutate the catalogue or shrink available options', () => {
    const before = JSON.stringify(listings)
    const options = getFilterOptions(listings)
    expect(filterHouses(listings, { country: 'No such country' })).toEqual([])
    expect(getFilterOptions(listings)).toEqual(options)
    expect(options.properties).toEqual(['Apartment', 'House'])
    expect(options.countries).toEqual(['Canada', 'United States'])
    expect(JSON.stringify(listings)).toBe(before)
  })
  it('rejects invalid and missing property IDs', () => {
    for (const id of ['1abc','1.2','-1','999','01',undefined]) expect(findHouse(listings,id)).toBeUndefined()
    expect(findHouse(listings,'1').id).toBe(1)
  })
  it('formats USD consistently', () => expect(formatPrice(110000)).toBe('$110,000'))
  it('keeps sample content complete and internally consistent', () => {
    expect(listings).toHaveLength(18)
    expect(new Set(listings.map((house) => house.id)).size).toBe(18)
    for (const house of listings) {
      expect(house.description).not.toMatch(/Lorem ipsum/)
      expect(house.type).not.toBe('Apartament')
      expect(house.agent.slug).toMatch(/^[a-z-]+$/)
      if (house.country === 'Canada') expect(house.address).toMatch(/, (ON|BC|AB|NS) /)
    }
  })
})
