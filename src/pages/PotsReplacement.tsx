import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import MultiStepForm from '../components/MultiStepForm';

const compliance = [
  { n: '01', title: 'NFPA 72', desc: 'Supervised alarm transmission, code-compliant backup power runtimes.' },
  { n: '02', title: 'UL 864', desc: 'Listed communicator hardware for fire alarm signaling paths.' },
  { n: '03', title: "Kari's Law / E911", desc: 'Direct 911 dialing with on-site notification, no prefix required.' },
  { n: '04', title: "RAY BAUM'S Act", desc: 'Dispatchable location — building, floor, room — delivered to the PSAP.' },
];

const useCases = [
  'FAX', 'Meter reading', 'Burglar & fire alarm', 'Point of sale terminals',
  'Ring-down (audiodial)', 'Vending machines', 'Elevator, paging, taxi', 'ATM machines',
  'Apartment call box', 'Telemetry', 'Gate access', 'SMB router/gateway',
  'Analog M2M', '4G/5G internet access', 'Legacy modem support', 'Wireless Wi-Fi access',
];

const industries = [
  { n: '01', title: 'Retail', desc: 'Point of sale systems, fire alarm panels, security alarms.' },
  { n: '02', title: 'Healthcare', desc: 'Emergency phones, paging systems, fax machines.' },
  { n: '03', title: 'Education', desc: 'Campus security systems, elevator phones, safety phones.' },
  { n: '04', title: 'Manufacturing', desc: 'Gate entry systems, fire alarm panels, meter reading.' },
];

const models = [
  { model: '90X1', sku: 'CDS-9001', lines: '1 line', bestFor: 'Single-device sites, elevators, gate access' },
  { model: '90X2', sku: 'CDS-9010', lines: '2 lines', bestFor: 'Fire alarm + elevator, small offices' },
  { model: '90X5', sku: 'CDS-9005', lines: '5 lines', bestFor: 'Multi-line sites, campus deployments' },
];

const PotsReplacement = () => (
  <div className="bg-canvas text-body antialiased">
    <Seo
      title="POTS Replacement | TrustedNetworx"
      description="Modern, cost-saving alternatives to legacy POTS lines. Migrate analog systems to reliable IP and cellular networks with TrustedNetworx."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'POTS Replacement',
        provider: { '@type': 'Organization', name: 'TrustedNetworx' },
        areaServed: { '@type': 'Country', name: 'US' },
        serviceType: 'Telecom Line Replacement',
        description: 'Modern, cost-saving alternatives to legacy POTS lines.',
        url: 'https://trustednetworx.com/pots-replacement',
      }}
    />

    {/* Hero */}
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950">
      <HeroVideo
        name="hero-pots"
        mediaClassName="opacity-[0.34]"
        overlayClassName="absolute inset-0 bg-[linear-gradient(90deg,#0a1428_30%,rgba(10,20,40,0.55)_70%,rgba(10,20,40,0.35)_100%)]"
      />
      <div className="relative z-10 mx-auto w-full max-w-site px-6 py-24 md:px-gutter">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
            POTS Replacement
          </span>
          <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
            The copper shutdown isn&apos;t coming. It&apos;s here.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            Carriers are retiring analog lines and raising rates on what&apos;s left. We migrate
            fire alarms, elevators, emergency phones, and fax lines to managed wireless and SIP
            solutions — code-compliant, monitored 24/7, typically at half the cost.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#quote" className="btn-primary">
              Get a free line audit
              <ArrowRight size={18} />
            </a>
            <Link to="/tools/pots-roi-calculator" className="btn-outline">
              Calculate your savings
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* 01 — Compliance */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              01 — Compliance
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Compliance isn&apos;t a feature. It&apos;s the whole point.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              Fire alarm panels, elevator phones, and emergency call boxes can&apos;t ride on a
              consumer-grade cellular adapter and pass inspection. We coordinate with your fire
              alarm vendor, elevator contractor, and local AHJ before cutover.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {compliance.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-500">{n}</span>
                  <div>
                    <h3 className="font-display text-display-h3 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-body">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* 02 — The hardware we deploy (certification table) */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              02 — Hardware
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              The hardware we actually deploy.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              The DataRemote POTS IN A BOX® family is the industry&apos;s first multi-carrier,
              multi-path POTS replacement platform — connecting analog lines over LTE, Wi-Fi, and
              Ethernet with code-compliant battery backup. Not a consumer cellular adapter.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted">Model</th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted">POTS lines</th>
                    <th className="py-3 pr-4 font-mono text-xs uppercase tracking-mono-label text-muted">Connectivity</th>
                    <th className="py-3 font-mono text-xs uppercase tracking-mono-label text-muted">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {models.map(({ model, sku, lines, bestFor }) => (
                    <tr key={model}>
                      <td className="py-4 pr-4">
                        <span className="font-display text-display-h3 font-semibold text-ink">{model}</span>
                        <span className="ml-2 font-mono text-xs text-muted">{sku}</span>
                      </td>
                      <td className="py-4 pr-4 text-base text-body">{lines}</td>
                      <td className="py-4 pr-4 text-base text-body">LTE + Wi-Fi + Ethernet</td>
                      <td className="py-4 text-base text-body">{bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-mono-label text-muted">
                Certifications &amp; compliance
              </p>
              <ul className="mt-3 space-y-1 text-sm text-body">
                <li>UL 62368-1 — Audio/Video &amp; IT Equipment Safety</li>
                <li>UL 864 — Control Units for Fire Alarm Systems (NFPA 72 compliant)</li>
                <li>Listed by the California Department of Forestry and Fire Protection</li>
                <li>Accepted by the New York City Fire Department (FDNY)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 03 — Use cases */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              03 — Use cases
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Everything still hanging on copper.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
              Sixteen device types that still depend on a dial tone — every one we migrate.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-8 border-t border-hairline sm:grid-cols-2">
              {useCases.map((uc) => (
                <li key={uc} className="border-b border-hairline py-3 text-base leading-relaxed text-body">
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* 04 — Industries */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              04 — Industries
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Where we do this work.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {industries.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-500">{n}</span>
                  <div>
                    <h3 className="font-display text-display-h3 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-body">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* CTA / form */}
    <section id="quote" className="bg-navy-950">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">Line audit</span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-white">
              Get your free line audit.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-200">
              Tell us about your sites and we&apos;ll come back with a plan and pricing within one
              business day.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-lg border border-divider bg-navy-900 p-8">
              <MultiStepForm preset="pots" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PotsReplacement;
