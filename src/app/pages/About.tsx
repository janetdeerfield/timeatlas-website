import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function About() {
  return (
    <>
      <SEO
        title="Explore the Tools | TimeAtlas"
        description="Whether you're checking the exact time, converting time zones, or planning meetings across continents, every tool is designed to feel calm, fast, and intuitive."
        path="/about"
      />

      <div style={{ backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="prose prose-lg max-w-none">
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#0F172A',
                fontSize: '48px',
                fontWeight: 500,
                marginBottom: '32px',
                lineHeight: 1.2,
              }}
            >
              About TimeAtlas
            </h1>

            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '24px',
              }}
            >
              <strong style={{ color: '#0F172A' }}>TimeAtlas</strong> is a simple idea, carefully
              built: the internet's cleanest time tools.
            </p>

            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              In a world of cluttered interfaces and overloaded websites, TimeAtlas focuses on
              clarity, precision, and ease of use. Whether you're checking the exact time,
              converting time zones, or planning meetings across continents, every tool is designed
              to feel calm, fast, and intuitive.
            </p>

            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#0F172A',
                fontSize: '32px',
                fontWeight: 500,
                marginTop: '48px',
                marginBottom: '24px',
                lineHeight: 1.25,
              }}
            >
              What You Can Do with TimeAtlas
            </h2>

            <ul
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '12px' }}>
                Check the exact current time anywhere in the world
              </li>
              <li style={{ marginBottom: '12px' }}>Convert time between cities instantly</li>
              <li style={{ marginBottom: '12px' }}>Plan meetings across multiple time zones</li>
              <li style={{ marginBottom: '12px' }}>View world clocks for major cities</li>
              <li style={{ marginBottom: '12px' }}>
                Use developer-friendly formats like UTC, ISO 8601, and Unix time
              </li>
            </ul>

            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#0F172A',
                fontSize: '32px',
                fontWeight: 500,
                marginTop: '48px',
                marginBottom: '24px',
                lineHeight: 1.25,
              }}
            >
              Our Approach
            </h2>

            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '16px',
              }}
            >
              TimeAtlas is built around a few simple principles:
            </p>

            <ul
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Clarity over clutter</strong>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Speed over complexity</strong>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Precision without distraction</strong>
              </li>
            </ul>

            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              We believe time tools should be effortless — something you can trust at a glance.
            </p>

            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#0F172A',
                fontSize: '32px',
                fontWeight: 500,
                marginTop: '48px',
                marginBottom: '24px',
                lineHeight: 1.25,
              }}
            >
              A Note on Time
            </h2>

            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '24px',
              }}
            >
              Time is one of the few things everyone shares. TimeAtlas is designed to help people
              navigate it — across cities, countries, and moments — with clarity and ease.
            </p>

            <p
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#0F172A',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '8px',
              }}
            >
              <strong>TimeAtlas</strong>
              <br />
              The Internet's Cleanest Time Tools
            </p>

            {/* CTA */}
            <div
              style={{
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid #E6E9EE',
              }}
            >
              <Link
                to="/#time-tools"
                style={{
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0A84D0',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#005EE9';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0A84D0';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Explore the tools →
              </Link>
            </div>
          </article>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
