import { Link } from 'react-router';
import { Footer } from '../components/Footer';

export function Privacy() {
  return (
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
            Privacy Policy
          </h1>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            TimeAtlas respects your privacy. This policy explains what information we collect and
            how we use it.
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
            Information We Collect
          </h2>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '16px',
            }}
          >
            TimeAtlas does not require accounts and does not collect personal information directly.
          </p>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '16px',
            }}
          >
            We may collect limited non-personal data such as:
          </p>

          <ul
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
              paddingLeft: '24px',
            }}
          >
            <li style={{ marginBottom: '12px' }}>Browser type</li>
            <li style={{ marginBottom: '12px' }}>Device type</li>
            <li style={{ marginBottom: '12px' }}>Pages visited</li>
            <li style={{ marginBottom: '12px' }}>General location (country/region)</li>
          </ul>

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
            Cookies
          </h2>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '16px',
            }}
          >
            TimeAtlas may use cookies to improve performance and user experience.
          </p>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            Third-party services, including advertising providers such as Google, may also use
            cookies.
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
            Analytics
          </h2>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            We may use analytics services (such as Google Analytics) to understand how visitors use
            the site. These services may collect anonymized usage data.
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
            Data Use
          </h2>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '16px',
            }}
          >
            Collected data is used to:
          </p>

          <ul
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
              paddingLeft: '24px',
            }}
          >
            <li style={{ marginBottom: '12px' }}>Improve the website</li>
            <li style={{ marginBottom: '12px' }}>Understand usage patterns</li>
            <li style={{ marginBottom: '12px' }}>Maintain performance and reliability</li>
          </ul>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
              fontWeight: 600,
            }}
          >
            We do not sell personal data.
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
            Contact
          </h2>

          <p
            style={{
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            If you have questions about this policy, please contact us at:{' '}
            <a
              href="mailto:contact@timeatlas.co"
              style={{ color: '#3B82F6', textDecoration: 'underline' }}
            >
              contact@timeatlas.co
            </a>
          </p>

          <p
            style={{
              color: '#94A3B8',
              fontSize: '14px',
              lineHeight: '24px',
              marginTop: '48px',
              fontStyle: 'italic',
            }}
          >
            Last updated: March 2026
          </p>
        </article>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
