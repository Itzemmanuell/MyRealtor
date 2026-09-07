import { useContext } from 'react'
import { HouseContext } from './house-context'
export default function CountryDropdown() {
  const { country, setCountry, countries } = useContext(HouseContext)
  return <label className="filter-field" htmlFor="country">Location
    <select id="country" value={country} onChange={(event) => setCountry(event.target.value)}>
      <option value="">All locations</option>
      {countries.map((item) => <option key={item}>{item}</option>)}
    </select>
  </label>
}
