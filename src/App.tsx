import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  MapPin,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  Layers,
  Cloud,
  Cpu,
  Send,
  Loader2,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Compass
} from 'lucide-react';

// ============================================================================
// DATA LAYER (Strictly decoupled configuration - mirrors /data/*.ts files)
// ============================================================================

export interface ProfileConfig {
  fullName: string;
  firstName: string;
  initials: string;
  title: string;
  location: string;
  email: string;
  statusBadge: string;
  heroGreeting: string;
  heroHeadline: string;
  heroDescription: string;
}

export const profileData: ProfileConfig = {
  fullName: 'Gabrielius Uosis',
  firstName: 'Gabrielius',
  initials: 'GU',
  title: 'Computer Science Student & Software Engineer',
  location: 'London & Loughborough, UK',
  email: 'gabrieliusuosis@gmail.com',
  statusBadge: 'Available for Graduate Software Engineering Roles',
  heroGreeting: 'Hello, I am Gabrielius.',
  heroHeadline:
    'Building thoughtful full-stack applications, distributed systems, and clean developer tools.',
  heroDescription:
    'I am a Computer Science student at Loughborough University on a First Class track (75% average), passionate about crafting reliable software with clean architecture and human-centered design.'
};

export interface SocialItem {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: 'github' | 'linkedin' | 'mail';
}

export const socialsData: SocialItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@GabrieliusUosis',
    url: 'https://github.com/GabrieliusUosis',
    icon: 'github'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/gabrielius-uo',
    url: 'https://www.linkedin.com/in/gabrielius-uo/',
    icon: 'linkedin'
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'gabrieliusuosis@gmail.com',
    url: 'mailto:gabrieliusuosis@gmail.com',
    icon: 'mail'
  }
];

export interface HeroPillCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tone: 'sage' | 'terracotta' | 'sky' | 'stone';
  icon: 'graduation' | 'sparkles' | 'code' | 'location';
}

export const heroPillsData: HeroPillCard[] = [
  {
    id: 'education',
    title: 'CS @ Loughborough University',
    subtitle: 'BSc (Hons) Computer Science',
    badge: 'Education',
    tone: 'sage',
    icon: 'graduation'
  },
  {
    id: 'academic-track',
    title: 'First Class Track (75% Avg)',
    subtitle: 'Strong algorithmic & systems foundation',
    badge: 'Academic Standing',
    tone: 'terracotta',
    icon: 'sparkles'
  },
  {
    id: 'focus',
    title: 'Full-Stack & Systems Engineering',
    subtitle: 'Web platforms, compilers & cloud APIs',
    badge: 'Core Craft',
    tone: 'sky',
    icon: 'code'
  },
  {
    id: 'base',
    title: 'London & Loughborough, UK',
    subtitle: 'Open to UK-wide & hybrid graduate roles',
    badge: 'Location',
    tone: 'stone',
    icon: 'location'
  }
];

export interface ProjectItem {
  id: string;
  title: string;
  type: string;
  accent: 'sage' | 'terracotta' | 'sky' | 'amber';
  description: string;
  techTags: string[];
  githubUrl: string;
  liveUrl?: string;
  year: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'project-management-dashboard',
    title: 'Full-Stack Project Management Dashboard',
    type: 'Full-Stack Web Application',
    accent: 'sage',
    description:
      'A responsive management platform built to streamline team task distribution and role-based workflows, backed by scalable cloud infrastructure and RESTful APIs.',
    techTags: ['React', 'Node.js', 'PostgreSQL', 'GCP', 'REST APIs'],
    githubUrl: 'https://github.com/GabrieliusUosis',
    liveUrl: 'https://github.com/GabrieliusUosis',
    year: '2025'
  },
  {
    id: 'custom-language-compiler',
    title: 'Custom Programming Language & Compiler',
    type: 'Systems / Architecture Project',
    accent: 'terracotta',
    description:
      'An interpreted domain-specific programming language engineered with a recursive descent parser, custom AST evaluations, and precise syntax diagnostic reporting.',
    techTags: ['Python', 'Compilers', 'ASTs', 'Algorithms'],
    githubUrl: 'https://github.com/GabrieliusUosis',
    year: '2025'
  },
  {
    id: 'realtime-voice-modulation',
    title: 'Real-Time Voice Modulation Tool',
    type: 'Hackathon Winner (1st Place) / Audio Engineering',
    accent: 'sky',
    description:
      'Real-time speech transformation system integrating streaming APIs with sub-200ms latency to mitigate bias during technical interview screens.',
    techTags: ['Python', 'ElevenLabs API', 'WebSockets'],
    githubUrl: 'https://github.com/GabrieliusUosis',
    year: '2024'
  },
  {
    id: 'mobile-system-application',
    title: 'Mobile Application or System Tool',
    type: 'Mobile / Client Application',
    accent: 'amber',
    description:
      'Native application featuring clean local database persistence, reactive state architecture, and smooth fluid gesture transitions.',
    techTags: ['Kotlin', 'Jetpack Compose', 'Room DB'],
    githubUrl: 'https://github.com/GabrieliusUosis',
    year: '2024'
  }
];

