import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/myRealtor-Logo.png'
export default function Header() {
  return <header className="site-header"><div className="shell header-inner">
    <Link to="/" aria-label="MyRealtor home" className="brand"><img src={logo} alt="MyRealtor" width="88" height="72" /></Link>
    <nav aria-label="Main navigation"><NavLink to="/" end>Find a home</NavLink><NavLink to="/help">Help</NavLink><NavLink to="/contact" className="nav-contact">Contact us</NavLink></nav>
  </div></header>
}
