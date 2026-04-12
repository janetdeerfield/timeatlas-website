import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import type { CityPairPageData } from '../data/cityPairs';

interface CityPairPageProps {
  page: CityPairPageData;
}

export function CityPairPage({ page }: CityPairPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO title={page.title} description={page.description} path={`/${page.slug}`} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb - Simple & Lightweight */}
        <div className="mb-8 text-sm font-open-sans text-slate-600">
          <a href="/" className="text-indigo-600 hover:text-indigo-700">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/convert" className="text-indigo-600 hover:text-indigo-700">
            Convert
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">{page.h1}</span>
        </div>

        {/* H1 - Visible */}
        <h1 className="text-5xl font-bold font-inter mb-6 text-slate-900">{page.h1}</h1>

        {/* Intro Paragraph */}
        <p className="text-lg font-open-sans text-slate-700 mb-8 leading-relaxed">{page.intro}</p>

        {/* Conversion Table */}
        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">{page.tableHeading}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 font-semibold font-inter text-slate-900">From</th>
                  <th className="py-3 pr-4 font-semibold font-inter text-slate-900">To</th>
                </tr>
              </thead>
              <tbody>
                {page.conversions.map((row) => (
                  <tr key={row.from} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 pr-4 font-open-sans text-slate-700">{row.from}</td>
                    <td className="py-3 pr-4 font-open-sans text-slate-700">{row.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold font-inter text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {page.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold font-inter text-slate-900 mb-2">{item.question}</h3>
                <p className="font-open-sans text-slate-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Conversions */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold font-inter text-slate-900 mb-4">
            Related Time Conversions
          </h2>
          <div className="flex flex-col gap-3">
            {page.related.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-open-sans text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
