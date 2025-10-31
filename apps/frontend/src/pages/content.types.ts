export type NavLink = {
  label: string
  section?: string
  href?: string
}

export type HeroStat = {
  label: string
  value: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  image: { src: string; alt: string }
  badge: { title: string; subtitle: string }
  stats: HeroStat[]
}

export type TimelineItem = {
  years: string
  company: string
  role: string
  summary: string
}

export type Skill = {
  name: string
  value: number
  description?: string
}

export type Project = {
  title: string
  blurb: string
  stack: string[]
  image: string
  link: string
  highlight: string
}

export type Service = {
  title: string
  description: string
  outcomes: string[]
}

export type SectionCopy = {
  kicker: string
  title: string
  copy: string
}

export type ContactIcon = 'mail' | 'github' | 'linkedin'

export type ContactLink = {
  label: string
  value: string
  href: string
  icon: ContactIcon
}
