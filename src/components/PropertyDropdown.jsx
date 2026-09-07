import { useContext } from 'react'
import { HouseContext } from './house-context'
export default function PropertyDropdown() {
  const { property, setProperty, properties } = useContext(HouseContext)
  return <label className="filter-field" htmlFor="property-type">Property type
    <select id="property-type" value={property} onChange={(event) => setProperty(event.target.value)}>
      <option value="">All property types</option>
      {properties.map((item) => <option key={item}>{item}</option>)}
    </select>
  </label>
}
