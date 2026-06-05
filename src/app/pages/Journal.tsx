import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { getAllArticles, formatDate } from '../lib/articles';
import { ARTICLES, articlePath, type ArticleSlug } from '../lib/articleRegistry';

// ─── Category badge colors ─────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  developer: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  guides: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  learn: 'bg-amber-50 text-amber-700 border-amber-200',
  general: 'bg-slate-50 text-slate-500 border-slate-200',
};

function CategoryBadge({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.general;
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${cls}`}>
      {category}
    </span>
  );
}

// ─── Article card ───────────────────────────────────────────────────────────────

function ArticleCard({
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
  wordCount,
}: {
  slug: ArticleSlug;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  tags: string[];
  wordCount: number;
}) {
  const path = articlePath(slug);
  return (
    <Link
      to={path}
      className="group block border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition-all bg-white"
    >
      <div className="flex items-center gap-2 mb-3">
        <CategoryBadge category={category} />
        <time dateTime={publishedAt} className="text-xs text-slate-400">
          {formatDate(publishedAt)}
        </time>
      </div>
      <h2 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 mb-2 leading-snug">
        {title}
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-400">{wordCount.toLocaleString()} words</span>
      </div>
    </Link>
  );
}

// ─── Journal index page ─────────────────────────────────────────────────────────

export function Journal() {
  // getAllArticles reads .md files at runtime via Vite's import.meta.glob.
  // On the prerendered static page the articles are baked in at build time.
  // The fallback [] prevents a crash if called before Vite replaces the glob.
  const articles = getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <SEO
        title="Journal | TimeAtlas"
        description="Expert guides, workflows, and deep-dives on international time zones, worldwide team scheduling, and digital coordination."
        path="/journal"
      />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

          {/* Page header */}
          <header className="mb-14">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
              TimeAtlas Journal
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              Guides &amp; Deep-Dives
            </h1>
            <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
              Technical documentation, time zone workflows, and data-driven observations
              from the TimeAtlas engineering and editorial team.
            </p>
          </header>

          {/* Featured article */}
          {featured && (
            <section className="mb-12">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Latest
              </p>
              <ArticleCard
                slug={featured.slug as ArticleSlug}
                title={featured.title}
                description={featured.description}
                publishedAt={featured.publishedAt}
                category={featured.category}
                tags={featured.tags}
                wordCount={featured.wordCount}
              />
            </section>
          )}

          {/* Article grid */}
          {rest.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                All Articles
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rest.map((a) => (
                  <ArticleCard
                    key={a.slug}
                    slug={a.slug as ArticleSlug}
                    title={a.title}
                    description={a.description}
                    publishedAt={a.publishedAt}
                    category={a.category}
                    tags={a.tags}
                    wordCount={a.wordCount}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty state — shown until first article is published */}
          {articles.length === 0 && (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400 text-sm">
                First article coming soon. Add a .md file to{' '}
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                  src/articles/
                </code>{' '}
                and register its slug in{' '}
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                  src/lib/articleRegistry.ts
                </code>
                .
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}