import React from 'react';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  Cable,
  Check,
  Handshake,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  MessageSquareText,
  Network,
  ShieldCheck,
  TrendingUp,
  Truck,
  UsersRound,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import MultiStepForm from '../components/MultiStepForm';

const serviceCards = [
  {
    title: 'AI Workflow Automation',
    description:
      'Eliminate repetitive manual processes - from order entry and provisioning coordination to billing reconciliation and ticket routing. We map your workflows, identify automation targets, and deploy AI agents that run continuously without human handholding.',
    icon: Bot,
    iconClassName: 'bg-brand-50 text-brand-700',
    checkClassName: 'text-brand-500',
    items: ['CRM data entry & enrichment', 'Provisioning & order workflows', 'Invoice processing & reconciliation'],
  },
  {
    title: 'AI-Powered Customer Engagement',
    description:
      'Deploy intelligent chat, voice, and messaging agents that handle inbound inquiries, qualify leads, schedule appointments, and answer product questions - 24/7, across your customer-facing channels.',
    icon: MessageSquareText,
    iconClassName: 'bg-brand-50 text-brand-700',
    checkClassName: 'text-brand-500',
    items: ['Inbound lead qualification bots', 'Appointment & callback scheduling', 'SMS & web chat automation'],
  },
  {
    title: 'AI Strategy & Roadmapping',
    description:
      'Not sure where to start? We assess your current tools, data, and workflows, then deliver a prioritized AI roadmap with clear ROI projections - no vendor bias, no bloated consulting engagements. Just a practical plan you can act on.',
    icon: BrainCircuit,
    iconClassName: 'bg-brand-50 text-brand-700',
    checkClassName: 'text-brand-500',
    items: ['Operations & workflow audit', 'Tool & vendor evaluation', 'Prioritized implementation plan'],
  },
  {
    title: 'Sales & CRM AI Enablement',
    description:
      'Equip your sales team and channel partners with AI tools that surface the right opportunities, automate follow-up sequences, generate proposals faster, and keep your pipeline clean - without adding headcount.',
    icon: TrendingUp,
    iconClassName: 'bg-brand-50 text-brand-700',
    checkClassName: 'text-brand-500',
    items: ['Automated outreach & follow-up', 'AI-assisted proposal generation', 'Pipeline hygiene & deal scoring'],
  },
  {
    title: 'Telecom + AI Integration',
    description:
      'Bridge your telecom infrastructure with AI-driven operations. We integrate AI capabilities into hosted voice, POTS replacement deployments, and multi-site communication stacks - enabling smarter call routing, anomaly detection, and usage analytics.',
    icon: Network,
    iconClassName: 'bg-brand-50 text-brand-700',
    checkClassName: 'text-brand-500',
    items: ['AI-enhanced call routing', 'Usage anomaly detection', 'Multi-site operations dashboards'],
  },
  {
    title: 'Channel Partner AI Enablement',
    description:
      'Help your MSP, VAR, and agent partners adopt AI tools that accelerate their sales motion and improve customer retention. We build white-label-ready AI programs that strengthen your channel without creating support overhead.',
    icon: UsersRound,
    iconClassName: 'bg-brand-50 text-brand-700',
    checkClassName: 'text-brand-500',
    items: ['Partner AI onboarding programs', 'White-label AI tool stack', 'Agent productivity playbooks'],
  },
];

const industryCards = [
  {
    title: 'MSPs & Telecom Agents',
    description:
      'Automate quote generation, contract renewals, and customer onboarding. Use AI to identify at-risk accounts before churn happens and surface upsell opportunities across your book of business.',
    icon: Building2,
    iconClassName: 'bg-brand-50 text-brand-700',
  },
  {
    title: 'Healthcare & Senior Living',
    description:
      'Streamline resident communications, automate compliance documentation, and integrate AI-assisted call handling for facilities where response time and accuracy matter. Designed for HIPAA-aware environments.',
    icon: HeartPulse,
    iconClassName: 'bg-brand-50 text-brand-700',
  },
  {
    title: 'Hospitality',
    description:
      'Deploy guest-facing AI communication tools, automate maintenance and service request workflows, and reduce front desk call volume with intelligent self-service options across properties.',
    icon: Hotel,
    iconClassName: 'bg-brand-50 text-brand-700',
  },
  {
    title: 'Property Management',
    description:
      'Automate tenant communication, lease renewal outreach, maintenance dispatch, and vendor coordination across multi-site portfolios. Reduce property manager workload without sacrificing tenant experience.',
    icon: Home,
    iconClassName: 'bg-brand-50 text-brand-700',
  },
  {
    title: 'Multi-Site Enterprises',
    description:
      'Centralize operations intelligence across locations with AI-powered reporting, anomaly alerts, and workflow automation that keeps distributed teams aligned without requiring constant management overhead.',
    icon: Landmark,
    iconClassName: 'bg-brand-50 text-brand-700',
  },
  {
    title: 'Field Services & Logistics',
    description:
      'Intelligent dispatch, route optimization recommendations, automated job documentation, and AI-assisted technician scheduling - reducing downtime and improving first-call resolution rates.',
    icon: Truck,
    iconClassName: 'bg-brand-50 text-brand-700',
  },
];

