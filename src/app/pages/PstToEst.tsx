// src/app/pages/PstToEst.tsx
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

export function PstToEst() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFEFE' }}>
      <SEO
        title="PST to EST Time Converter | TimeAtlas"
        description="Convert Pacific Time (PST) to Eastern Time (EST) instantly. PST is 3 hours behind EST. View conversion table and meeting times."
        path="/pst-to-est"
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#364151' }}>
          <a href="/" style={{ color: '#2E45F0', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>→</span>
          <a href="/convert" style={{ color: '#2E45F0', textDecoration: 'none' }}>Convert</a>
          <span style={{ margin: '0 8px' }}>→</span>
          <span style={{ color: '#080A0C', fontWeight: 600 }}>PST to EST</span>
        </div>

        {/* Hero Section */}
        <section className="mb-10 text-center">
          <h1 
            className="mb-4 text-5xl font-bold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            PST to EST Time Converter
          </h1>
          <p 
            className="mx-auto max-w-3xl text-lg"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#364151',
            }}
          >
            Convert Pacific Time (PST) to Eastern Time (EST) instantly. Eastern Time is{' '}
            <span style={{ color: '#2E45F0', fontWeight: 600 }}>3 hours ahead</span> of Pacific Time.
          </p>
        </section>

        {/* How to Convert Section */}
        <section className="mb-10 rounded-xl shadow-sm p-6 bg-white" style={{ border: '1px solid #E6E9EE' }}>
          <h2 
            className="mb-4 text-2xl font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            How to convert PST to EST
          </h2>
          <p 
            className="mb-4"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#364151',
              fontSize: '15px',
              lineHeight: '1.6',
            }}
          >
            To convert Pacific Time to Eastern Time, add 3 hours. This is useful for scheduling calls, meetings, and coordinating between the West Coast and East Coast of the United States.
          </p>
          <div 
            className="space-y-2"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#364151',
              fontSize: '15px',
            }}
          >
            <div>9:00 AM PST = 12:00 PM EST</div>
            <div>1:00 PM PST = 4:00 PM EST</div>
            <div>6:00 PM PST = 9:00 PM EST</div>
          </div>
        </section>

        {/* Conversion Table */}
        <section className="mb-10 rounded-xl shadow-sm p-6 bg-white" style={{ border: '1px solid #E6E9EE' }}>
          <h2 
            className="mb-4 text-2xl font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            PST to EST conversion table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E6E9EE' }}>
                  <th 
                    className="py-3 pr-4 text-left"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontWeight: 600,
                    }}
                  >
                    Pacific Time (PST)
                  </th>
                  <th 
                    className="py-3 pr-4 text-left"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#080A0C',
                      fontWeight: 600,
                    }}
                  >
                    Eastern Time (EST)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['6:00 AM', '9:00 AM'],
                  ['7:00 AM', '10:00 AM'],
                  ['8:00 AM', '11:00 AM'],
                  ['9:00 AM', '12:00 PM'],
                  ['10:00 AM', '1:00 PM'],
                  ['11:00 AM', '2:00 PM'],
                  ['12:00 PM', '3:00 PM'],
                  ['1:00 PM', '4:00 PM'],
                  ['2:00 PM', '5:00 PM'],
                  ['3:00 PM', '6:00 PM'],
                  ['5:00 PM', '8:00 PM'],
                  ['6:00 PM', '9:00 PM'],
                ].map(([pst, est]) => (
                  <tr key={pst} style={{ borderBottom: '1px solid #E6E9EE' }}>
                    <td 
                      className="py-3 pr-4"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                      }}
                    >
                      {pst}
                    </td>
                    <td 
                      className="py-3 pr-4"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: '#364151',
                      }}
                    >
                      {est}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Times for Meetings */}
        <section className="mb-10 rounded-xl shadow-sm p-6 bg-white" style={{ border: '1px solid #E6E9EE' }}>
          <h2 
            className="mb-4 text-2xl font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Best times for meetings
          </h2>
          <p 
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: '#364151',
              fontSize: '15px',
              lineHeight: '1.6',
            }}
          >
            A practical overlap window is 9:00 AM to 2:00 PM PST, which is 12:00 PM to 5:00 PM EST. This keeps both sides within normal working hours.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-10 rounded-xl shadow-sm p-6 bg-white" style={{ border: '1px solid #E6E9EE' }}>
          <h2 
            className="mb-4 text-2xl font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            FAQ
          </h2>
          <div className="space-y-6">
            <div>
              <h3 
                className="font-semibold mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                  fontSize: '16px',
                }}
              >
                What is the time difference between PST and EST?
              </h3>
              <p 
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#364151',
                  fontSize: '15px',
                }}
              >
                Eastern Time is 3 hours ahead of Pacific Time. So when it's noon on the West Coast, it's 3:00 PM on the East Coast.
              </p>
            </div>
            <div>
              <h3 
                className="font-semibold mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                  fontSize: '16px',
                }}
              >
                How do I convert PST to EST?
              </h3>
              <p 
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#364151',
                  fontSize: '15px',
                }}
              >
                Add 3 hours to the Pacific Time to get the Eastern Time. For example, 2:00 PM PST is 5:00 PM EST.
              </p>
            </div>
            <div>
              <h3 
                className="font-semibold mb-2"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#080A0C',
                  fontSize: '16px',
                }}
              >
                Does daylight saving time affect PST to EST conversion?
              </h3>
              <p 
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: '#364151',
                  fontSize: '15px',
                }}
              >
                The time zone names may change (PDT in summer, PST in winter), but the 3-hour difference between coasts remains consistent throughout the year.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="rounded-xl shadow-sm p-6 bg-white" style={{ border: '1px solid #E6E9EE' }}>
          <h2 
            className="mb-4 text-2xl font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#080A0C',
            }}
          >
            Related tools & conversions
          </h2>
          <div className="flex flex-col gap-3">
            <a 
              href="/convert"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#2E45F0',
                fontSize: '16px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Full Time Zone Converter →
            </a>
            <a 
              href="/est-to-pst"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#2E45F0',
                fontSize: '16px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              EST to PST →
            </a>
            <a 
              href="/world"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#2E45F0',
                fontSize: '16px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              World Clock →
            </a>
            <a 
              href="/meet"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#2E45F0',
                fontSize: '16px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Meeting Planner →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}