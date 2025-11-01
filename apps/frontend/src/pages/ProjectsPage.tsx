import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiGithub, FiExternalLink } from 'react-icons/fi'
import type { SiteData } from '../services/api'
import './HomePage.css'

interface ProjectsPageProps {
  data: SiteData
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6905'

const ProjectsPage = ({ data }: ProjectsPageProps) => {
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
        <section className="projects">
          <div className="section-header">
            <p className="eyebrow">All Projects</p>
            <h1>Portfolio</h1>
            <p className="section-header__copy">
              A complete showcase of projects across cloud, AI, and product development
            </p>
          </div>

          <div className="projects__grid">
            {data.projects.map((project, index) => {
              const projectImage = project.image ?
                (project.image.startsWith('http') ? project.image : `${API_BASE_URL}${project.image}`) :
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'

              return (
                <motion.article
                  key={project.name}
                  className="project-card"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="project-card__media">
                    <img src={projectImage} alt={`${project.name} screenshot`} loading="lazy" />
                  </div>
                  <div className="project-card__body">
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-card__links">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noreferrer" className="project-link project-link--demo">
                          <FiExternalLink aria-hidden="true" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.source && (
                        <a href={project.source} target="_blank" rel="noreferrer" className="project-link project-link--github" aria-label="View source code on GitHub">
                          <FiGithub aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {data.profile.name}</p>
        <Link to="/">Back to home</Link>
      </footer>
    </div>
  )
}

export default ProjectsPage
