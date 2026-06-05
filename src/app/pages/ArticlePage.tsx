import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { JsonLd } from '../components/JsonLd';
import { SEO } from '../components/SEO';
import { getArticle, formatDate, type Article, type ArticleHeading } from '../lib/articles';
import { ChevronRight } from 'lucide-react';

// ─── Table of Contents ─────────────────────────────────────────────────────────

function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  if (headings.length < 3) return null;
  return (
    <nav aria-label="Table of contents" className="mb-8 border border-slate-200 rounded-lg p-5 bg-slate-50">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Contents
      </p>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-4' : h.level === 4 ? 'ml-8' : ''}>
            <a
              href={`#${h.id}`}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Key Takeaways ─────────────────────────────────────────────────────────────

function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <aside aria-label="Key takeaways" className="mb-8 border-l-4 border-amber-400 bg-amber-50 rounded-r-lg p-5">
      <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-3">
        Key Takeaways
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-700 flex gap-2">
            <span className="text-amber-500 font-bold mt-0.5 shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ─── Article Hero SVG ──────────────────────────────────────────────────────────

// ─── Article Hero Image ───────────────────────────────────────────────────────

function ArticleHero({ src, alt }: { src?: string; alt: string }) {
  if (!src) return <ArticleHeroSVG />;
  return (
    <div className="mb-10 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg mx-auto"
        loading="eager"
      />
    </div>
  );
}

/** Inline SVG line-art hero — shown when no image is set. Zero LCP impact. */
function ArticleHeroSVG() {
  return (
    <div className="mb-10 text-center">
      <div className="inline-block">
        <svg
          width="240"
          height="80"
          viewBox="0 0 240 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="mx-auto mb-6"
        >
          {/* Observatory crosshairs / time zone meridian lines */}
          <line x1="120" y1="4" x2="120" y2="76" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="4" y1="40" x2="236" y2="40" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
          {/* Outer circle */}
          <circle cx="120" cy="40" r="34" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
          {/* Inner circle */}
          <circle cx="120" cy="40" r="22" stroke="#CBD5E1" strokeWidth="1" fill="none" />
          {/* Hour markers */}
          <line x1="120" y1="6" x2="120" y2="12" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="154" y1="40" x2="148" y2="40" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="120" y1="74" x2="120" y2="68" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="86" y1="40" x2="92" y2="40" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Minute markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 120 + 33 * Math.sin(rad);
            const y1 = 40 - 33 * Math.cos(rad);
            const x2 = 120 + 28 * Math.sin(rad);
            const y2 = 40 - 28 * Math.cos(rad);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E2E8F0" strokeWidth="0.75" />;
          })}
          {/* UTC label */}
          <text x="120" y="44" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#94A3B8" fontFamily="monospace">
            UTC
          </text>
          {/* Corner coordinate marks */}
          <circle cx="8" cy="8" r="2" fill="#E2E8F0" />
          <circle cx="232" cy="8" r="2" fill="#E2E8F0" />
          <circle cx="8" cy="72" r="2" fill="#E2E8F0" />
          <circle cx="232" cy="72" r="2" fill="#E2E8F0" />
        </svg>
      </div>
    </div>
  );
}

// ─── Article body prose styles ─────────────────────────────────────────────────

/** Renders the article HTML with scoped prose typography.
 *  highlight.js styles are imported globally in main.tsx.
 */
function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="prose prose-slate max-w-none
        prose-headings:font-semibold prose-headings:text-slate-900
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
        prose-h4:text-base prose-h4:mt-5 prose-h4:mb-2
        prose-p:text-slate-700 prose-p:leading-relaxed
        prose-a:text-slate-600 prose-a:underline hover:prose-a:text-slate-900
        prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
        prose-pre:bg-[#1e1e2e] prose-pre:rounded-lg prose-pre:p-5 prose-pre:overflow-x-auto
        prose-pre:border prose-pre:border-slate-700
        prose-ul:space-y-1.5
        prose-li:text-slate-700
        prose-li:marker:text-slate-400
        prose-strong:text-slate-900 prose-strong:font-semibold
        prose-em:text-slate-600
        prose-hr:border-slate-200 prose-hr:my-8
        prose-img:rounded-lg prose-img:shadow-sm
        prose-img:border prose-img:border-slate-200"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

function FaqSection({ faq }: { faq: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!faq?.length) return null;

  return (
    <section aria-label="Frequently asked questions" className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-5">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-sm font-medium text-slate-800">{item.question}</span>
              <ChevronRight
                size={16}
                className={`shrink-0 text-slate-400 transition-transform ${open === i ? 'rotate-90' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQPage JSON-LD schema ───────────────────────────────────────────────────

function ArticleSchema({ article }: { article: Article }) {
  const siteUrl = 'https://timeatlas.co';
  const articleUrl = `${siteUrl}/journal/${article.slug}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Organization', name: 'TimeAtlas' },
    publisher: {
      '@type': 'Organization',
      name: 'TimeAtlas',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` },
    },
    url: articleUrl,
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
    </>
  );
}

// ─── Article page ──────────────────────────────────────────────────────────────

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); return; }
    const found = getArticle(slug);
    if (!found) { setNotFound(true); return; }
    setArticle(found);
  }, [slug]);

  if (notFound) {
    return (
      <>
        <SEO title="Article Not Found | TimeAtlas" description="This article does not exist." path="/journal" robots="noindex" />
        <div className="min-h-screen flex flex-col bg-white">
          <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <p className="text-sm text-slate-400 uppercase tracking-widest mb-2">404</p>
            <h1 className="text-3xl font-semibold text-slate-900 mb-4">Article not found</h1>
            <Link to="/journal" className="text-sm text-slate-600 underline hover:text-slate-900">
              Back to Journal
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${article.title} | TimeAtlas Journal`}
        description={article.description}
        path={`/journal/${article.slug}`}
        type="article"
      />
      <ArticleSchema article={article} />

      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-slate-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/journal" className="hover:text-slate-600 transition-colors">Journal</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-600 truncate max-w-[200px]">{article.title}</li>
            </ol>
          </nav>

          {/* Category + date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-slate-300">·</span>
            <time dateTime={article.publishedAt} className="text-xs text-slate-400">
              {formatDate(article.publishedAt)}
            </time>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-400">{article.wordCount.toLocaleString()} words</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight mb-2">
            {article.title}
          </h1>

          {/* SVG Hero */}
          <ArticleHero src={article.heroImage} alt={article.title} />

          {/* Key Takeaways */}
          <KeyTakeaways items={article.keyTakeaways} />

          {/* TOC (shown for longer articles) */}
          <TableOfContents headings={article.headings} />

          {/* Article body */}
          <ArticleBody html={article.contentHtml} />

          {/* FAQ */}
          <FaqSection faq={article.faq} />

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            <Link
              to="/journal"
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}