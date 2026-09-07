import banner from '../assets/image/House-Banner.jpg'
import Search from './Search'
export default function Banner() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="hero-grid"><div className="hero-copy">
      <p className="eyebrow">A place to call your own</p>
      <h1 id="hero-title"><span>Find</span> your next<br className="desktop-break" /> place to call home.</h1>
      <p className="hero-description">Buy your first home or find your next rental. Explore the details, compare your options, and find a place that fits.</p>
      <p className="demo-note">Explore our sample collection. These properties are demonstration listings.</p>
    </div><div className="hero-image"><img src={banner} alt="Contemporary house surrounded by a landscaped garden" loading="eager" width="900" height="640" /></div></div>
    <Search />
  </section>
}
