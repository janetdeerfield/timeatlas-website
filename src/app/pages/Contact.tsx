import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { JsonLd } from '../components/JsonLd';

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact TimeAtlas',
  url: 'https://timeatlas.co/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'TimeAtlas',
    url: 'https://timeatlas.co',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@timeatlas.co',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  },
};

export function Contact() {
  return (
    <>
      <SEO
        title="Contact TimeAtlas — Get in Touch"
        description="Contact the TimeAtlas team with feedback, data corrections, partnership inquiries, or press questions. We read every message at hello@timeatlas.co."
        path="/contact"
      />
      <JsonLd schemas={[CONTACT_SCHEMA]} />

      <div style={{ backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="prose prose-lg max-w-none">
            <h1
              style={{
                color: '#0F172A',
                fontSize: '48px',
                fontWeight: 500,
                marginBottom: '32px',
                lineHeight: 1.2,
              }}
            >
              Contact TimeAtlas
            </h1>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '24px',
              }}
            >
              We read every message. Whether you&apos;ve spotted a time zone discrepancy, have an
              idea for a tool, or want to work with us — drop us a line.
            </p>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              Email us at{' '}
              <a
                href="mailto:hello@timeatlas.co"
                style={{ color: '#224FB8', fontWeight: 600, textDecoration: 'none' }}
              >
                hello@timeatlas.co
              </a>{' '}
              and we&apos;ll get back to you, usually within two business days.
            </p>

            <h2
              style={{
                color: '#0F172A',
                fontSize: '32px',
                fontWeight: 500,
                marginTop: '48px',
                marginBottom: '24px',
                lineHeight: 1.25,
              }}
            >
              What to Reach Out About
            </h2>

            <ul
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Corrections</strong> — a time zone offset, DST
                rule, or conversion that looks wrong. Accuracy is the product; we treat these as
                priority reports.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Feedback &amp; feature ideas</strong> — tools
                you wish existed, or rough edges in the ones that do.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Partnerships &amp; press</strong> —
                collaborations, data licensing, or media inquiries.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#0F172A' }}>Journal &amp; Dispatch tips</strong> — time
                science news, DST legislation updates, or topics you&apos;d like covered in the{' '}
                <Link to="/journal" style={{ color: '#224FB8', textDecoration: 'none' }}>
                  Journal
                </Link>
                .
              </li>
            </ul>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              You can also follow the project on{' '}
              <a
                href="https://github.com/janetdeerfield"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#224FB8', textDecoration: 'none' }}
              >
                GitHub
              </a>
              , or learn more on the{' '}
              <Link to="/about" style={{ color: '#224FB8', textDecoration: 'none' }}>
                About page
              </Link>
              .
            </p>
          </article>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