export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  accent: 'sage' | 'terracotta' | 'sky' | 'amber';
  icon: 'code' | 'layers' | 'cloud' | 'cpu';
  skills: string[];
}

export const skillsData: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Languages',
    description: 'Core languages for systems, web, and data engineering',
    accent: 'sage',
    icon: 'code',
    skills: ['Python', 'Java', 'Kotlin', 'TypeScript', 'C++', 'SQL']
  },
  {
    id: 'frameworks',
    category: 'Frameworks & Libraries',
    description: 'Modern tools for responsive interfaces and backend services',
    accent: 'terracotta',
    icon: 'layers',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Jetpack Compose']
  },
  {
    id: 'cloud-devops',
    category: 'Cloud & DevOps',
    description: 'Database persistence, containerization, and cloud deployment',
    accent: 'sky',
    icon: 'cloud',
    skills: ['PostgreSQL', 'Docker', 'Google Cloud Platform (GCP)', 'Git', 'Linux']
  },
  {
    id: 'fundamentals',
    category: 'Fundamentals',
    description: 'Architectural principles and computer science foundations',
    accent: 'amber',
    icon: 'cpu',
    skills: ['Distributed Systems', 'REST APIs', 'Object-Oriented Design', 'Data Structures']
  }
];

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: 'Education' | 'Engineering' | 'Operations';
  highlightBadge: string;
  accent: 'sage' | 'terracotta' | 'sky';
  summary: string;
  tags: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'loughborough-cs',
    role: 'BSc (Hons) Computer Science',
    organization: 'Loughborough University',
    location: 'Loughborough, UK',
    period: 'Present',
    category: 'Education',
    highlightBadge: 'First Class Track (75% Average)',
    accent: 'sage',
    summary:
      'Pursuing an undergraduate degree in Computer Science with a 75% First Class average. Coursework spans software architecture, algorithms and data structures, operating systems, relational databases, and artificial intelligence.',
    tags: ['First Class Track', 'Algorithms', 'Software Engineering', 'Distributed Systems']
  },
  {
    id: 'adapt-intern',
    role: 'Software Intern',
    organization: 'Adapt',
    location: 'United Kingdom',
    period: 'Internship',
    category: 'Engineering',
    highlightBadge: '10k+ Active Users',
    accent: 'sky',
    summary:
      'Engineered interactive UI modules and student revision features in React Native for a mobile learning platform serving more than 10,000 users. Collaborated closely on state management and smooth mobile user flows.',
    tags: ['React Native', 'Mobile Engineering', 'UI Components', 'Agile']
  },
  {
    id: 'gordons-wine-bar',
    role: 'Floor Staff / High-Volume Operations',
    organization: "Gordon's Wine Bar",
    location: 'Central London, UK',
    period: 'Hospitality & Operations',
    category: 'Operations',
    highlightBadge: 'High-Pressure Teamwork',
    accent: 'terracotta',
    summary:
      "Delivered fast-paced hospitality coordination and attentive guest service at London's oldest wine bar. Developed strong communication habits, composure under peak service pressure, and seamless team coordination.",
    tags: ['Team Coordination', 'Client Relations', 'Fast-Paced Operations']
  }
];

export const navItemsData = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'toolkit', label: 'Toolkit', href: '#toolkit' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

// ============================================================================
// THEME TOKENS & ICON HELPERS
// ============================================================================

