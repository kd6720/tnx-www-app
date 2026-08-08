import { Link } from 'react-router-dom';
import {
  Phone,
  Bot,
  Wifi,
  PhoneCall,
  Smartphone,

  ArrowRight,
  Users,
  Zap,
  Shield,
  Handshake,

  CheckCircle2,
} from 'lucide-react';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import MultiStepForm from '../components/MultiStepForm';
import StatValue from '../components/StatValue';
import Reveal from '../components/Reveal';

const services = [
  {
    to: '/ai-workforce',
    title: 'AI Workforce for Modern Telecom',
    description: 'AI agents that sell, support, and monitor — 24/7, telecom-native',
    icon: Bot,
  },
  {
    to: '/ai-consulting',
    title: 'AI Consulting & Solutions',
    description: 'Practical AI automation, strategy, and implementation services',
    icon: Bot,
  },
  {
    to: '/internet-connectivity',
    title: 'Internet Connectivity',
    description: 'High-speed internet solutions for business',
    icon: Wifi,
  },
  {
    to: '/pots-replacement',
    title: 'POTS Replacement',
    description: 'Modern alternatives to traditional phone lines',
    icon: Phone,
  },
  {
    to: '/voice-solutions',
    title: 'Voice Solutions & IP PBX',
    description: 'Cloud phone systems and unified communications',
    icon: PhoneCall,
  },
  {
    to: '/mobility-solutions',
    title: 'Mobility Solutions',
    description: 'Enterprise mobility management and solutions',
    icon: Smartphone,
  },
];

const whyChooseUs = [
  {
    icon: Handshake,
    title: 'Proven Expertise',
    description:
      'With decades of experience in telecom and enterprise solutions, we understand the unique challenges businesses face in connectivity and infrastructure modernization.',
  },
  {
    icon: Users,
    title: 'Strategic Partnerships',
    description:
      'We have successfully led high-profile projects with global telecom providers, government agencies, and Fortune 500 companies.',
  },
  {
    icon: Zap,
    title: 'Innovative Solutions',
    description:
      'From cellular data technology to cloud-based communication systems, we offer future-proof solutions tailored to your needs.',
  },
  {
    icon: Shield,
    title: 'Reliable & Scalable',
    description:
      'Our solutions are designed for long-term success, helping businesses reduce costs, improve efficiency, and enhance communication capabilities.',
  },
];

const stats = [
  { value: '25+', label: 'Years of telecom expertise' },
  { value: '12M+', label: 'Legacy lines we can modernize' },
  { value: '50%', label: 'Typical reduction in line costs' },
  { value: '24/7', label: 'Monitoring & support' },
];

const testimonials = [
  {
    quote:
      'TrustedNetworx moved our entire portfolio off legacy copper without a single day of downtime. The savings hit our bottom line immediately.',
    name: 'Operations Director',
    role: 'Multi-Site Property Group',
  },
  {
    quote:
      'Their team understood our compliance constraints from day one. The new voice and mobility stack just works across all of our facilities.',
    name: 'IT Manager',
    role: 'Senior Living Network',
  },
  {
    quote:
      'Practical, no-nonsense partners. They scoped exactly what we needed, deployed fast, and stuck around to optimize. Genuinely refreshing.',
    name: 'VP of Technology',
    role: 'Regional Hospitality Brand',
  },
];

