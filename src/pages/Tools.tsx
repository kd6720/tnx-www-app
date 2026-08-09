import { Link } from 'react-router-dom';
import { Calculator, AlertTriangle, Shield, ArrowRight, TrendingUp, Brain } from 'lucide-react';
import Seo from '../components/Seo';

const tools = [
  {
    to: '/tools/pots-roi-calculator',
    title: 'POTS Replacement ROI Calculator',
    description: 'See how much your organization can save by modernizing legacy copper lines.',
    icon: Calculator,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    to: '/tools/copper-sunset-risk',
    title: 'Copper Sunset Risk Assessment',
    description: 'Evaluate your exposure to the copper network decommissioning.',
    icon: AlertTriangle,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    to: '/tools/failover-readiness',
    title: 'Business Continuity Readiness Check',
    description: 'How prepared is your organization for a connectivity outage?',
    icon: Shield,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    to: '/tools/ai-roi-calculator',
    title: 'AI Solutions ROI Calculator',
    description: 'Estimate the return on investment from deploying AI agents across your organization.',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    to: '/tools/ai-readiness',
    title: 'AI Readiness Assessment',
    description: 'Evaluate how prepared your organization is for AI adoption.',
    icon: Brain,
    gradient: 'from-brand-500 to-accent-600',
  },
];

const Tools = () => {
  return (
    <div className="bg-navy-50">
      <Seo
        title="Free Telecom Assessment Tools | TrustedNetworx"
        description="Interactive tools to evaluate your telecom infrastructure: POTS replacement ROI, copper sunset risk, and business continuity readiness."
      />

      {/* Hero */}
      <section className="relative flex min-h-[400px] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900" />
        <div className="absolute inset-0 z-0 bg-grid-dark bg-grid opacity-40" />
        <div className="absolute inset-0 z-0 bg-hero-glow" />
        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Free Assessment Tools
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Evaluate Your Telecom Infrastructure
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-navy-200">
              Interactive tools to help you understand costs, risks, and readiness — no signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tools.map(({ to, title, description, icon: Icon, gradient }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col rounded-2xl bg-white p-8 border border-navy-100 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:border-brand-200"
              >
                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-8 w-8" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-navy-900">{title}</h2>
                <p className="mt-3 flex-grow text-navy-500 leading-relaxed">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Launch tool
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-navy-500 mb-6">Want a personalized assessment instead?</p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:bg-brand-500 hover:-translate-y-0.5"
            >
              Get a Quote
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