const accentStyles = {
  sage: {
    pillBg: 'bg-[#e7f0eb]',
    pillText: 'text-[#2d5a43]',
    pillBorder: 'border-[#cfe2d8]',
    cardTint: 'hover:border-[#bfd8cb]',
    dot: 'bg-[#3b7a57]'
  },
  terracotta: {
    pillBg: 'bg-[#f9ebe6]',
    pillText: 'text-[#9e472d]',
    pillBorder: 'border-[#f1d4ca]',
    cardTint: 'hover:border-[#e8bfb0]',
    dot: 'bg-[#c86d51]'
  },
  sky: {
    pillBg: 'bg-[#eaf1f5]',
    pillText: 'text-[#345e77]',
    pillBorder: 'border-[#d3e2ec]',
    cardTint: 'hover:border-[#b9d2e2]',
    dot: 'bg-[#4a7c9b]'
  },
  amber: {
    pillBg: 'bg-[#f5efe2]',
    pillText: 'text-[#7c5826]',
    pillBorder: 'border-[#e8dcc2]',
    cardTint: 'hover:border-[#dcc8a2]',
    dot: 'bg-[#b5843b]'
  },
  stone: {
    pillBg: 'bg-[#f0eee9]',
    pillText: 'text-[#44403c]',
    pillBorder: 'border-[#e2ded6]',
    cardTint: 'hover:border-[#d6d1c7]',
    dot: 'bg-[#78716c]'
  }
};

const SocialIcon: React.FC<{ icon: SocialItem['icon']; className?: string }> = ({
  icon,
  className = 'w-4 h-4'
}) => {
  switch (icon) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'mail':
      return <Mail className={className} />;
    default:
      return <Mail className={className} />;
  }
};

const SkillCategoryIcon: React.FC<{ icon: SkillGroup['icon']; className?: string }> = ({
  icon,
  className = 'w-5 h-5'
}) => {
  switch (icon) {
    case 'code':
      return <Code2 className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    default:
      return <Code2 className={className} />;
  }
};

