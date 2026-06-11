import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { NewsHub } from '../components/news/NewsHub';
import { NEWS_ARTICLES, TICKER_ITEMS } from '../data/newsData';
import { DST_POLICY } from '../data/dstPolicy';

export function News() {
  return (
    <>
      <SEO
        title="News — Time Science, Policy & Standards | TimeAtlas"
        description="Time science, policy, and standards — the TimeAtlas Dispatch covers DST legislation, IANA tzdb updates, and atomic timekeeping."
        path="/news"
      />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <NewsHub articles={NEWS_ARTICLES} tickerItems={TICKER_ITEMS} dstData={DST_POLICY} />
        </div>
        <Footer />
      </div>
    </>
  );
}
