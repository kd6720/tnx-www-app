import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';

const members = [
  {
    name: 'Carter Dewey',
    role: 'CEO & Founder',
    image: '/team/carter-dewey.webp',
    objectPosition: 'object-[65%_28%]',
    bio: [
      'Carter Dewey is the CEO and Founder of TrustedNetworx, a leading solution provider of IoT, AI-driven, and managed telecommunications technology. He is responsible for overall company leadership, business development, sales strategy and forecasting, and coordination with key stakeholders and partners.',
      'A seasoned sales executive, Carter previously served as Senior Vice President of Global Sales for DataRemote, Inc., where he led business development and global sales operations beginning in April 2016. His earlier experience includes 12 years with AT&T, where he advanced to Signature Client Director, leading a team responsible for AT&T\u2019s entire portfolio across enterprise accounts.',
    ],
    skills: ['Business development', 'Strategic partnerships', 'AI & IoT solutions'],
  },
  {
    name: 'Angel Castro',
    role: 'AI Developer & Automation Engineer',
    image: '/team/angele-castro.jpg',
    objectPosition: 'object-center',
    bio: [
      'Angel is a San Francisco-based AI developer who builds Claude-powered agents, automation pipelines, and full-stack systems for B2B teams across EMEA and LatAm. His work spans agent orchestration, RAG and embedding pipelines, and internal tooling built with TypeScript, Next.js, Python, and Supabase.',
      'He built Kyra, a white-label AI workforce platform, from scratch — 70+ AI worker roles, a 21-template library, and a working partner integration layer. He brings engineering precision to every build: clean architecture, real infrastructure, and systems that run in production.',
    ],
    skills: ['Agent orchestration', 'Full-stack development', 'RAG & embeddings', 'AI infrastructure'],
    linkedin: 'https://www.linkedin.com/in/angelecastro/',
  },
  {
    name: 'Deeno Perez',
    role: 'Multimedia Specialist & Business Content Creator',
    image: '/team/deeno-perez.jpg',
    objectPosition: 'object-center',
    bio: [
      'Deeno is a Miami-based multimedia specialist and business content creator who helps brands bring their stories to life through polished visual content. His work spans promotional videos, interview-style content, brand storytelling, social media visuals, and project showcases.',
      'With a strong background in technology, operations, logistics, and visual production, Deeno brings both creative direction and business-minded precision to every project.',
    ],
    skills: ['Video production', 'Brand storytelling', 'Visual content'],
  },
];

const Team = () => (
  <div className="bg-canvas text-body antialiased">
    <Seo
      title="Our Team | TrustedNetworx"
      description="Meet the leadership and partners behind TrustedNetworx — telecom experts, enterprise architects, and creative professionals driving connectivity forward."
    />

    {/* Hero */}
    <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-navy-950">
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
            Our people
          </span>
          <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
            Meet the team.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-200">
            The people behind TrustedNetworx bring together deep telecom expertise and creative
            vision to help our clients succeed.
          </p>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="border-b border-hairline">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <ul className="divide-y divide-hairline border-t border-hairline">
          {members.map(({ name, role, image, objectPosition, bio, skills, linkedin }) => (
            <li key={name} className="grid grid-cols-12 gap-8 py-10">
              <div className="col-span-12 md:col-span-3">
                <img
                  src={image}
                  alt={name}
                  width="192"
                  height="192"
                  className={`h-40 w-40 rounded-full object-cover ${objectPosition} border border-hairline`}
                />
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display text-display-h2 font-semibold text-ink">{name}</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-mono-label text-accent-text">{role}</p>
                {bio.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-4 max-w-[68ch] leading-relaxed text-body">{p}</p>
                ))}
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {skills.map((s) => (
                    <li key={s} className="font-mono text-xs uppercase tracking-mono-label text-muted-text">{s}</li>
                  ))}
                  {linkedin && (
                    <li>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-mono-label text-brand-600 hover:text-brand-700"
                      >
                        LinkedIn
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-navy-950">
      <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
        <h2 className="font-display text-display-h2 font-semibold text-white">
          Work with our team.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-navy-200">
          Ready to put our expertise to work for your business? Let&apos;s start the conversation.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
        >
          Contact us
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </div>
);

export default Team;
