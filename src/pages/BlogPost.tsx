import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  getPostBySlug,
  heroImageSrc,
  getRelatedPosts,
  CATEGORY_HUBS,
  postDocumentTitle,
} from '../utils/blog';
import Seo, { SITE_URL } from '../components/Seo';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : null), [slug]);

  if (!post) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-canvas">
        <div className="px-4 text-center">
          <h1 className="font-display text-display-h2 font-semibold text-ink">Post not found</h1>
          <p className="mt-4 text-body">The article you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const heroSrc = heroImageSrc(post);
  const canonicalPath = `/blog/${post.slug}`;
  // <title> uses the 60-char rule (with optional seoTitle); the on-page <h1>
  // below always keeps the full post.title.
  const documentTitle = postDocumentTitle(post);
  const relatedPosts = getRelatedPosts(post);
  const hub = CATEGORY_HUBS[post.category];
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    author:
      post.author === 'Carter Dewey'
        ? {
            '@type': 'Person',
            '@id': `${SITE_URL}/about/team#carter-dewey`,
            name: 'Carter Dewey',
            url: `${SITE_URL}/about/team`,
          }
        : { '@type': 'Person', name: post.author },
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
    <div className="bg-canvas text-body antialiased">
      <Seo
        title={documentTitle}
        description={post.description}
        type="article"
        image={post.image}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />

      {/* Hero — navy so it sits under the fixed transparent navbar. The back
          link used to live in a white bar at the very top of the page, which
          the fixed navbar covered: the link was visible but unclickable, and
          the navbar's white text vanished against it. */}
      <section className="bg-navy-950 pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto w-full max-w-[68ch] px-6 md:px-gutter">
          <Link
            to="/blog"
            className="relative inline-flex items-center gap-2 text-sm font-semibold text-navy-200 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-mono-label text-accent-500">{post.category}</p>
          <h1 className="mt-4 font-display text-display-h2 font-semibold leading-tight text-white">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-mono-label text-navy-300">
            <span>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span>{post.author}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="mx-auto w-full max-w-[68ch] px-6 py-12 md:px-gutter">
        {heroSrc && (
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-hairline bg-navy-100">
            <img
              src={heroSrc}
              alt={post.title}
              width={1024}
              height={576}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Body — 18px / 1.7 line-height */}
        <div className={`${heroSrc ? 'mt-10' : ''} prose prose-lg max-w-none [&_p]:text-[18px] [&_p]:leading-[1.7] [&_li]:text-[18px] [&_li]:leading-[1.7]`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* About the author */}
        <div className="mt-14 border-t border-hairline pt-6">
          <p className="font-mono text-xs uppercase tracking-mono-label text-muted-text">About the author</p>
          <h2 className="mt-2 font-display text-display-h3 font-semibold text-ink">{post.author}</h2>
          <p className="mt-3 leading-relaxed text-body">
            Carter Dewey is CEO &amp; Founder of TrustedNetworx, helping multi-site
            organizations navigate telecom modernization, POTS replacement, and AI-powered
            operations — translating complex infrastructure challenges into practical, phased
            migration roadmaps.
          </p>
        </div>
      </article>

      {/* Related reading — rendered in the app (and captured by react-snap into
          the prerendered HTML) so every post links to three other posts. */}
      {(relatedPosts.length > 0 || hub) && (
        <section className="border-t border-hairline bg-white">
          <div className="mx-auto w-full max-w-[68ch] px-6 py-section md:px-gutter">
            <h2 className="font-display text-display-h3 font-semibold text-ink">Related reading</h2>
            {relatedPosts.length > 0 && (
              <ul className="mt-6 space-y-3">
                {relatedPosts.map((related) => (
                  <li key={related.slug}>
                    <Link
                      to={`/blog/${related.slug}`}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {related.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {hub && (
              <p className="mt-6 text-sm text-body">
                <Link to={hub.to} className="font-semibold text-brand-600 hover:text-brand-700">
                  {hub.label}
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-950">
        <div className="mx-auto w-full max-w-site px-6 py-section md:px-gutter">
          <h2 className="font-display text-display-h2 font-semibold text-white">
            Have a question about this topic?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-navy-200">Let&apos;s talk about your specific situation.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200">
            Get a quote
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
