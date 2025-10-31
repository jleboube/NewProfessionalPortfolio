// API service for fetching data from the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6905'

export interface Profile {
  name: string
  title: string
  bio: string
  location: string
  email: string
  githubUsername: string
  linkedInUsername: string
  photo: string
  resumeDownloadUrl?: string
}

export interface ResumeItem {
  type: 'experience' | 'education' | 'awards' | 'certifications'
  company?: string
  role?: string
  location?: string
  start: string
  end: string
  summary: string
  school?: string
  degree?: string
  organization?: string
  award?: string
  certification?: string
  issuer?: string
  credentialId?: string
  credentialUrl?: string
  logo?: string
}

export interface Project {
  name: string
  description: string
  image: string
  url: string
  source: string
  featuredOnHome?: boolean
}

export interface Service {
  title: string
  summary: string
  highlights: string[]
}

export interface Skill {
  name: string
  level: string
  category: 'technical' | 'professional'
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  status: 'draft' | 'published'
  featuredImage?: string
}

export interface SiteData {
  profile: Profile
  resume: ResumeItem[]
  projects: Project[]
  services: Service[]
  skills: Skill[]
  blogEnabled: boolean
  blogPosts: BlogPost[]
  colorTheme: string
  theme: string
  setupCompleted: boolean
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  return response.json()
}

export const api = {
  // Get all data
  getAllData: () => fetchAPI<SiteData>('/api/public/data'),

  // Get specific data sections
  getProfile: () => fetchAPI<Profile>('/api/public/profile'),
  getProjects: () => fetchAPI<Project[]>('/api/public/projects'),
  getServices: () => fetchAPI<Service[]>('/api/public/services'),
  getResume: () => fetchAPI<ResumeItem[]>('/api/public/resume'),
  getSkills: () => fetchAPI<Skill[]>('/api/public/skills'),
  getBlog: () => fetchAPI<{ enabled: boolean; posts: BlogPost[] }>('/api/public/blog'),
  getBlogPost: (slug: string) => fetchAPI<BlogPost>(`/api/public/blog/${slug}`),
  getSettings: () => fetchAPI<{ colorTheme: string; blogEnabled: boolean; theme: string }>('/api/public/settings'),
}
