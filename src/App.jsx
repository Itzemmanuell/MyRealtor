import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RouteEffects from './components/RouteEffects'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'
import AgentListings from './pages/AgentListings'
import InfoPage from './pages/InfoPage'
import NotFound from './pages/NotFound'
export default function App() {
  return <div className="app-layout">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header /><RouteEffects />
    <main id="main-content" tabIndex="-1"><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/agents/:slug" element={<AgentListings />} />
      {['help', 'contact', 'privacy', 'terms'].map((page) => <Route key={page} path={'/' + page} element={<InfoPage page={page} />} />)}
      <Route path="*" element={<NotFound />} />
    </Routes></main><Footer />
  </div>
}
