import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import type { SiteData } from '../services/api'
import Footer from '../components/Footer'
import './HomePage.css'

interface ResumePageProps {
  data: SiteData
}

const ResumePage = ({ data }: ResumePageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const experiences = data.resume.filter(item => item.type === 'experience')
  const education = data.resume.filter(item => item.type === 'education')
  const awards = data.resume.filter(item => item.type === 'awards')
  const certifications = data.resume.filter(item => item.type === 'certifications')

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
        <section className="resume-page">
          <div className="section-header">
            <p className="eyebrow">Professional Resume</p>
            <h1>{data.profile.name}</h1>
            <p className="section-header__copy">{data.profile.title}</p>
          </div>

          {experiences.length > 0 && (
            <div className="resume-section">
              <h2>Experience</h2>
              <div className="timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className="resume-item">
                    <p className="timeline__years">{exp.start} — {exp.end}</p>
                    <div>
                      <h3>{exp.role} · {exp.company}</h3>
                      {exp.location && <p className="location">{exp.location}</p>}
                      <p className="summary">{exp.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="resume-section">
              <h2>Education</h2>
              <div className="timeline">
                {education.map((edu, index) => (
                  <div key={index} className="resume-item">
                    <p className="timeline__years">{edu.start} — {edu.end}</p>
                    <div>
                      <h3>{edu.degree}</h3>
                      <p>{edu.school}</p>
                      {edu.summary && <p className="summary">{edu.summary}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="resume-section">
              <h2>Certifications</h2>
              <div className="timeline">
                {certifications.map((cert, index) => (
                  <div key={index} className="resume-item">
                    <p className="timeline__years">{cert.start} — {cert.end}</p>
                    <div>
                      <h3>{cert.certification}</h3>
                      <p>{cert.issuer}</p>
                      {cert.summary && <p className="summary">{cert.summary}</p>}
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                          View credential
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {awards.length > 0 && (
            <div className="resume-section">
              <h2>Awards & Recognition</h2>
              <div className="timeline">
                {awards.map((award, index) => (
                  <div key={index} className="resume-item">
                    <p className="timeline__years">{award.start}</p>
                    <div>
                      <h3>{award.award}</h3>
                      <p>{award.organization}</p>
                      {award.summary && <p className="summary">{award.summary}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="resume-section">
              <h2>Skills</h2>
              <div className="skills">
                {data.skills.filter(s => s.category === 'technical').length > 0 && (
                  <div>
                    <h3>Technical Stack</h3>
                    {data.skills.filter(s => s.category === 'technical').map((skill) => (
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

                {data.skills.filter(s => s.category === 'professional').length > 0 && (
                  <div>
                    <h3>Professional Strengths</h3>
                    {data.skills.filter(s => s.category === 'professional').map((skill) => (
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
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer profileName={data.profile.name} />
    </div>
  )
}

export default ResumePage
