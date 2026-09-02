import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';

const whyChooseUs = [
  { n: '01', title: 'Proven telecom expertise', desc: 'Decades of industry experience tackling the complex challenges of connectivity and infrastructure modernization.' },
  { n: '02', title: 'Strategic global partnerships', desc: 'High-profile projects with global telecom leaders, government bodies, and Fortune 500 companies.' },
  { n: '03', title: 'Future-ready solutions', desc: 'Cellular data to cloud communication — customized to your evolving needs.' },
  { n: '04', title: 'Dependable & scalable', desc: 'Strategies that cut costs, lift operational efficiency, and grow with you.' },
];

const About = () => (
  <div className="bg-canvas text-body antialiased">
    <Seo
      title="About Us | TrustedNetworx"
      description="With 25+ years in telecom and IoT, TrustedNetworx delivers advanced connectivity, voice, and managed solutions for enterprise and multi-site organizations."
    />

    {/* Hero */}
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-navy-950">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/Handshake.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        suppressHydrationWarning
      >
        <div className="absolute inset-0 bg-navy-950/85" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-site px-6 py-24 md:px-gutter">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
            Who we are
          </span>
          <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
            About TrustedNetworx.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            Connecting businesses with cutting-edge telecommunication services.
          </p>
        </div>
      </div>
    </section>

    {/* 01 — Leading the future */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-6">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              01 — Who we are
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Leading the future of telecom.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-body">
              With over 25 years in telecom and IoT, TrustedNetworx specializes in advanced
              connectivity solutions that drive business success. Our expertise spans IoT, M2M,
              cloud computing, and enterprise communication — enabling organizations to modernize
              infrastructure, optimize operations, and stay ahead.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <img
              src="/Global-Connectivity.jpg"
              alt="About TrustedNetworx"
              className="aspect-[4/3] w-full rounded-lg border border-hairline object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* 02 — Your trusted partner */}
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              02 — Your trusted partner
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              A track record with the carriers.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-body">
              AT&amp;T, Verizon, T-Mobile, US Cellular, MetTel, Fusion Connect, Xirgo
              Technologies, DataRemote, and more — from POTS line replacement to enterprise
              mobility, we help businesses transition to next-generation networks with confidence.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <img
              src="/partners/Partners-Banner-Desktop.png"
              alt="Our trusted partners"
              className="hidden w-full md:block"
            />
            <img
              src="/partners/Partners-Banner-Mobile.png"
              alt="Our trusted partners"
              className="w-full md:hidden"
            />
          </div>
        </div>
      </div>
    </section>

    {/* 03 — Why choose us */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-text">
              03 — Why choose us
            </span>
            <h2 className="mt-4 font-display text-display-h2 font-semibold text-ink">
              Four reasons operators stay.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="divide-y divide-hairline border-t border-hairline">
              {whyChooseUs.map(({ n, title, desc }) => (
                <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-accent-text">{n}</span>
                  <div>
                    <h3 className="font-display text-display-h3 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-body">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/about/team"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Meet the team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
