import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import type { SiteData } from '../services/api'
import './HomePage.css'

interface BlogPageProps {
  data: SiteData
}

const BlogPage = ({ data }: BlogPageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const publishedPosts = data.blogPosts.filter(post => post.status === 'published')

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
        <section className="blog">
          <div className="section-header">
            <p className="eyebrow">Blog</p>
            <h1>Thoughts & Insights</h1>
            <p className="section-header__copy">
              Sharing experiences from technology, leadership, and innovation
            </p>
          </div>

          {publishedPosts.length === 0 ? (
            <div className="empty-state">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {publishedPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  {post.featuredImage && (
                    <img src={post.featuredImage} alt={post.title} loading="lazy" />
                  )}
                  <div className="blog-card__content">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <Link to={`/blog/${post.slug}`} className="read-more">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {data.profile.name}</p>
        <Link to="/">Back to home</Link>
      </footer>
    </div>
  )
}

export default BlogPage
