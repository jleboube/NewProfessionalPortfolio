import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import type { SiteData } from '../services/api'
import Footer from '../components/Footer'
import './HomePage.css'

interface ServicesPageProps {
  data: SiteData
}

const ServicesPage = ({ data }: ServicesPageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="logo-mark">
          <Link to="/">
            <span>{data.profile.name.split(' ').map(n => n[0]).join('')}</span>
          </Link>
        </div>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/services">Services</Link>
          {data.blogEnabled && <Link to="/blog">Blog</Link>}
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <nav aria-label="Mobile navigation">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link to="/resume" onClick={() => setMobileMenuOpen(false)}>Resume</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            {data.blogEnabled && <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>}
            <a href={`mailto:${data.profile.email}`} onClick={() => setMobileMenuOpen(false)}>
              Let&apos;s collaborate
            </a>
          </nav>
        </motion.div>
      )}

      <main className="page-content">
        <section className="services">
          <div className="section-header">
            <p className="eyebrow">Professional Services</p>
            <h1>How I Can Help</h1>
            <p className="section-header__copy">
              Partnering with teams to deliver measurable outcomes
            </p>
          </div>

          <div className="services__grid">
            {data.services.map((service, index) => (
              <motion.article
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="contact-cta">
            <h2>Ready to work together?</h2>
            <p>Let's discuss how I can help your team succeed.</p>
            <a className="primary-button" href={`mailto:${data.profile.email}`}>
              Get in touch
            </a>
          </div>
        </section>
      </main>

      <Footer profileName={data.profile.name} />
    </div>
  )
}

export default ServicesPage
