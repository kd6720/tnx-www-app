import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Calculator, Brain, Layers } from 'lucide-react';
import Seo from '../components/Seo';

const tools = [
  { to: '/tools/ai-readiness', title: 'AI Readiness Assessment', desc: 'Score your organization against the signals that predict a successful AI rollout.', icon: Brain },
  { to: '/tools/ai-roi-calculator', title: 'AI ROI Calculator', desc: 'Estimate the payback of putting AI agents on your quoting, support, and scheduling.', icon: Calculator },
];

const sections = [
  { to: '/ai-workforce', title: 'AI Workforce', desc: 'AI agents that sell, support, and monitor — 24/7, telecom-native.', icon: Bot },
  { to: '/ai-consulting', title: 'AI Consulting', desc: 'Practical AI automation, strategy, and implementation.', icon: Brain },
  { to: '/platforms/partner-hub', title: 'TNX Partner Hub', desc: 'The command center for running a fleet of AI agents.', icon: Layers },
];

const posts = [
  { slug: 'when-ai-sales-agents-outperform-humans', title: 'When AI Sales Agents Outperform Humans (And When They Don\u2019t)' },
  { slug: 'ai-email-triage-2026', title: 'AI Email Triage: How to Stop Drowning in Your Inbox' },
  { slug: 'real-roi-of-ai-in-telecom', title: 'The Real ROI of AI in Telecom: Beyond the Hype' },
  { slug: 'ai-readiness-checklist-for-midsize-organizations', title: 'AI Readiness Checklist: Is Your Organization Ready for AI Agents?' },
  { slug: 'lead-qualification-ai-scoring-signals-2026', title: 'Lead Qualification at Scale: The Signals AI Actually Trusts' },
  { slug: 'why-most-ai-projects-fail-and-how-to-succeed', title: 'Why Most AI Projects Fail (And How to Make Yours Succeed)' },
];

const Ai = () => (
  <div className="bg-navy-50">
    <Seo
      title="AI for Telecom & Multi-Site Operators | TrustedNetworx"
      description="AI agents and consulting for telecom and multi-site operators. Explore the AI workforce, run a readiness assessment, and read the latest on AI in telecom."
    />

    <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20">
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">AI Solutions</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI agents and modern telecom, working together.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            Every AI resource TrustedNetworx publishes — the workforce, the tools, and the playbooks —
            in one place.
          </p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sections.map(({ to, title, desc, icon: Icon }) => (
            <Link key={to} to={to} className="group rounded-2xl bg-white p-7 border border-navy-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon size={24} />
              </span>
              <h2 className="mt-5 text-lg font-bold text-navy-900">{title}</h2>
              <p className="mt-2 text-sm text-navy-500">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                Explore <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-white border-y border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900">Free AI tools</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {tools.map(({ to, title, desc, icon: Icon }) => (
            <Link key={to} to={to} className="group flex items-start gap-4 rounded-2xl bg-navy-50 p-6 border border-navy-100 hover:border-brand-200 transition-colors">
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon size={22} />
              </span>
              <span>
                <span className="block font-semibold text-navy-900">{title}</span>
                <span className="block mt-1 text-sm text-navy-500">{desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900">Latest AI thinking</h2>
        <div className="mt-8 space-y-3">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="block rounded-xl bg-white p-5 border border-navy-100 shadow-card hover:border-brand-200 transition-colors">
              <span className="font-semibold text-navy-900 hover:text-brand-700">{p.title}</span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            All posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Ai;
