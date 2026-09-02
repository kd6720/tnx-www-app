import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MessageSquareText,
  Network,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import MultiStepForm from '../components/MultiStepForm';

const agentCards = [
  {
    title: 'AI Sales Agents',
    description:
      'Intelligent agents that qualify inbound leads, nurture pipeline opportunities, draft proposals, and surface the highest-value accounts for your sales team — 24/7, no coffee breaks.',
    icon: TrendingUp,
    items: ['Lead qualification & scoring', 'Pipeline nurturing sequences', 'Proposal drafting assistance'],
  },
  {
    title: 'AI Customer Service Agents',
    description:
      'Resolve common support issues, triage tickets, and escalate complex cases to the right team member. Your customers get instant answers — your team focuses on what matters.',
    icon: Headphones,
    items: ['Ticket triage & routing', 'Knowledge base Q&A', '24/7 chat & voice support'],
  },
  {
    title: 'AI Lead Qualification Agents',
    description:
      'Stop wasting time on tire-kickers. AI agents score every inbound lead against your ideal customer profile, book meetings for hot leads, and nurture the rest automatically.',
    icon: UsersRound,
    items: ['Ideal customer scoring', 'Automated meeting booking', 'Lead enrichment & research'],
  },
  {
    title: 'AI Scheduling Agents',
    description:
      'Eliminate the back-and-forth. AI scheduling agents find mutual availability, send calendar invites, handle reschedules, and send reminders — across any calendar platform.',
    icon: Calendar,
    items: ['Multi-calendar coordination', 'Automated reminders', 'Reschedule & cancellation handling'],
  },
  {
    title: 'AI Follow-Up Agents',
    description:
      'Never lose a deal to a missed follow-up. AI agents track every conversation, trigger personalized follow-ups at the right moment, and keep your pipeline moving.',
    icon: Clock,
    items: ['Multi-channel sequences', 'Smart timing optimization', 'Personalized messaging'],
  },
  {
    title: 'AI Email Triage Agents',
    description:
      'Your inbox, managed. AI triages incoming email, flags priorities, drafts responses, and routes action items to the right person — so you focus on decisions, not digging.',
    icon: Mail,
    items: ['Priority inbox routing', 'Auto-draft responses', 'Action item extraction'],
  },
  {
    title: 'AI Support Agents',
    description:
      'First-line support that never sleeps. AI agents handle password resets, status checks, FAQ lookups, and common troubleshooting — freeing your NOC and help desk for complex issues.',
    icon: MessageSquareText,
    items: ['Self-service troubleshooting', 'Status & outage checks', 'Knowledge base integration'],
  },
  {
    title: 'AI Infrastructure Advisors',
    description:
      'AI-powered monitoring and advisory for your telecom infrastructure. Detect anomalies, predict capacity issues, and get proactive recommendations before problems impact customers.',
    icon: Network,
    items: ['Network health monitoring', 'Capacity forecasting', 'Proactive alerting'],
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Deploy in Days',
    description: 'Most AI agents go live within 2–5 business days. No 6-month consulting engagements. No RFP theater.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI',
    description: 'Every agent includes baseline metrics and monthly performance reporting. You see exactly what value they deliver.',
  },
  {
    icon: ShieldCheck,
    title: 'Telecom-Native',
    description: 'Purpose-built for telecom workflows — POTS migration tracking, compliance documentation, carrier coordination.',
  },
  {
    icon: Bot,
    title: 'Not a Black Box',
    description: 'You control the playbooks. Our AI agents follow your processes, your tone, your escalation rules. Full transparency.',
  },
];

const AiWorkforce = () => {
  return (
    <div className="bg-navy-50">
      <Seo
        title="AI Workforce — AI Agents for Telecom | TrustedNetworx"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'AI Workforce',
          provider: { '@type': 'Organization', name: 'TrustedNetworx' },
          areaServed: { '@type': 'Country', name: 'US' },
          serviceType: 'AI Agents',
          description: 'AI agents for sales, service, and operations, built for telecom.',
          url: 'https://trustednetworx.com/ai-workforce',
        }}
        description="Deploy AI sales, service, and operations agents built for telecom. Lead qualification, scheduling, email triage, infrastructure monitoring — 24/7, telecom-native."
      />

      {/* Hero */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden">
        <HeroVideo
          name="hero-ai-workforce"
          overlayClassName="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-brand-900/60"
        />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                AI + Telecom Infrastructure
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                AI agents that{' '}
                <span className="text-brand-300">
                  answer, sell, and support
                </span>{' '}
                — 24/7.
              </h1>
              <p className="mt-6 max-w-xl text-lg sm:text-xl text-navy-200">
                Telecom-native AI voice and chat agents that qualify leads, book appointments,
                handle tier-1 support, and monitor your services around the clock — built for
                telecom service providers, MSPs, and enterprise infrastructure teams.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-light">
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>
                <a href="#agents" className="btn-outline">
                  Explore AI Agents
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Cards */}
      <section id="agents" className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow bg-brand-50 text-brand-700">AI Workforce</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              Eight AI Agents, One Platform
            </h2>
            <p className="mt-4 text-lg text-navy-500">
              Each agent is purpose-built for a specific business function. Deploy one, or deploy them all.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agentCards.map(({ title, description, icon: Icon, items }) => (
              <div
                key={title}
                className="group relative flex flex-col rounded-2xl bg-white p-7 border border-navy-100 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-brand-200"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-100">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 flex-grow text-sm text-navy-500 leading-relaxed">{description}</p>
                <ul className="mt-4 space-y-1.5 border-t border-navy-100 pt-4">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-navy-600">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TrustedNetworx AI */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
              Why TrustedNetworx AI
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              AI That Understands Telecom
            </h2>
            <p className="mt-4 text-lg text-navy-300">
              Not generic chatbots. AI agents trained on telecom workflows, compliance requirements, and
              infrastructure operations.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
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

      {/* Use Cases */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow bg-brand-50 text-brand-700">Use cases</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
              How Telecom Teams Use AI
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: PhoneCall,
                title: 'Inbound Sales Qualification',
                body: 'AI agent answers web inquiries, qualifies against ICP criteria, books meetings for hot leads, and routes others to nurture sequences.',
              },
              {
                icon: BrainCircuit,
                title: 'POTS Migration Tracking',
                body: 'AI monitors migration progress across hundreds of sites, flags stuck orders, drafts status updates, and alerts account managers to at-risk timelines.',
              },
              {
                icon: Network,
                title: 'Network Operations Alerting',
                body: 'AI watches network health metrics, correlates alarms, drafts incident summaries, and escalates critical issues to on-call engineers with full context.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-navy-100 p-7 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm text-navy-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-cyan-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            <span className="block">Ready to deploy your AI workforce?</span>
            <span className="block text-brand-100">Let's build the agents your business needs.</span>
          </h2>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0 lg:w-full lg:max-w-md">
            <MultiStepForm preset="ai" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiWorkforce;
