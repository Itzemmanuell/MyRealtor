import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { contactEmail } from '../../shared/contact'
const titles = { help: 'How can we help?', contact: 'Let’s talk about your next home.', privacy: 'Your information, explained.', terms: 'About this collection.' }
export default function InfoPage({ page }) {
  return <section className={'shell info-page ' + (page === 'contact' ? 'contact-page' : '')}>
    <Link to="/" className="back-link">← Back to properties</Link><p className="eyebrow">MyRealtor · {page === 'terms' ? 'Site information' : page}</p><h1>{titles[page]}</h1>
    {page === 'contact' && <div className="general-contact"><div><h2>Get in touch</h2><p>Have a question about the site or a property in our collection? Send Emmanuel an enquiry.</p><a className="text-link" href={'mailto:' + contactEmail}>{contactEmail}</a><p className="muted">This is a demonstration project. The listed homes and agents are sample content.</p></div><div className="contact-panel"><ContactForm /></div></div>}
    {page === 'help' && <div className="prose">
      <h2>Find a property</h2><p>Choose “Buy a home” or “Rent a home”, select a location, property type, and price range, then press “Search homes”. Rental prices are per month. All prices are in US dollars.</p>
      <h2>Adjust your search</h2><p>Use “Clear filters” to see every property in the selected category. Location and property choices stay available even when a search has no matches.</p>
      <h2>Explore the details</h2><p>Open a property card to view its photo, floor area, bedrooms, bathrooms, and sample agent profile. “View agent listings” shows the other homes assigned to that agent.</p>
      <h2>Send an enquiry</h2><p>Use the enquiry form on a property page or <Link to="/contact">contact Emmanuel</Link>. If online messaging is unavailable, “Email directly” opens your email application. No account is required.</p>
      <h2>Are these live listings?</h2><p>No. This portfolio project uses sample properties, agents, and illustrative prices. The listings do not confirm actual availability.</p>
    </div>}
    {page === 'privacy' && <div className="prose">
      <h2>Browsing</h2><p>The application does not create user accounts, add advertising trackers, or store your searches in browser storage. Your current search stays in memory until the page is reloaded.</p>
      <h2>Enquiries</h2><p>The enquiry form asks for your name, email, an optional phone number, and a message. When you submit a working form, these details and the property reference are sent to Emmanuel Phanuel to respond to your request. The application does not save enquiries to a database.</p>
      <h2>Delivery and hosting</h2><p>When online delivery is enabled, Resend processes the enquiry email and the configured hosting provider handles the request. Delivered messages remain in the recipient’s mailbox. Hosting and email providers may retain operational logs under their own policies.</p>
      <h2>Email directly</h2><p>Email links open your email application. You review and send the message yourself through your email provider.</p>
      <h2>Questions or removal requests</h2><p>Contact <a href={'mailto:' + contactEmail}>{contactEmail}</a> about information you have shared. Please do not include identity documents, payment details, or other sensitive records in a property enquiry.</p>
    </div>}
    {page === 'terms' && <div className="prose"><h2>A project by Emmanuel Phanuel</h2><p>MyRealtor demonstrates a responsive property search experience for buyers and renters. It includes sample homes in the United States and Canada.</p><h2>Sample content</h2><p>Property names, descriptions, addresses, agent profiles, and prices are illustrative. Images are retained from the original project. This collection is not a live property feed or a confirmation that any home is available.</p><h2>Prices and enquiries</h2><p>All amounts are in USD. Rentals show a monthly amount; sales show a purchase price. The site does not accept payments, reservations, or contracts. Enquiries are sent to the project developer.</p><Link className="button" to="/">Explore the collection</Link></div>}
  </section>
}
InfoPage.propTypes = { page: PropTypes.oneOf(['help', 'contact', 'privacy', 'terms']).isRequired }
