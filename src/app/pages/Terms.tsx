import { Link } from 'react-router';
import { Footer } from '../components/Footer';

export function Terms() {
  return (
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
            Terms of Service
          </h1>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            By using TimeAtlas, you agree to the following terms.
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
            Use of Service
          </h2>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            TimeAtlas provides time-related tools for informational purposes. While we strive for
            accuracy, we do not guarantee that all data is error-free.
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
            TimeAtlas is not intended for use in time-critical or safety-critical systems.
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
            No Warranty
          </h2>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            TimeAtlas is provided "as is" without warranties of any kind. We are not responsible for
            any decisions made based on the use of this site.
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
            Availability
          </h2>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            We may update, modify, or discontinue parts of the service at any time without notice.
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
            Third-Party Services
          </h2>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            TimeAtlas may include links or integrations with third-party services. We are not
            responsible for their content or behavior.
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
            Acceptance
          </h2>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#475569',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '32px',
            }}
          >
            By using TimeAtlas, you agree to these terms.
          </p>

          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#6B7280',
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
