import { useContext } from 'react'
import { HouseContext } from './house-context'
import { priceRanges } from '../lib/search'
export default function PriceRangeDropdown() {
  const { price, setPrice, purpose } = useContext(HouseContext)
  return <label className="filter-field" htmlFor="price-range">{purpose === 'rent' ? 'Monthly rent' : 'Price range'} · USD
    <select id="price-range" value={price} onChange={(event) => setPrice(event.target.value)}>
      {priceRanges[purpose].map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
    </select>
  </label>
}