const processSteps = [
  {
    title: 'Discovery',
    description: 'We audit your current workflows, tools, and data - and identify where AI creates the most immediate leverage.',
  },
  {
    title: 'Roadmap',
    description:
      'You receive a prioritized implementation plan with clear timelines, ROI estimates, and tool recommendations - no bloated deliverables.',
  },
  {
    title: 'Deploy',
    description:
      'We configure, integrate, and launch your AI systems - working alongside your team to ensure adoption and operational fit.',
  },
  {
    title: 'Optimize',
    description:
      'Ongoing support and performance reviews ensure your AI investment continues to deliver as your business scales.',
  },
];

const differentiators = [
  {
    title: 'Telecom-Native Context',
    description:
      "We don't just know AI - we know telecom. That means AI implementations that account for how your actual billing, provisioning, and channel operations work.",
    icon: Cable,
  },
  {
    title: 'Execution Over Theory',
    description:
      'We skip the strategy decks that sit in a drawer. Every engagement ends with something running - not a recommendation report.',
    icon: Zap,
  },
  {
    title: 'No-Bloat Engagements',
    description:
      "Scoped to your actual needs. No retainers for work you don't need. Transparent pricing, fast timelines, and measurable outcomes.",
    icon: ShieldCheck,
  },
  {
    title: 'Operator-to-Operator',
    description:
      'Our team has managed telecom operations, channel programs, and enterprise deployments from the inside. We advise from experience - not from textbooks.',
    icon: Handshake,
  },
];

const AiConsulting = () => {
  return (
    <div className="bg-navy-50">
      <Seo
        title="AI Consulting & Solutions | TrustedNetworx"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI Consulting',
          provider: { '@type': 'Organization', name: 'TrustedNetworx' },
          areaServed: { '@type': 'Country', name: 'US' },
          serviceType: 'AI Consulting',
          description: 'Practical AI consulting and implementation for telecom and multi-site businesses.',
          url: 'https://trustednetworx.com/ai-consulting',
        }}
        description="Practical AI consulting and implementation for telecom operators, channel partners, and multi-site businesses — automation, customer engagement, and strategy with measurable ROI."
      />
      {/* Hero Section */}
      <div className="relative min-h-[560px] flex items-center overflow-hidden">
        <HeroVideo
          name="hero-ai-consulting"
          overlayClassName="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"
        />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                AI Consulting & Solutions
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
                Practical AI.{' '}
                <span className="text-brand-300">
                  Deployed, not decked.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-2xl">
                We map your operations, find the automation wins with real ROI, and build them into
                production — workflow automation, intelligent routing, and AI-assisted operations
                for telecom operators, channel partners, and multi-site businesses. No data science
                team required.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-light">
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>
                <a href="#services" className="btn-outline">
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <section className="relative z-20 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-morphism rounded-2xl bg-white/90 px-6 py-8 shadow-card-hover">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '40%+', label: 'Reduction in manual admin time' },
                { value: '3x', label: 'Faster lead follow-up with AI automation' },
                { value: '24/7', label: 'AI-assisted customer engagement' },
                { value: 'Weeks', label: 'Not months — to first deployment' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl md:text-4xl font-extrabold text-brand-700">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-navy-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <div id="services" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-morphism rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What We Deliver</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Focused AI engagements built around your operations - not generic software demos.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map(({ title, description, icon: Icon, iconClassName, checkClassName, items }) => (
                <div
                  key={title}
                  className="glass-morphism p-6 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-4 ${iconClassName}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-gray-600 flex-grow">{description}</p>
                  <ul className="mt-4 space-y-1 text-sm text-gray-500">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${checkClassName}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-morphism rounded-2xl p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Built for Your Industry</h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                  AI that understands how your business actually operates - not generic software that needs years to
                  configure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industryCards.map(({ title, description, icon: Icon, iconClassName }) => (
                  <div key={title} className="bg-white rounded-xl p-6 shadow border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${iconClassName}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="mt-1 text-gray-600 text-sm">{description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-morphism rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How We Work</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
                A focused engagement model built for speed - from discovery to live deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {processSteps.map(({ title, description }, index) => (
                <div key={title} className="text-center">
                  <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-extrabold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-morphism rounded-2xl p-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Why TrustedNetworx for AI?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {differentiators.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center">
                    <div className="flex justify-center mb-4 text-blue-600">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
          <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to put AI to work?</span>
                <span className="block text-brand-100 text-2xl font-semibold mt-2">
                  Start with a 30-minute strategy call — no commitment required.
                </span>
              </h2>
              <p className="mt-4 text-brand-100 max-w-xl">
                Tell us what's eating your team's time or costing you deals, and we'll tell you exactly where AI can
                help — and how fast.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0 lg:w-full lg:max-w-md">
              <MultiStepForm preset="ai" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiConsulting;
