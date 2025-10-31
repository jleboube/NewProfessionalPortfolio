// Central content configuration.
// Update this file to change copy, links, stats, and media across the landing page.
// Hero portrait uses the bundled image below. Swap the import if you prefer a different asset.
import heroPortrait from './assets/Joe_LeBoube_On_Stage_CCC_hidden.png'

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

export const navLinks: NavLink[] = [
  { label: 'Home', section: 'hero' },
  { label: 'Projects', href: '/projects' },
  { label: 'GitHub', href: 'https://github.com/jleboube' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joe-leboube' },
  { label: 'Contact', section: 'contact' },
]

export const heroContent: HeroContent = {
  eyebrow: 'Sr. Customer Solutions Manager · Evansville, IN',
  title: 'Cloud, AI, and product leadership for teams that want velocity without the chaos.',
  description:
    'Awarded AWS Central CSM of the Year (2023) for orchestrating multi-threaded Enterprise cloud launches. I help teams translate ambition into deployable roadmaps, blending GenAI experimentation with provable value.',
  primaryCta: { label: 'Book an intro', href: 'mailto:joe@joeleboube.com' },
  secondaryCta: { label: 'Download resume', href: 'https://joeleboube.com/resume.pdf' },
  image: {
    src: heroPortrait,
    alt: 'Joe LeBoube presenting on stage',
  },
  badge: {
    title: 'Certified AWS Solutions Architect',
    subtitle: 'CSM of the Year · 2023',
  },
  stats: [
    { label: 'Years in technology leadership', value: '20+' },
    { label: 'Transformations delivered', value: '60+' },
    { label: 'Cloud programs stood up', value: '25+' },
  ],
}

export const timeline: TimelineItem[] = [
  {
    years: '2022 — Present',
    company: 'Amazon Web Services',
    role: 'Sr. Customer Solutions Manager',
    summary:
      'Guiding Fortune 500 modernization journeys, using data-backed playbooks to unblock AI and cloud-scale adoption across regulated industries.',
  },
  {
    years: '2017 - 2022',
    company: 'Entegral (Owned by Enterprise Mobility)',
    role: 'Department Manager - Head of Digital Transformation',
    summary:
      'Helped "Startup" SaaS company utilize Enterprise funding while keeping the "Starup" culture.  Provide solutions to software product teams to enable platform features targeted to enhance feature delivery. For example, no down-time deployments, blue/green deployments, and service mesh',
  },
  {
    years: '2015 - 2017',
    company: 'Enterprise Mobility',
    role: 'Department Manager - Head of Digital Transformation',
    summary:
      'Responsible for multiple products in the Orchestration layer of the Launchpad solution. This included API design, documentation, and development',
  },
  {
    years: '2007 - 2015',
    company: 'Enterprise Mobility',
    role: 'Manager -> Sr Manager',
    summary:
      'Worked with technical leaders to provide a resilient architecture across multiple regions to allow for high availability to ensure the best customer and employee experience',
  },
  {
    years: '2000 — 2007',
    company: 'AT&T',
    role: 'Project Manager -> Manager',
    summary:
      'Worked directly on mergers with Ameritech, AT&T, and BellSouth to integrate systems and maximize efficiency.',
  },
  {
    years: '1998 — 2000',
    company: 'JCN Internet Services',
    role: 'Technology & Ops Lead',
    summary:
      'Aided in CAT 5 cable installation, Windows NT Server installation, iMail Server configuration, domain name registrations, web design, and network security',
  },
  {
    years: '1996 — 2000',
    company: "Cecil Whittaker's Pizza",
    role: 'Pizza Driver',
    summary:
      'Pioneered “Delivery Paging”, which allowed the on duty Manager to page the delivery driver when a delivery order was placed. This allowed delivery drivers to play whiffle ball in between deliveries',
  },
]

export const technicalSkills: Skill[] = [
  { name: 'Docker & Container Strategy', value: 80, description: 'Platform migration, multi-cloud orchestration' },
  { name: 'Vibe Coding / Generative AI', value: 70, description: 'Prompt engineering & custom copilots' },
  { name: 'JavaScript Ecosystem', value: 60, description: 'Experience from React to build tooling' },
  { name: 'Python Automation', value: 40, description: 'Glue scripts, data wrangling, automation' },
]

export const professionalSkills: Skill[] = [
  { name: 'Coachable', value: 100 },
  { name: 'Communication', value: 95 },
  { name: 'Leadership', value: 90 },
  { name: 'Empathy', value: 80 },
]

export const projects: Project[] = [
  {
    title: 'Majic-Photo',
    blurb: 'AI-native portrait refinement pipeline for creatives and e-commerce teams needing rapid look-dev iterations.',
    stack: ['Next.js', 'Stable Diffusion', 'Edge Functions'],
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80',
    link: 'https://joeleboube.com/projects#majic-photo',
    highlight: 'Reduced creative hand-off time by 55%',
  },
  {
    title: 'Call-Bio',
    blurb: 'Dynamic briefing room that pulls CRM, LinkedIn, and product telemetry into one glanceable card pre-call.',
    stack: ['TypeScript', 'LangChain', 'AWS AppSync'],
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    link: 'https://joeleboube.com/projects#call-bio',
    highlight: 'Trusted by global account teams',
  },
  {
    title: 'Professional Persona Engine',
    blurb: 'Narrative-first personal site system that combines storytelling, analytics, and stylized microsites.',
    stack: ['Astro', 'Three.js', 'Cloudflare Pages'],
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    link: 'https://joeleboube.com/projects#professional-profile',
    highlight: 'Drove a 3x lift in recruiter engagement',
  },
  {
    title: 'Baseball Exit Velocity Lab',
    blurb: 'Computer-vision powered analyzer that tracks youth player development with sub-second insights.',
    stack: ['Python', 'OpenCV', 'AWS Lambda'],
    image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=1200&q=80',
    link: 'https://joeleboube.com/projects#exit-velocity',
    highlight: 'Adopted by elite travel programs',
  },
  {
    title: 'Remote Chess Arena',
    blurb: 'Blended physical/digital chessboard with WebRTC coaching overlays for remote cohorts.',
    stack: ['WebRTC', 'React', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    link: 'https://joeleboube.com/projects#remote-chess',
    highlight: 'Featured in AWS Community Builders demo day',
  },
  {
    title: 'HairDid.store',
    blurb: 'Hyperlocal marketplace that pairs stylists with GenAI lookbooks and instant booking flows.',
    stack: ['Remix', 'Stripe', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
    link: 'https://joeleboube.com/projects#hairdid',
    highlight: 'Launched in 3 cities within 90 days',
  },
]

export const services: Service[] = [
  {
    title: 'Cloud & AI Transformation Pods',
    description: 'Embed alongside leadership teams to de-risk AI and cloud programs with measurable OKRs.',
    outcomes: ['Value-stream mapping', 'GenAI pilot factory', 'Executive enablement workshops'],
  },
  {
    title: 'Product Acceleration Sprints',
    description: 'Design-to-build engagements for prototypes that need storytelling, UX, and production-ready code.',
    outcomes: ['Rapid prototyping', 'Foundational design systems', 'Launch comms support'],
  },
  {
    title: 'Leadership Coaching',
    description: 'One-on-one advisory for tech leaders navigating scale, culture change, or new customer plays.',
    outcomes: ['CSM playbooks', 'Team rituals', 'Career navigation'],
  },
]

export const sectionCopy: Record<'experience' | 'projects' | 'github' | 'services' | 'contact', SectionCopy> = {
  experience: {
    kicker: 'Professional Experience',
    title: '20+ years of resilient delivery',
    copy: 'From pizza franchises to Fortune 100 clouds, every stop sharpened systems thinking, storytelling, and the empathy needed to lead.',
  },
  projects: {
    kicker: 'Selected Projects',
    title: 'Hands-on builds that keep me dangerous',
    copy: 'Each project balances experimentation with measurable value. Hover to see the story; click to explore deeper case studies.',
  },
  github: {
    kicker: 'GitHub Contribution Stream',
    title: 'Real-time shipping cadence',
    copy: 'Pulling public events from @jleboube to show how often prototypes, spikes, and customer-ready artifacts land.',
  },
  services: {
    kicker: 'Professional Services',
    title: 'Ways we can engage',
    copy: 'Partnering with startups, Fortune 500 operators, and fellow builders to ship the right thing faster.',
  },
  contact: {
    kicker: 'Contact',
    title: 'Let’s map your next move',
    copy: 'Whether you need an embedded builder, an advisor, or a sparring partner for the next AI experiment, I’m here.',
  },
}

export const projectsCta = {
  message: 'Craving more? Explore the full backlog.',
  label: 'View all projects',
  href: '/projects',
}

export const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'joe@joeleboube.com', href: 'mailto:joe@joeleboube.com', icon: 'mail' },
  { label: 'GitHub', value: '@jleboube', href: 'https://github.com/jleboube', icon: 'github' },
  {
    label: 'LinkedIn',
    value: '/in/joe-leboube',
    href: 'https://www.linkedin.com/in/joe-leboube',
    icon: 'linkedin',
  },
]

export const contactMeta =
  'Based in Evansville, IN 47725 · Available for remote and hybrid engagements · avg response within 24 hrs'
