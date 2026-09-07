import { useState } from 'react'
import PropTypes from 'prop-types'
import { housesData } from '../Data'
import { filterHouses, getFilterOptions } from '../lib/search'
import { HouseContext } from './house-context'

const options = getFilterOptions(housesData)
export default function HouseContextProvider({ children }) {
  const [country, setCountry] = useState('')
  const [property, setProperty] = useState('')
  const [price, setPrice] = useState('')
  const [purpose, setPurpose] = useState('sale')
  const [applied, setApplied] = useState({ purpose: 'sale' })
  const houses = filterHouses(housesData, applied)
  function resetFilters() {
    setCountry(''); setProperty(''); setPrice(''); setApplied({ purpose })
  }
  function changePurpose(value) {
    setPurpose(value); setPrice('')
    setApplied({ country, property, purpose: value, price: '' })
  }
  return <HouseContext.Provider value={{ country, setCountry, property, setProperty,
    price, setPrice, purpose, changePurpose, ...options, houses, applied, resetFilters,
    handleClick: () => setApplied({ country, property, price, purpose }),
  }}>{children}</HouseContext.Provider>
}
HouseContextProvider.propTypes = { children: PropTypes.node.isRequired }
