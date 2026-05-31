import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const DIB_SCRIPT_URL = 'https://io.dropinblog.com/js/embed.js';
const DIB_BLOG_ID = '8459e16b-5d44-4d1a-81d7-a188b3ea3fe9';

export function Journal() {
  useEffect(() => {
    // Inject the DropInBlog embed script once — skip if already present
    if (document.querySelector(`script[src="${DIB_SCRIPT_URL}"]`)) return;

    const script = document.createElement('script');
    script.src = DIB_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <SEO
        title="Journal | TimeAtlas"
        description="Expert guides, workflows, and deep-dives on international time zones, worldwide team scheduling, and digital coordination."
        path="/journal"
      />
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div id="dib-posts" data-blog-id={DIB_BLOG_ID}></div>
        </div>
        <Footer />
      </div>
    </>
  );
}
