import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { getPostBySlug } from '../utils/blog';
import Seo, { SITE_URL } from '../components/Seo';

const categoryColors: Record<string, string> = {
  'Telecom Modernization': 'bg-blue-100 text-blue-700',
  'AI for Business': 'bg-emerald-100 text-emerald-700',
  'Industry Spotlights': 'bg-violet-100 text-violet-700',
  'Compliance & Regulation': 'bg-amber-100 text-amber-700',
  'Channel Growth': 'bg-rose-100 text-rose-700',
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : null), [slug]);

  if (!post) {
    return (
      <div className="bg-navy-50 min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-extrabold text-navy-900">Post not found</h1>
          <p className="mt-4 text-navy-500">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const canonicalPath = `/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'TrustedNetworx',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${canonicalPath}` },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${canonicalPath}` },
    ],
  };

  return (
    <div className="bg-navy-50">
      <Seo
        title={`${post.title} | TrustedNetworx Blog`}
        description={post.description}
        type="article"
        image={post.image}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />

      {/* Back Link */}
      <div className="bg-white border-b border-navy-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                categoryColors[post.category] || 'bg-navy-100 text-navy-600'
              }`}
            >
              {post.category}
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-900 leading-[1.15]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User size={15} />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Divider */}
          <hr className="mt-8 border-navy-200" />

          {/* Featured Image */}
          {post.image && (
            <div className="mt-8 rounded-2xl overflow-hidden shadow-card">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover max-h-96"
              />
            </div>
          )}

          {/* Content */}
          <div className="mt-8 prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* About the Author */}
          <div className="mt-16 rounded-2xl bg-white border border-navy-100 shadow-card p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-600 text-lg font-bold text-white flex-shrink-0">
                CD
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy-900">{post.author}</h3>
                <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                  Carter Dewey leads solution architecture at TrustedNetworx, helping multi-site
                  organizations navigate telecom modernization, POTS replacement, and AI-powered
                  operations. With deep experience across property management, senior living,
                  hospitality, and healthcare, Carter translates complex infrastructure challenges
                  into practical, phased migration roadmaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            <span className="block">Have a question about this topic?</span>
            <span className="block text-brand-100">Let's talk about your specific situation.</span>
          </h2>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <Link to="/contact" className="btn-light">
              Get a Quote
              <ArrowLeft size={18} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
