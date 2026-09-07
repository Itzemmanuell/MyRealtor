import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { housesData } from '../Data'
import { findHouse } from '../lib/search'
const titles = { '/': 'Find your next home', '/help': 'Help', '/contact': 'Contact us', '/privacy': 'Privacy', '/terms': 'Site information' }
export default function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    const house = pathname.startsWith('/property/') ? findHouse(housesData, pathname.split('/')[2]) : null
    document.title = (house?.name ?? titles[pathname] ?? (pathname.startsWith('/agents/') ? 'Agent listings' : 'Page not found')) + ' | MyRealtor'
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])
  return null
}