const Home = () => {
  return (
    <div className="bg-navy-50">
      <Seo
        title="TrustedNetworx — Managed Telecom Solutions"
        description="Modern managed telecom solutions for enterprise and multi-site businesses: POTS replacement, AI consulting, internet connectivity, IP PBX, mobility, and voice."
      />

      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <HeroVideo
          name="hero-home"
          overlayClassName="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"
        />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />
        <div className="absolute inset-0 z-0 bg-hero-glow" />
        {/* floating orbs */}

        <div className="relative z-10 w-full pt-20 pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200 animate-fadeInUp">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Managed Solution Provider
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] animate-fadeInUp">
                Replace failing copper.{' '}
                <span className="text-brand-300">
                  Cut line costs in half.
                </span>{' '}
                Stay compliant.
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-navy-200 animate-fadeInUp">
                TrustedNetworx modernizes POTS lines, voice, connectivity, and mobility for
                multi-site organizations — senior living, hospitality, property management, and
                healthcare — without downtime and without the carrier runaround.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4 animate-fadeInUp">
                <a href="#quote" className="btn-light">
                  Get a Free Line Audit
                  <ArrowRight size={18} />
                </a>
                <a href="#services" className="btn-outline">
                  Explore Solutions
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-300 animate-fadeInUp">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-400" /> NFPA 72-compliant alarm
                  communications
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-400" /> UL 864-listed hardware
                  deployments
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-400" /> E911 / Kari&apos;s Law
                  ready
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-400" /> 24/7 monitored lines
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-20 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-morphism rounded-2xl bg-white/90 px-6 py-8 shadow-card-hover">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl md:text-4xl font-extrabold text-brand-700">
                    <StatValue value={value} />
                  </p>
                  <p className="mt-1 text-sm text-navy-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow bg-brand-50 text-brand-700">What we do</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Managed Services
            </h2>
            <p className="mt-4 text-lg text-navy-500">
              Six ways we modernize telecom for multi-site operators — from copper replacement to
              AI-run operations.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ to, title, description, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col rounded-2xl bg-white p-7 border border-navy-100 shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-card-hover hover:border-brand-200"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-100">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy-900">{title}</h3>
                <p className="mt-2 flex-grow text-navy-500">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Learn more
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">Why TrustedNetworx</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-navy-300">
              A partner that combines deep telecom expertise with a relentless focus on outcomes.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors group-hover:bg-brand-500/25">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow bg-brand-50 text-brand-700">Trusted by teams</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              What our clients say
            </h2>
            <p className="mt-4 text-lg text-navy-500">
              Organizations across property management, senior living, and hospitality rely on us.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map(({ quote, name, role }) => (
              <figure
                key={name}
                className="flex flex-col rounded-2xl bg-white p-7 border border-navy-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <blockquote className="flex-grow text-navy-700 leading-relaxed">“{quote}”</blockquote>
                <figcaption className="mt-6 border-t border-navy-100 pt-5">
                  <span className="block text-sm font-semibold text-navy-900">{name}</span>
                  <span className="block text-xs text-navy-500">{role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-white border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="eyebrow bg-brand-50 text-brand-700">Our network</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Our Trusted Partners
            </h2>
          </div>
          <div className="w-full">
            <picture>
              <source media="(min-width: 768px)" srcSet="/partners/Partners-Banner-Desktop.png" />
              <img src="/partners/Partners-Banner-Mobile.png" alt="Our Trusted Partners" className="w-full" loading="lazy" />
            </picture>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="relative bg-navy-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center max-w-5xl mx-auto">
            <div className="flex justify-center">
              <img
                src="/team/carter-dewey.jpg"
                alt="Carter Dewey, CEO and Founder of TrustedNetworx"
                className="w-48 h-48 rounded-full object-cover object-[65%_28%] border-4 border-brand-400/40"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                Who you'll work with
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Run by an operator, not a call center.
              </h2>
              <p className="mt-4 text-navy-200 leading-relaxed">
                TrustedNetworx is led by Carter Dewey — 12 years at AT&amp;T leading enterprise
                accounts, then SVP of Global Sales at DataRemote, the manufacturer of the POTS
                replacement hardware we deploy. When you call, you deal with the people who run
                the deployments, not a sales queue.
              </p>
              <Link
                to="/about/team"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
              >
                Meet the team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="quote" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="eyebrow bg-brand-50 text-brand-700">Get in touch</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-navy-500">
              Tell us about your needs and we'll get back to you within one business day.
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-navy-100 shadow-card overflow-hidden">
            <div className="p-8 sm:p-10">
              <MultiStepForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            <span className="block">Ready to get started?</span>
            <span className="block text-brand-100">Contact us today for a consultation.</span>
          </h2>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <Link to="/contact" className="btn-light">
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
