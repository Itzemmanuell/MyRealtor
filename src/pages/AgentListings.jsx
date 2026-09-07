import { Link, useParams } from 'react-router-dom'
import { housesData } from '../Data'
import House from '../components/House'
import NotFound from './NotFound'
export default function AgentListings() {
  const { slug } = useParams()
  const houses = housesData.filter((house) => house.agent.slug === slug)
  if (!houses.length) return <NotFound />
  const agent = houses[0].agent
  return <section className="shell listings agent-page"><Link to="/" className="back-link">← All properties</Link>
    <div className="agent-page-heading"><img src={agent.image} alt="" width="88" height="88" /><div><p className="eyebrow">Sample agent profile</p><h1>{agent.name}</h1><p className="muted">{houses.length} {houses.length === 1 ? 'listing' : 'listings'} · Sales and rentals</p></div></div>
    <div className="property-grid">{houses.map((house) => <House key={house.id} house={house} />)}</div>
  </section>
}
