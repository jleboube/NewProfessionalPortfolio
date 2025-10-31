import type { SiteData, ResumeItem, Project, Service, Skill } from '../services/api'
import type { HeroContent, TimelineItem, Skill as ContentSkill, Project as ContentProject, Service as ContentService } from '../pages/content.types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6905'

export function mapDataToContent(data: SiteData) {
  return {
    profile: data.profile,
    heroContent: mapToHeroContent(data),
    timeline: mapToTimeline(data.resume),
    technicalSkills: mapToSkills(data.skills, 'technical'),
    professionalSkills: mapToSkills(data.skills, 'professional'),
    projects: mapToProjects(data.projects),
    services: mapToServices(data.services),
    blogEnabled: data.blogEnabled,
    blogPosts: data.blogPosts || []
  }
}

function mapToHeroContent(data: SiteData): HeroContent {
  const profile = data.profile
  const awardItem = data.resume.find(r => r.type === 'awards')
  const experienceItems = data.resume.filter(r => r.type === 'experience')

  // Calculate years of experience
  const earliestYear = Math.min(...experienceItems.map(exp => {
    const startYear = exp.start.match(/\d{4}/)
    return startYear ? parseInt(startYear[0]) : new Date().getFullYear()
  }))
  const yearsExperience = new Date().getFullYear() - earliestYear

  return {
    eyebrow: `${experienceItems[0]?.role || profile.title} · ${profile.location}`,
    title: profile.bio || `Technology leadership for teams that want velocity without the chaos.`,
    description: profile.bio || '',
    primaryCta: {
      label: 'Book an intro',
      href: `mailto:${profile.email}`
    },
    secondaryCta: {
      label: 'Download resume',
      href: '/resume'
    },
    image: {
      src: profile.photo ? `${API_BASE_URL}${profile.photo}` : '',
      alt: `${profile.name} professional photo`
    },
    badge: {
      title: awardItem?.certification || awardItem?.award || 'Professional',
      subtitle: awardItem?.organization || ''
    },
    stats: [
      { label: 'Years in technology', value: `${yearsExperience}+` },
      { label: 'Companies', value: `${experienceItems.length}` },
      { label: 'Projects delivered', value: `${data.projects.length}+` }
    ]
  }
}

function mapToTimeline(resume: ResumeItem[]): TimelineItem[] {
  return resume
    .filter(item => item.type === 'experience')
    .map(exp => ({
      years: `${exp.start} — ${exp.end}`,
      company: exp.company || '',
      role: exp.role || '',
      summary: exp.summary || ''
    }))
}

function mapToSkills(skills: Skill[], category: 'technical' | 'professional'): ContentSkill[] {
  return skills
    .filter(skill => skill.category === category)
    .map(skill => ({
      name: skill.name,
      value: parseInt(skill.level) || 50,
      description: undefined
    }))
}

function mapToProjects(projects: Project[]): ContentProject[] {
  return projects
    .filter(p => p.featuredOnHome !== false)
    .map(project => ({
      title: project.name,
      blurb: project.description,
      stack: [], // We don't have tech stack in the current data model
      image: project.image ? `${API_BASE_URL}${project.image}` : 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      link: project.url || project.source || '#',
      highlight: '' // We don't have this in current data
    }))
}

function mapToServices(services: Service[]): ContentService[] {
  return services.map(service => ({
    title: service.title,
    description: service.summary,
    outcomes: service.highlights
  }))
}
