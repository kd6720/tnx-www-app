import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAllPosts, getCategories, BlogPost } from '../utils/blog';
import Seo from '../components/Seo';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const posts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getCategories(), []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div className="bg-canvas text-body antialiased">
      <Seo
        title="TrustedNetworx Blog — Insights on Telecom, AI & Connectivity"
        description="Practical insights on telecom modernization, AI for business, compliance, and connectivity from the TrustedNetworx team."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <div className="mx-auto w-full max-w-site px-6 md:px-gutter">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-mono-label text-accent-500">
              Resources
            </span>
            <h1 className="mt-6 font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold text-white md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.0]">
              The TrustedNetworx blog.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-200">
              Insights on telecom modernization, AI, and business connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-hairline bg-white">
        <div className="mx-auto w-full max-w-site px-6 py-6 md:px-gutter">
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-mono-label transition-colors ${
                  activeCategory === cat
                    ? 'border-ink bg-ink text-white'
                    : 'border-hairline text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="border-b border-hairline">
        <div className="mx-auto w-full max-w-[68ch] px-6 py-section md:px-gutter">
          {filteredPosts.length === 0 ? (
            <p className="py-20 text-lg text-body">No posts in this category yet.</p>
          ) : (
            <ul className="divide-y divide-hairline border-t border-hairline">
              {filteredPosts.map((post: BlogPost) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="group block py-5">
                    <p className="font-mono text-xs uppercase tracking-mono-label text-muted">
                      {post.category}
                      <span className="mx-2 text-hairline">·</span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h2 className="mt-2 font-display text-display-h3 font-semibold text-ink group-hover:text-brand-600">
                      {post.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-body">{post.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Full article index — keeps every post crawlable regardless of filtering */}
          <nav aria-label="All articles" className="sr-only">
            <ul>
              {posts.map((post: BlogPost) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <h2 className="font-display text-display-h2 font-semibold text-white">
            Ready to modernize your telecom?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-navy-200">Let&apos;s discuss what&apos;s possible.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
          >
            Get a quote
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
