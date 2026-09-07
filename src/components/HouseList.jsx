import { useContext } from 'react'
import { HouseContext } from './house-context'
import House from './House'
export default function HouseList() {
  const { houses, resetFilters, applied } = useContext(HouseContext)
  const filtered = !!(applied.country || applied.property || applied.price)
  return <section id="listings" className="shell listings" aria-labelledby="listings-title">
    <div className="section-heading"><div><p className="eyebrow">Find your fit</p><h2 id="listings-title" tabIndex="-1">{filtered ? 'Your search results' : 'Explore our properties'}</h2>
      <p className="muted" role="status">{houses.length} {houses.length === 1 ? 'property' : 'properties'} · {applied.purpose === 'rent' ? 'For rent · Monthly prices' : 'For sale'} · USD</p></div>
      {filtered && <button className="button button-secondary" onClick={resetFilters}>Clear filters</button>}
    </div>
    {houses.length ? <div className="property-grid">{houses.map((house) => <House key={house.id} house={house} />)}</div>
      : <div className="empty-state"><h3>No homes match these filters</h3><p>Try another location, property type, or price range.</p><button className="button" onClick={resetFilters}>Show all properties</button></div>}
  </section>
}
