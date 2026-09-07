import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { RiArrowRightUpLine } from 'react-icons/ri'
import PropertyFacts from './PropertyFacts'
import { formatPrice } from '../lib/search'
export default function House({ house }) {
  return <article className="property-card">
    <Link to={'/property/' + house.id} className="card-link" aria-label={'View ' + house.name + ' in ' + house.city}>
      <div className="card-image"><img src={house.image} alt={house.type + ' in the ' + house.name + ' sample listing'} loading="lazy" decoding="async" width="352" height="240" /><span className="sale-badge">{house.purpose === 'rent' ? 'For rent' : 'For sale'}</span></div>
      <div className="card-body"><div className="badges"><span>{house.type}</span><span>{house.country}</span></div>
        <h3>{house.name}</h3><p className="address">{house.address}</p>
        <PropertyFacts house={house} />
        <div className="card-bottom"><p className="price">{formatPrice(house.price)} <span>{house.purpose === 'rent' ? '/ month · USD' : 'USD'}</span></p><RiArrowRightUpLine aria-hidden="true" /></div>
      </div>
    </Link>
  </article>
}
House.propTypes = { house: PropTypes.object.isRequired }
