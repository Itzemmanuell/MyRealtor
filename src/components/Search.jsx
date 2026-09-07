import { useContext } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import CountryDropdown from './CountryDropdown'
import PropertyDropdown from './PropertyDropdown'
import PriceRangeDropdown from './PriceRangeDropdown'
import { HouseContext } from './house-context'
export default function Search() {
  const { handleClick, purpose, changePurpose } = useContext(HouseContext)
  return <div className="search-wrap">
    <fieldset className="purpose-switch"><legend className="sr-only">Buy or rent</legend>
      {[['sale', 'Buy a home'], ['rent', 'Rent a home']].map(([value, label]) =>
        <label key={value} className={purpose === value ? 'selected' : ''}>
          <input type="radio" name="purpose" value={value} checked={purpose === value} onChange={() => changePurpose(value)} />{label}
        </label>)}
    </fieldset>
    <form className="search-panel" aria-label="Search properties" onSubmit={(event) => {
      event.preventDefault(); handleClick()
      document.getElementById('listings-title')?.focus({ preventScroll: true })
      document.getElementById('listings')?.scrollIntoView({ block: 'start' })
    }}>
      <CountryDropdown /><PropertyDropdown /><PriceRangeDropdown />
      <button className="button search-button" type="submit"><RiSearch2Line aria-hidden="true" /> Search homes</button>
    </form>
  </div>
}
