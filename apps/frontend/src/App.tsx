import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ResumePage from './pages/ResumePage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import { useData } from './hooks/useData'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  const { data, loading, error } = useData()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <h1>Oops! Something went wrong</h1>
          <p>{error?.message || 'Failed to load data'}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/projects" element={<ProjectsPage data={data} />} />
        <Route path="/resume" element={<ResumePage data={data} />} />
        <Route path="/services" element={<ServicesPage data={data} />} />
        <Route path="/blog" element={<BlogPage data={data} />} />
        <Route path="/blog/:slug" element={<BlogPostPage data={data} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
