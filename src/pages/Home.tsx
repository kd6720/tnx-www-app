import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import NodeField from '../components/NodeField';
import MultiStepForm from '../components/MultiStepForm';
import StatValue from '../components/StatValue';

// Stats strip (inside the navy hero band). "[N] agents live" is a placeholder
// Carter will confirm; the other three are telecom facts already on the site.
const stats = [
  { value: '24/7', label: 'AI agents on duty' },
  { value: '40+', label: 'Agents live' },
  { value: '25+', label: 'Years in telecom' },
  { value: '50%', label: 'Typical line-cost cut' },
];

// 01 — AI Solutions. Three numbered items, 5/6 split.
const aiSolutions = [
  {
    n: '01',
    title: 'AI Workforce',
    to: '/ai-workforce',
    desc: 'AI agents that sell, support, and monitor — running 24/7 on your data, tenant-isolated.',
  },
  {
    n: '02',
    title: 'AI Consulting',
    to: '/ai-consulting',
    desc: 'Find the one workflow worth automating first, then deploy it end-to-end.',
  },
  {
    n: '03',
    title: 'AI Readiness',
    to: '/tools/ai-readiness',
    desc: 'Score your AI posture in 10 minutes and get a scoped, budgeted first build.',
  },
];

// Signature stack module — three rows.
const stackRows = [
  {
    label: 'AI agents',
    title: 'Sell, support, monitor',
    desc: 'Agents that quote, schedule, triage, and watch your lines — with a human approval boundary on anything consequential.',
  },
  {
    label: 'Platforms',
    title: 'Partner Hub · TNX CRM',
    desc: 'A control plane and a pipeline built for telecom. Run a fleet of agents with per-agent budgets, and close deals with sites, lines, and terms in the record.',
  },
  {
    label: 'Telecom foundation',
    title: 'Voice · Connectivity · POTS',
    desc: 'The infrastructure the agents run on top of — managed voice, connectivity, and copper replacement across every site.',
  },
];

// 03 — Telecom foundation: four links + compliance row.
const telecomLinks = [
  { label: 'POTS replacement', to: '/pots-replacement' },
  { label: 'Internet connectivity', to: '/internet-connectivity' },
  { label: 'Voice solutions', to: '/voice-solutions' },
  { label: 'Mobility', to: '/mobility-solutions' },
];

const compliance = ['NFPA 72', 'UL 864', "E911 & Kari's Law", '24/7 monitoring'];

