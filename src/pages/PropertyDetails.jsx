import { useParams, Link } from 'react-router-dom'
import { housesData } from '../Data'
import { findHouse, formatPrice } from '../lib/search'
import PropertyFacts from '../components/PropertyFacts'
import ContactForm from '../components/ContactForm'
import NotFound from './NotFound'
export default function PropertyDetails() {
  const { id } = useParams()
  const house = findHouse(housesData, id)
  if (!house) return <NotFound property />
  return <section className="shell detail-page">
    <Link to="/" className="back-link">← Back to properties</Link>
    <div className="detail-heading"><div><div className="badges"><span>{house.purpose === 'rent' ? 'For rent' : 'For sale'}</span><span>{house.type}</span><span>{house.country}</span></div>
      <h1>{house.name}</h1><p className="muted">{house.address}</p></div>
      <p className="detail-price">{formatPrice(house.price)}<span>{house.purpose === 'rent' ? 'USD / month' : 'USD · Sale price'}</span></p>
    </div>
    <div className="detail-grid"><div className="property-overview">
      <img className="detail-image" src={house.imageLg} alt={house.name + ' sample property'} width="768" height="520" loading="eager" />
      <PropertyFacts house={house} /><h2>About this property</h2><p className="description">{house.description}</p>
      <dl className="property-summary"><div><dt>Property type</dt><dd>{house.type}</dd></div><div><dt>Year built</dt><dd>{house.year}</dd></div><div><dt>Listing type</dt><dd>{house.purpose === 'rent' ? 'Monthly rental' : 'For sale'}</dd></div><div><dt>Reference</dt><dd>MR-{String(house.id).padStart(3, '0')}</dd></div></dl>
      <p className="notice">Demonstration listing. Photos, addresses, prices, and agent profiles are sample content, not verified offers.</p>
    </div><aside className="contact-panel" aria-label="Listing contact">
      <div className="agent-card"><img src={house.agent.image} alt="" width="72" height="72" /><div><p className="eyebrow">Sample listing agent</p><h2>{house.agent.name}</h2><Link to={'/agents/' + house.agent.slug}>View agent listings →</Link></div></div>
      <h2 className="contact-title">Interested in this home?</h2><ContactForm key={house.id} house={house} />
    </aside></div>
  </section>
}
