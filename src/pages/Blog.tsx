import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getAllPosts, getCategories, BlogPost } from '../utils/blog';
import Seo from '../components/Seo';

const categoryColors: Record<string, string> = {
  'Telecom Modernization': 'bg-brand-50 text-brand-700',
  'AI for Business': 'bg-brand-50 text-brand-700',
  'Industry Spotlights': 'bg-brand-50 text-brand-700',
  'Compliance & Regulation': 'bg-brand-50 text-brand-700',
  'Channel Growth': 'bg-brand-50 text-brand-700',
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);

  const posts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getCategories(), []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featured = activeCategory === 'All' ? filteredPosts[0] : null;
  const gridPosts = featured ? filteredPosts.slice(1) : filteredPosts;
  const visiblePosts = gridPosts.slice(0, visibleCount);

  return (
    <div className="bg-navy-50">
      <Seo
        title="TrustedNetworx Blog — Insights on Telecom, AI & Connectivity"
        description="Practical insights on telecom modernization, AI for business, compliance, and connectivity from the TrustedNetworx team."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow border border-brand-400/30 bg-brand-500/10 text-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Resources
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
            TrustedNetworx{' '}
            <span className="text-brand-300">
              Blog
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-navy-200">
            Insights on telecom modernization, AI, and business connectivity
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-10 bg-white border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100 border border-navy-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-navy-500">No posts in this category yet.</p>
            </div>
          ) : (
            <>
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                className="group mb-10 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl bg-white border border-navy-100 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-brand-200"
              >
                {featured.image && (
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-col p-8 lg:p-10">
                  <span className="inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold bg-brand-50 text-brand-700">
                    Latest — {featured.category}
                  </span>
                  <h2 className="mt-4 text-2xl lg:text-3xl font-bold text-navy-900 leading-snug group-hover:text-brand-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 flex-grow text-navy-500 leading-relaxed">{featured.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    Read article
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visiblePosts.map((post: BlogPost) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group relative flex flex-col rounded-2xl bg-white p-7 border border-navy-100 shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-card-hover hover:border-brand-200"
                >
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative -mx-7 -mt-7 mb-5 h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent" />
                    </div>
                  )}

                  {/* Category Badge */}
                  <span
                    className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryColors[post.category] || 'bg-navy-100 text-navy-600'
                    }`}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="mt-4 text-xl font-bold text-navy-900 leading-snug group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 flex-grow text-navy-500 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-5 flex items-center gap-4 text-sm text-navy-400 pt-4 border-t border-navy-100">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read More Arrow */}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    Read article
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            {visibleCount < gridPosts.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 12)}
                  className="inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-8 py-3 text-sm font-semibold text-navy-700 shadow-card transition-all hover:border-brand-300 hover:text-brand-700"
                >
                  Show more articles ({gridPosts.length - visibleCount} remaining)
                </button>
              </div>
            )}

            {/* Full article index — keeps every post crawlable regardless of pagination */}
            <nav aria-label="All articles" className="sr-only">
              <ul>
                {posts.map((post: BlogPost) => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            <span className="block">Ready to modernize your telecom?</span>
            <span className="block text-brand-100">Let's discuss what's possible.</span>
          </h2>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <Link to="/contact" className="btn-light">
              Get a Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
