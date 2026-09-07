import PropTypes from 'prop-types'
import { BiBed, BiBath, BiArea } from 'react-icons/bi'
export default function PropertyFacts({ house }) {
  return <ul className="property-facts" aria-label="Property features">
    <li><BiBed aria-hidden="true" /> <span>{house.bedrooms} beds</span></li>
    <li><BiBath aria-hidden="true" /> <span>{house.bathrooms} baths</span></li>
    <li><BiArea aria-hidden="true" /> <span>{house.surface}</span></li>
  </ul>
}
PropertyFacts.propTypes = { house: PropTypes.object.isRequired }
