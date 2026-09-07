import { Link } from 'react-router-dom'
import logo from '../assets/myRealtor-Logo.png'
export default function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-top"><Link to="/" aria-label="MyRealtor home"><img src={logo} alt="MyRealtor" width="100" height="80" /></Link>
      <nav aria-label="Footer navigation"><Link to="/terms">Site information</Link><Link to="/privacy">Privacy</Link><Link to="/help">Help</Link><Link to="/contact">Contact us</Link></nav>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} MyRealtor. All rights reserved.</p><p>Demo listings · Prices in USD</p></div>
    <p className="developer-credit">Developed by <a href="https://github.com/Itzemmanuell" target="_blank" rel="noreferrer">Emmanuel Phanuel</a></p>
  </div></footer>
}
