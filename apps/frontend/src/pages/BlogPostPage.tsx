import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import type { SiteData } from '../services/api'
import Footer from '../components/Footer'
import './HomePage.css'

interface BlogPostPageProps {
  data: SiteData
}

const BlogPostPage = ({ data }: BlogPostPageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { slug } = useParams<{ slug: string }>()
  const post = data.blogPosts.find(p => p.slug === slug && p.status === 'published')

  if (!post) {
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
            <Link to="/blog">Blog</Link>
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
          <div className="error-content">
            <h1>Post not found</h1>
            <p>Sorry, this blog post doesn't exist or has been removed.</p>
            <Link to="/blog" className="primary-button">Back to blog</Link>
          </div>
        </main>
      </div>
    )
  }

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
        <article className="blog-post">
          <header className="blog-post__header">
            <Link to="/blog" className="back-link">← Back to blog</Link>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1>{post.title}</h1>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="blog-post__featured-image"
              loading="lazy"
            />
          )}

          <div
            className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="blog-post__footer">
            <Link to="/blog" className="back-link">← Back to all posts</Link>
          </footer>
        </article>
      </main>

      <Footer profileName={data.profile.name} />
    </div>
  )
}

export default BlogPostPage
