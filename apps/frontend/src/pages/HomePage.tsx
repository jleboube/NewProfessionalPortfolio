import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMenu, FiX, FiExternalLink } from 'react-icons/fi'
import type { SiteData } from '../services/api'
import Footer from '../components/Footer'
import './HomePage.css'

interface HomePageProps {
  data: SiteData
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6905'

const HomePage = ({ data }: HomePageProps) => {
  const shouldReduceMotion = useReducedMotion()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.8, ease: 'easeOut', delay },
  })

  const smoothScroll = (sectionId: string) => {
    const target = document.getElementById(sectionId)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Get experience items for timeline
  const experiences = useMemo(() =>
    data.resume.filter(item => item.type === 'experience').slice(0, 6),
    [data.resume]
  )

  // Get featured projects
  const featuredProjects = useMemo(() =>
    data.projects.filter(p => p.featuredOnHome !== false).slice(0, 6),
    [data.projects]
  )

  // Get current certifications (not expired)
  const currentCertifications = useMemo(() => {
    const now = new Date()
    return data.resume
      .filter(item => item.type === 'certifications')
      .filter(cert => {
        if (!cert.end) return true
        // Parse end date and check if it's in the future
        const endDate = new Date(cert.end)
        return endDate > now
      })
  }, [data.resume])

  // Get technical and professional skills
  const technicalSkills = useMemo(() =>
    data.skills.filter(s => s.category === 'technical'),
    [data.skills]
  )

  const professionalSkills = useMemo(() =>
    data.skills.filter(s => s.category === 'professional'),
    [data.skills]
  )

  // Calculate years of experience
  const yearsExperience = useMemo(() => {
    const earliestYear = Math.min(...experiences.map(exp => {
      const match = exp.start.match(/\d{4}/)
      return match ? parseInt(match[0]) : new Date().getFullYear()
    }))
    return new Date().getFullYear() - earliestYear
  }, [experiences])

  const photoUrl = data.profile.photo ? `${API_BASE_URL}${data.profile.photo}` : ''

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="logo-mark">
          <span>{data.profile.name.split(' ').map(n => n[0]).join('')}</span>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => smoothScroll('hero')}>Home</button>
          <Link to="/projects">Projects</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/services">Services</Link>
          {data.blogEnabled && <Link to="/blog">Blog</Link>}
          <button type="button" onClick={() => smoothScroll('contact')}>Contact</button>
        </nav>

        <a className="pill-button desktop-only" href={`mailto:${data.profile.email}`}>
          Let&apos;s collaborate
        </a>

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
            <button type="button" onClick={() => { smoothScroll('hero'); setMobileMenuOpen(false); }}>Home</button>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link to="/resume" onClick={() => setMobileMenuOpen(false)}>Resume</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            {data.blogEnabled && <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>}
            <button type="button" onClick={() => { smoothScroll('contact'); setMobileMenuOpen(false); }}>Contact</button>
            <a href={`mailto:${data.profile.email}`} onClick={() => setMobileMenuOpen(false)}>
              Let&apos;s collaborate
            </a>
          </nav>
        </motion.div>
      )}

      <main>
        {/* Hero Section */}
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <motion.div className="hero__content" {...reveal()}>
            <p className="eyebrow">{data.profile.title} · {data.profile.location}</p>
            <h1 id="hero-title">{data.profile.name}</h1>
            <p>{data.profile.bio}</p>
            <div className="hero__cta-row">
              <a className="primary-button" href={`mailto:${data.profile.email}`}>
                Get in touch
              </a>
              <Link className="secondary-button" to="/resume">
                View resume
                <FiArrowUpRight aria-hidden="true" />
              </Link>
              {data.profile.resumeDownloadUrl && (
                <a
                  className="secondary-button"
                  href={data.profile.resumeDownloadUrl.startsWith('http') ? data.profile.resumeDownloadUrl : `${API_BASE_URL}${data.profile.resumeDownloadUrl}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download resume
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="hero__stats">
              <div>
                <span>{yearsExperience}+</span>
                <p>Years experience</p>
              </div>
              <div>
                <span>{data.projects.length}+</span>
                <p>Projects</p>
              </div>
              <div>
                <span>{experiences.length}</span>
                <p>Companies</p>
              </div>
            </div>
          </motion.div>

          {photoUrl && (
            <motion.div className="hero__visual" {...reveal(0.2)}>
              <img src={photoUrl} alt={`${data.profile.name}`} loading="lazy" />
            </motion.div>
          )}
        </section>

        {/* Experience Section */}
        <section className="experience" id="experience" aria-labelledby="experience-title">
          <div className="section-header">
            <p className="eyebrow">Professional Experience</p>
            <h2 id="experience-title">{yearsExperience}+ years of delivery</h2>
            <p className="section-header__copy">
              Building and leading technical teams to solve complex business challenges
            </p>
          </div>

          <div className="experience__grid">
            <motion.ul className="timeline" {...reveal()}>
              {experiences.slice(0, 3).map((exp) => (
                <li key={`${exp.company}-${exp.start}`}>
                  <p className="timeline__years">{exp.start} — {exp.end}</p>
                  <div>
                    <h3>{exp.role} · {exp.company}</h3>
                    <p>{exp.summary?.substring(0, 200)}{exp.summary && exp.summary.length > 200 ? '...' : ''}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            {experiences.length > 3 && (
              <motion.ul className="timeline" {...reveal(0.15)}>
                {experiences.slice(3, 6).map((exp) => (
                  <li key={`${exp.company}-${exp.start}`}>
                    <p className="timeline__years">{exp.start} — {exp.end}</p>
                    <div>
                      <h3>{exp.role} · {exp.company}</h3>
                      <p>{exp.summary?.substring(0, 200)}{exp.summary && exp.summary.length > 200 ? '...' : ''}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Certifications Section */}
            {currentCertifications.length > 0 && (
              <motion.div className="certifications" {...reveal(0.2)}>
                <h3>Professional Certifications</h3>
                <div className="certifications-grid">
                  {currentCertifications.map((cert) => (
                    <motion.div
                      key={cert.credentialId || cert.certification}
                      className="certification-card"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {cert.logo && (
                        <div className="certification-logo">
                          <img src={`${API_BASE_URL}${cert.logo}`} alt={`${cert.certification} logo`} />
                        </div>
                      )}
                      <div className="certification-content">
                        <h4>{cert.certification}</h4>
                        <p className="certification-issuer">{cert.issuer}</p>
                        {cert.credentialId && (
                          <p className="certification-id">ID: {cert.credentialId}</p>
                        )}
                        <p className="certification-dates">
                          Valid: {cert.start} — {cert.end || 'No Expiration'}
                        </p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="certification-verify"
                          >
                            Verify Credential →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div className="skills" {...reveal(0.3)}>
              {technicalSkills.length > 0 && (
                <div>
                  <h3>Technical Stack</h3>
                  {technicalSkills.map((skill) => (
                    <div key={skill.name} className="skill-meter">
                      <div className="skill-meter__labels">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="skill-meter__track">
                        <motion.div
                          className="skill-meter__fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {professionalSkills.length > 0 && (
                <div>
                  <h3>Professional Strengths</h3>
                  {professionalSkills.map((skill) => (
                    <div key={skill.name} className="skill-meter">
                      <div className="skill-meter__labels">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="skill-meter__track">
                        <motion.div
                          className="skill-meter__fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects" id="projects" aria-labelledby="projects-title">
          <div className="section-header">
            <p className="eyebrow">Selected Projects</p>
            <h2 id="projects-title">Building with purpose</h2>
            <p className="section-header__copy">
              A showcase of recent work across cloud, AI, and product development
            </p>
          </div>

          <div className="projects__grid">
            {featuredProjects.map((project, index) => {
              const projectImage = project.image ?
                (project.image.startsWith('http') ? project.image : `${API_BASE_URL}${project.image}`) :
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'

              return (
                <motion.article key={project.name} className="project-card" {...reveal(index * 0.05)}>
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

          {data.projects.length > featuredProjects.length && (
            <div className="projects__cta">
              <p>Want to see more?</p>
              <Link className="secondary-button" to="/projects">
                View all projects
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          )}
        </section>

        {/* Services Section */}
        {data.services && data.services.length > 0 && (
          <section className="services" id="services" aria-labelledby="services-title">
            <div className="section-header">
              <p className="eyebrow">Professional Services</p>
              <h2 id="services-title">How I can help</h2>
              <p className="section-header__copy">
                Partnering with teams to deliver measurable outcomes
              </p>
            </div>

            <div className="services__grid">
              {data.services.map((service, index) => (
                <motion.article key={service.title} className="service-card" {...reveal(index * 0.1)}>
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
          </section>
        )}

        {/* Contact Section */}
        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact__panel">
            <div className="section-header">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title">Let's connect</h2>
              <p className="section-header__copy">
                Open to new opportunities and collaborations
              </p>
            </div>

            <div className="contact__grid">
              <a className="contact-card" href={`mailto:${data.profile.email}`}>
                <FiMail aria-hidden="true" />
                <div>
                  <p>Email</p>
                  <span>{data.profile.email}</span>
                </div>
                <FiArrowUpRight aria-hidden="true" />
              </a>

              {data.profile.githubUsername && (
                <a
                  className="contact-card"
                  href={`https://github.com/${data.profile.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiGithub aria-hidden="true" />
                  <div>
                    <p>GitHub</p>
                    <span>@{data.profile.githubUsername}</span>
                  </div>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              )}

              {data.profile.linkedInUsername && (
                <a
                  className="contact-card"
                  href={`https://www.linkedin.com/in/${data.profile.linkedInUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiLinkedin aria-hidden="true" />
                  <div>
                    <p>LinkedIn</p>
                    <span>/in/{data.profile.linkedInUsername}</span>
                  </div>
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>

            <p className="contact__meta">{data.profile.location}</p>
          </div>
        </section>
      </main>

      <Footer
        profileName={data.profile.name}
        variant="home"
        onBackToTop={() => smoothScroll('hero')}
      />
    </div>
  )
}

export default HomePage