const Home = () => {
  return (
    <div className="bg-canvas text-body antialiased">
      <Seo
        title="TrustedNetworx — AI Agents & Managed Telecom for Multi-Site Operators"
        description="AI agents and managed telecom for multi-site operators: POTS replacement, voice, connectivity, and mobility — with the AI workforce to sell, support, and monitor 24/7."
      />

      {/* ── Navy band: hero + stats strip ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950">
        {/* Hero */}
        <div className="relative flex min-h-[78vh] items-center">
          <HeroVideo
            name="hero-home"
            videoClassName="opacity-[0.28]"
            overlayClassName="absolute inset-0 bg-[linear-gradient(90deg,#0a1428_30%,rgba(10,20,40,0.55)_70%,rgba(10,20,40,0.35)_100%)]"
          />
          <div className="absolute inset-y-0 right-0 z-10 hidden w-2/3 lg:block">
            <NodeField className="h-full w-full" />
          </div>

          <div className="relative z-20 w-full pt-24 pb-20">
            <div className="mx-auto w-full max-w-site px-6 md:px-gutter">
              <div className="max-w-3xl">
                <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
                  Managed telecom &amp; AI
                </span>
                <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
                  AI agents and modern telecom for multi-site operators.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-navy-200">
                  TrustedNetworx builds and runs AI agents that sell, support, and monitor — on top
                  of the voice, connectivity, and POTS replacement infrastructure we already manage
                  for senior living, hospitality, healthcare, and property management.
                </p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link to="/tools/ai-readiness" className="btn-primary">
                    Book an AI Readiness Review
                    <ArrowRight size={18} />
                  </Link>
                  <a href="#platforms" className="btn-outline">
                    See the platforms
                  </a>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-mono-label text-navy-300">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-500" /> Human-in-the-loop
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-500" /> Tenant-isolated
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-500" /> Simple pricing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip — inside the navy band */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-site px-6 md:px-gutter">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`py-8 ${i > 0 ? 'border-l border-white/10 pl-8' : ''} ${i % 2 === 1 ? 'max-md:border-l max-md:border-white/10 max-md:pl-8' : ''}`}
                >
                  <p className="font-display text-stat font-semibold text-white">
                    <StatValue value={value} />
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-mono-label text-navy-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 AI Solutions ───────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
                01 — AI Solutions
              </span>
              <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
                AI that runs on infrastructure we already manage.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
                From agents that sell and support around the clock to a readiness review that scopes
                the first build.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <ul className="divide-y divide-hairline border-t border-hairline">
                {aiSolutions.map(({ n, title, to, desc }) => (
                  <li key={n}>
                    <Link
                      to={to}
                      className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5"
                    >
                      <span className="font-mono text-sm text-accent-500">{n}</span>
                      <span>
                        <span className="block font-display text-display-h3 font-semibold text-ink group-hover:text-brand-600">
                          {title}
                        </span>
                        <span className="mt-1 block text-base leading-relaxed text-body">{desc}</span>
                      </span>
                      <ArrowRight
                        size={18}
                        className="translate-y-1 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-600"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Platforms ──────────────────────────────────────────────── */}
      <section id="platforms" className="border-b border-hairline">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
                02 — Platforms
              </span>
              <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
                Two platforms. One operator behind them.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
                We don't just consult on AI and telecom — we run our own business on these tools and
                license them to partners who want the same leverage.
              </p>
              <div className="mt-8">
                <Link to="/platforms/partner-hub" className="btn-ghost">
                  Explore Partner Hub
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              {/* Partner Hub product frame */}
              <div className="rounded-lg border border-hairline bg-white p-4">
                <div className="flex items-center justify-between border-b border-hairline pb-3">
                  <span className="font-mono text-xs uppercase tracking-mono-label text-ink">
                    TNX Partner Hub
                  </span>
                  <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
                    AI agent management
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <figure>
                    <img
                      src="/product/partner-hub-dashboard.webp"
                      alt="Partner Hub dashboard — stats and recent agents"
                      width="1600"
                      height="1000"
                      className="w-full rounded border border-hairline"
                      loading="lazy"
                    />
                    <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-mono-label text-muted">
                      01 Dashboard
                    </figcaption>
                  </figure>
                  <figure>
                    <img
                      src="/product/partner-hub-agent-controls.webp"
                      alt="Partner Hub agent controls — per-agent budgets and kill switch"
                      width="1600"
                      height="1000"
                      className="w-full rounded border border-hairline"
                      loading="lazy"
                    />
                    <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-mono-label text-muted">
                      02 Controls
                    </figcaption>
                  </figure>
                  <figure>
                    <img
                      src="/product/partner-hub-activity.webp"
                      alt="Partner Hub agent activity stream"
                      width="1600"
                      height="1000"
                      className="w-full rounded border border-hairline"
                      loading="lazy"
                    />
                    <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-mono-label text-muted">
                      03 Activity
                    </figcaption>
                  </figure>
                </div>
                <p className="mt-4 border-t border-hairline pt-4 text-sm leading-relaxed text-body">
                  Spin up agents from proven blueprints, give each one a budget and an approval
                  boundary, and shut one down in a click — with a kill switch and per-agent caps.
                </p>
              </div>

              {/* TNX CRM product frame — [ASSET] placeholder, same size */}
              <div className="mt-6 rounded-lg border border-hairline bg-white p-4">
                <div className="flex items-center justify-between border-b border-hairline pb-3">
                  <span className="font-mono text-xs uppercase tracking-mono-label text-ink">
                    TNX CRM
                  </span>
                  <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
                    Opportunity management
                  </span>
                </div>
                <div className="mt-4 flex aspect-[8/5] items-center justify-center rounded border border-dashed border-hairline bg-canvas">
                  <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
                    [ASSET] — product screenshot
                  </span>
                </div>
                <p className="mt-4 border-t border-hairline pt-4 text-sm leading-relaxed text-body">
                  A pipeline built for how telecom deals close — direct, agent, and reseller
                  channels with sites, lines, term, and MRC/NRC in the record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack module ──────────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
            The stack
          </span>
          <div className="mt-6 rounded-lg border border-hairline">
            {stackRows.map(({ label, title, desc }, i) => (
              <div
                key={label}
                className={`grid grid-cols-12 gap-6 px-6 py-8 ${i > 0 ? 'border-t border-hairline' : ''}`}
              >
                <div className="col-span-12 md:col-span-3">
                  <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
                    {label}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-display-h3 font-semibold text-ink">{title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Telecom foundation ─────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
                03 — Telecom foundation
              </span>
              <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
                The infrastructure the agents run on.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
                Before any AI agent does useful work, the network under it has to be right. We've
                managed that layer for decades.
              </p>
              <ul className="mt-8 space-y-1">
                {telecomLinks.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group flex items-center justify-between border-b border-hairline py-3 font-display text-display-h3 font-semibold text-ink"
                    >
                      {label}
                      <ArrowRight size={18} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-7">
              {/* [ASSET] photo frame */}
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-hairline bg-white">
                <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
                  [ASSET] — install photo
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {compliance.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-mono-label text-muted">
                    <span className="h-1 w-1 rounded-full bg-accent-500" /> {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof band (navy) ──────────────────────────────────────────── */}
      <section className="bg-navy-950">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <img
                src="/team/carter-dewey-3x4.webp"
                alt="Carter Dewey, CEO and Founder of TrustedNetworx"
                width="900"
                height="1200"
                className="aspect-[3/4] w-full rounded-lg object-cover object-[65%_28%]"
                loading="lazy"
              />
            </div>
            <div className="col-span-12 flex flex-col justify-center md:col-span-8 lg:col-span-7 lg:col-start-6">
              <blockquote className="font-display text-display-h2-sm font-semibold leading-tight text-white">
                “TrustedNetworx moved our entire portfolio off legacy copper without a single day of
                downtime. The savings hit our bottom line immediately.”
              </blockquote>
              <div className="mt-4 font-mono text-xs uppercase tracking-mono-label text-navy-300">
                Operations Director · Multi-Site Property Group
              </div>
              <div className="mt-10 border-t border-divider pt-8">
                <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
                  The operator
                </span>
                <p className="mt-4 max-w-xl leading-relaxed text-navy-200">
                  TrustedNetworx is led by Carter Dewey — 12 years at AT&amp;T leading enterprise
                  accounts, then SVP of Global Sales at DataRemote, the manufacturer of the POTS
                  replacement hardware we deploy. When you call, you deal with the people who run the
                  deployments, not a sales queue.
                </p>
                <div className="mt-6">
                  <Link to="/about/team" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200">
                    Meet the team
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo row ──────────────────────────────────────────────────── */}
      <section className="border-b border-hairline bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-16 md:px-gutter">
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
            <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
              Network partners
            </span>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 grayscale">
              <span className="font-mono text-[13px] text-muted">AT&amp;T</span>
              <img src="/partners/mettel-logo.png" alt="MetTel" className="h-[18px] w-auto" loading="lazy" />
              <span className="font-mono text-[13px] text-muted">Verizon</span>
              <span className="font-mono text-[13px] text-muted">T-Mobile</span>
              <img src="/partners/velocity-logo.png" alt="Velocity" className="h-[18px] w-auto" loading="lazy" />
              <img src="/partners/dataremote-logo.png" alt="DataRemote" className="h-[18px] w-auto" loading="lazy" />
              <img src="/partners/mix-networks-logo.png" alt="MIX Networks" className="h-[18px] w-auto" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Start (intake) ──────────────────────────────────────────── */}
      <section id="quote">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
                04 — Start
              </span>
              <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
                Tell us what you run today.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
                We'll map your current telecom and AI posture and come back with a scoped,
                budgeted next step — within one business day.
              </p>
              {/* thin progress line + numbered chips */}
              <ol className="mt-10 space-y-0">
                {['Scope', 'Deploy', 'Optimize'].map((step, i) => (
                  <li key={step} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline font-mono text-xs text-accent-500">
                      {i + 1}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-mono-label text-muted">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="rounded-lg border border-hairline bg-white p-8">
                <MultiStepForm preset="home" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