const HeroCardIcon: React.FC<{ icon: HeroPillCard['icon']; className?: string }> = ({
  icon,
  className = 'w-4 h-4'
}) => {
  switch (icon) {
    case 'graduation':
      return <GraduationCap className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'code':
      return <Code2 className={className} />;
    case 'location':
      return <MapPin className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');
  const [selectedHeroCard, setSelectedHeroCard] = useState<string>(heroPillsData[0].id);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const item of navItemsData) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (href === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav(id);
      }
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = profileData.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please share your name';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errors.message = 'Please write a short message (at least 8 characters)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    }, 1000);
  };

  const githubProfileUrl =
    socialsData.find((s) => s.id === 'github')?.url || 'https://github.com/GabrieliusUosis';

  return (
    <div
      id="top"
      className="min-h-screen bg-[#faf8f5] text-[#1c1917] selection:bg-[#e7f0eb] selection:text-[#1c1917] relative overflow-x-hidden antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-[#e7f0eb]/55 blur-[110px]" />
        <div className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-[#f9ebe6]/55 blur-[110px]" />
        <div className="absolute bottom-12 left-10 w-[480px] h-[480px] rounded-full bg-[#eaf1f5]/50 blur-[120px]" />
      </div>

      <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center">
        <nav
          aria-label="Main Navigation"
          className="w-full max-w-3xl rounded-full bg-white/75 backdrop-blur-md border border-stone-200/70 shadow-[0_8px_30px_rgb(28,25,23,0.05)] px-3 sm:px-4 py-2 flex items-center justify-between transition-all"
        >
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, '#top')}
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-stone-100/80 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-[#1c1917] text-[#faf8f5] text-xs font-semibold flex items-center justify-center tracking-tight">
              {profileData.initials}
            </span>
            <span className="font-semibold text-sm text-[#1c1917] tracking-tight">
              {profileData.fullName}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItemsData.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'text-[#1c1917]' : 'text-[#78716c] hover:text-[#1c1917]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[#f0eee9] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.a
              whileHover={{ y: -1.5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-sm transition-colors"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 rounded-full bg-[#f0eee9] text-[#1c1917] hover:bg-stone-200/70 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-16 left-4 right-4 rounded-[2rem] bg-white/95 backdrop-blur-lg border border-stone-200/80 shadow-xl p-5 flex flex-col gap-2"
            >
              {navItemsData.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="px-4 py-2.5 rounded-full text-sm font-medium text-[#292524] hover:bg-[#f0eee9] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="mt-2 w-full text-center py-3 rounded-full text-sm font-medium bg-stone-900 text-stone-50"
              >
                Let's Talk
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24 space-y-28 sm:space-y-32">
        <section id="about" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-7"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#e7f0eb] border border-[#cfe2d8] text-[#2d5a43] text-xs sm:text-sm font-medium shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b7a57] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3b7a57]" />
                </span>
                <span>{profileData.statusBadge}</span>
              </div>

              <div className="space-y-4">
                <p className="text-base sm:text-lg font-medium text-[#78716c]">
                  {profileData.heroGreeting}
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1c1917] leading-[1.15]">
                  {profileData.heroHeadline}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#78716c] leading-relaxed max-w-2xl">
                {profileData.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {socialsData.map((social) => (
                  <motion.a
                    key={social.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={social.url}
                    target={social.id === 'email' ? undefined : '_blank'}
                    rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-stone-200/80 shadow-sm hover:border-stone-300 text-sm font-medium text-[#292524] transition-all"
                  >
                    <SocialIcon icon={social.icon} className="w-4 h-4 text-[#78716c]" />
                    <span>{social.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#78716c]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <div className="rounded-[2.5rem] bg-[#f0eee9]/90 border border-stone-200/70 p-6 sm:p-7 shadow-[0_12px_40px_-15px_rgba(28,25,23,0.06)] space-y-5">
                <div className="flex items-center justify-between bg-white rounded-full px-4 py-3 border border-stone-200/60 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e7f0eb] border border-[#cfe2d8] text-[#2d5a43] font-bold text-sm flex items-center justify-center">
                      {profileData.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1c1917]">
                        {profileData.fullName}
                      </div>
                      <div className="text-xs text-[#78716c]">
                        {profileData.title}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#faf8f5] border border-stone-200/70 text-[11px] font-medium text-[#78716c]">
                    UK
                  </span>
                </div>

                <div className="space-y-3">
                  {heroPillsData.map((card) => {
                    const style = accentStyles[card.tone];
                    const isSelected = selectedHeroCard === card.id;
                    return (
                      <motion.button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedHeroCard(card.id)}
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        className={`w-full text-left rounded-[1.5rem] p-4 transition-all border ${
                          isSelected
                            ? 'bg-white border-stone-300/90 shadow-md'
                            : 'bg-white/75 border-stone-200/60 shadow-sm hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 w-9 h-9 rounded-full ${style.pillBg} ${style.pillText} border ${style.pillBorder} flex items-center justify-center shrink-0`}
                            >
                              <HeroCardIcon icon={card.icon} className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#1c1917]">
                                {card.title}
                              </div>
                              <div className="text-xs text-[#78716c] mt-0.5">
                                {card.subtitle}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${style.pillBg} ${style.pillText} border ${style.pillBorder} shrink-0`}
                          >
                            {card.badge}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-1 flex items-center justify-between px-2 text-xs text-[#78716c]">
                  <span className="inline-flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#3b7a57]" />
                    <span>Interactive snapshot</span>
                  </span>
                  <a
                    href="#projects"
                    onClick={(e) => scrollToSection(e, '#projects')}
                    className="font-medium text-[#1c1917] hover:underline"
                  >
                    Explore work ↓
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-32 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0eee9] border border-stone-200/80 text-xs font-medium text-[#44403c]">
                Selected Engineering Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
                Featured Projects
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#78716c] max-w-md leading-relaxed">
              Full-stack web applications, custom language compilers, and low-latency systems engineered with clean architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {projectsData.map((project) => {
              const style = accentStyles[project.accent];
              return (
                <motion.article
                  key={project.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className={`group rounded-[2rem] bg-white border border-stone-200/70 ${style.cardTint} p-8 sm:p-10 shadow-[0_12px_40px_-15px_rgba(28,25,23,0.06)] hover:shadow-[0_20px_50px_-15px_rgba(28,25,23,0.1)] flex flex-col justify-between transition-all`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium ${style.pillBg} ${style.pillText} border ${style.pillBorder}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {project.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#faf8f5] border border-stone-200/60 text-xs font-medium text-[#78716c]">
                        {project.year}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917] leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#78716c] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-stone-100 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#faf8f5] text-[#44403c] border border-stone-200/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <motion.a
                        whileHover={{ y: -1.5 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Source</span>
                      </motion.a>

                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ y: -1.5 }}
                          whileTap={{ scale: 0.98 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#f0eee9] hover:bg-stone-200/80 text-[#1c1917] transition-colors"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#78716c]" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="toolkit" className="scroll-mt-32 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7f0eb] border border-[#cfe2d8] text-xs font-medium text-[#2d5a43]">
                Technical Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
                Skills & Toolkit
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveSkillCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeSkillCategory === 'all'
                    ? 'bg-stone-900 text-stone-50 shadow-sm'
                    : 'bg-white text-[#78716c] border border-stone-200/70 hover:text-[#1c1917]'
                }`}
              >
                All Areas
              </button>
              {skillsData.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveSkillCategory(group.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeSkillCategory === group.id
                      ? 'bg-stone-900 text-stone-50 shadow-sm'
                      : 'bg-white text-[#78716c] border border-stone-200/70 hover:text-[#1c1917]'
                  }`}
                >
                  {group.category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData
              .filter((group) => activeSkillCategory === 'all' || group.id === activeSkillCategory)
              .map((group) => {
                const style = accentStyles[group.accent];
                return (
                  <motion.div
                    layout
                    key={group.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-[2rem] bg-white border border-stone-200/70 p-7 sm:p-8 shadow-[0_12px_40px_-15px_rgba(28,25,23,0.05)] flex flex-col justify-between space-y-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-[#1c1917]">
                          {group.category}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#78716c]">
                          {group.description}
                        </p>
                      </div>
                      <div
                        className={`w-11 h-11 rounded-full ${style.pillBg} ${style.pillText} border ${style.pillBorder} flex items-center justify-center shrink-0`}
                      >
                        <SkillCategoryIcon icon={group.icon} className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ y: -2 }}
                          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${style.pillBg} ${style.pillText} border ${style.pillBorder} transition-shadow hover:shadow-sm cursor-default`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </section>

        <section id="experience" className="scroll-mt-32 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f9ebe6] border border-[#f1d4ca] text-xs font-medium text-[#9e472d]">
                Academic & Professional Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
                Experience & Education
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#78716c] max-w-md leading-relaxed">
              Combining rigorous academic foundations in computer science with practical product engineering and fast-paced team operations.
            </p>
          </div>

          <div className="relative pl-4 sm:pl-8 space-y-6 before:content-[''] before:absolute before:top-6 before:bottom-6 before:left-1.5 sm:before:left-3 before:w-[2px] before:bg-stone-200/90 before:rounded-full">
            {experienceData.map((item) => {
              const style = accentStyles[item.accent];
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className="relative rounded-[2rem] bg-white border border-stone-200/70 p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(28,25,23,0.05)]"
                >
                  <span
                    className={`absolute -left-[1.35rem] sm:-left-[1.85rem] top-9 w-4 h-4 rounded-full ${style.dot} ring-4 ring-[#faf8f5]`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className={`px-3.5 py-1 rounded-full text-xs font-medium ${style.pillBg} ${style.pillText} border ${style.pillBorder}`}
                      >
                        {item.category}
                      </span>
                      <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-[#faf8f5] border border-stone-200/70 text-[#44403c]">
                        {item.highlightBadge}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-medium text-[#78716c]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917]">
                      {item.role}{' '}
                      <span className="font-normal text-[#78716c]">
                        at {item.organization}
                      </span>
                    </h3>
                    <p className="text-sm sm:text-base text-[#78716c] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-stone-100">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#faf8f5] text-[#78716c] border border-stone-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="scroll-mt-32">
          <div className="rounded-[2.5rem] bg-[#f0eee9] border border-stone-200/80 p-7 sm:p-12 shadow-[0_12px_40px_-15px_rgba(28,25,23,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/70 text-xs font-medium text-[#2d5a43]">
                  <span className="w-2 h-2 rounded-full bg-[#3b7a57]" />
                  Open to Conversations
                </span>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917] leading-tight">
                    Have an opening or want to connect?
                  </h2>
                  <p className="text-sm sm:text-base text-[#78716c] leading-relaxed">
                    Whether you are hiring for graduate software engineering roles, planning a project, or simply want to say hello, I would love to hear from you.
                  </p>
                </div>

                <div className="rounded-[2rem] bg-white border border-stone-200/70 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#78716c]">
                      Direct Email
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e7f0eb] text-[#2d5a43] text-[11px] font-medium">
                      Fast Response
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-[#1c1917] break-all">
                    {profileData.email}
                  </div>

                  <div className="relative">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1.5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopyEmail}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                        copiedEmail
                          ? 'bg-[#e7f0eb] text-[#2d5a43] border border-[#cfe2d8]'
                          : 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                      }`}
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {socialsData
                    .filter((s) => s.id !== 'email')
                    .map((social) => (
                      <motion.a
                        key={social.id}
                        whileHover={{ y: -2 }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-stone-200/70 text-xs sm:text-sm font-medium text-[#1c1917] hover:border-stone-300 shadow-sm transition-all"
                      >
                        <SocialIcon icon={social.icon} className="w-4 h-4 text-[#78716c]" />
                        <span>{social.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#78716c]" />
                      </motion.a>
                    ))}
                </div>
              </div>

              <div className="lg:col-span-7 rounded-[2rem] bg-white border border-stone-200/70 p-7 sm:p-9 shadow-sm">
                <h3 className="text-xl font-bold text-[#1c1917] mb-1">
                  Send a Direct Note
                </h3>
                <p className="text-xs sm:text-sm text-[#78716c] mb-6">
                  Fill out the fields below and I will get back to you soon.
                </p>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-6 p-4 rounded-2xl bg-[#e7f0eb] border border-[#cfe2d8] flex items-start gap-3 text-[#2d5a43]"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <p className="font-semibold">Thank you for your message!</p>
                        <p className="mt-0.5 opacity-90">
                          Your note has been received. I look forward to speaking with you.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-[#44403c] mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) {
                            setFormErrors({ ...formErrors, name: '' });
                          }
                        }}
                        placeholder="Alex Morgan"
                        className={`w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border text-sm text-[#1c1917] placeholder-[#78716c]/50 focus:outline-none focus:bg-white transition-all ${
                          formErrors.name
                            ? 'border-[#c86d51] focus:ring-2 focus:ring-[#f9ebe6]'
                            : 'border-stone-200/80 focus:border-stone-400 focus:ring-4 focus:ring-stone-100'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-[#9e472d] mt-1.5">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-[#44403c] mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) {
                            setFormErrors({ ...formErrors, email: '' });
                          }
                        }}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border text-sm text-[#1c1917] placeholder-[#78716c]/50 focus:outline-none focus:bg-white transition-all ${
                          formErrors.email
                            ? 'border-[#c86d51] focus:ring-2 focus:ring-[#f9ebe6]'
                            : 'border-stone-200/80 focus:border-stone-400 focus:ring-4 focus:ring-stone-100'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-[#9e472d] mt-1.5">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-[#44403c] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) {
                          setFormErrors({ ...formErrors, message: '' });
                        }
                      }}
                      placeholder="Hi Gabrielius, I came across your portfolio and would love to discuss an engineering role..."
                      className={`w-full px-4 py-3 rounded-2xl bg-[#faf8f5] border text-sm text-[#1c1917] placeholder-[#78716c]/50 focus:outline-none focus:bg-white transition-all resize-none ${
                        formErrors.message
                          ? 'border-[#c86d51] focus:ring-2 focus:ring-[#f9ebe6]'
                          : 'border-stone-200/80 focus:border-stone-400 focus:ring-4 focus:ring-stone-100'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-[#9e472d] mt-1.5">{formErrors.message}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-stone-900 text-stone-50 hover:bg-stone-800 disabled:opacity-60 shadow-sm transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-stone-200/70 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#78716c]">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-stone-50 text-[10px] font-semibold flex items-center justify-center">
              {profileData.initials}
            </span>
            <span>
              © {new Date().getFullYear()} {profileData.fullName}. Crafted with care in {profileData.location}.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1c1917] transition-colors"
            >
              GitHub
            </a>
            <a
              href="#top"
              onClick={(e) => scrollToSection(e, '#top')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200/80 text-[#1c1917] font-medium shadow-sm hover:bg-[#f0eee9] transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
