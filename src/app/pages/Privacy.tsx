import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | TimeAtlas"
        description="TimeAtlas privacy policy. Learn how we collect, use, and protect your data when you use our free time zone converter and scheduling tools."
        path="/privacy"
      />
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
              TimeAtlas does not require accounts and does not collect personal information
              directly.
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
              We may use analytics services (such as Google Analytics) to understand how visitors
              use the site. These services may collect anonymized usage data.
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
              Third-Party Advertising
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '16px',
              }}
            >
              TimeAtlas may display advertisements served by third-party networks, including Google
              AdSense. These advertising partners may use cookies and similar tracking technologies
              to serve ads based on your interests and prior visits to this or other websites.
            </p>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              You can opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1B6BB3', textDecoration: 'underline' }}
              >
                Google Ads Settings
              </a>{' '}
              or the{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1B6BB3', textDecoration: 'underline' }}
              >
                NAI opt-out page
              </a>
              .
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
              Data Retention
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              TimeAtlas does not store personal data on our servers beyond what is required for the
              immediate delivery of the service. Anonymized analytics data may be retained for up to
              26 months by third-party analytics providers, consistent with their own data retention
              policies. No user accounts are created, and no personally identifiable information is
              stored by TimeAtlas itself.
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
              Your Rights
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '16px',
              }}
            >
              Depending on your location, you may have rights under applicable data protection law,
              including the right to access, correct, or request deletion of any personal data held
              about you. Since TimeAtlas does not collect personal data directly, most such requests
              would be directed to the relevant third-party services (e.g., Google Analytics).
            </p>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              If you are located in the European Economic Area (EEA) or the United Kingdom, you also
              have the right to lodge a complaint with your local supervisory authority.
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
              Updates to This Policy
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px',
              }}
            >
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or applicable law. When we do, we will revise the "Last updated" date below.
              We encourage you to review this page periodically to stay informed about how we
              protect your information.
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
                href="mailto:hello@timeatlas.co"
                style={{ color: '#1B6BB3', textDecoration: 'underline' }}
              >
                hello@timeatlas.co
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
    </>
  );
}
