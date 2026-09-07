import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export default function NotFound({ property = false }) {
  return <section className="shell empty-state not-found"><p className="eyebrow">Nothing here yet</p>
    <h1>{property ? 'Property not found' : 'Page not found'}</h1><p>{property ? 'This listing is unavailable or the link is incorrect.' : 'The page you’re looking for doesn’t exist.'}</p>
    <Link className="button" to="/">Browse properties</Link>
  </section>
}
NotFound.propTypes = { property: PropTypes.bool }
