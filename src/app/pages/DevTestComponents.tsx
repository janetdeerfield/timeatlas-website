import { SEO } from '../components/SEO';
import { SwapButton } from '../components/time';

export function DevTestComponents() {
  return (
    <>
      <SEO
        title="Component Test Page | TimeAtlas"
        description="Development-only component test page for TimeAtlas V3 components."
        path="/dev-test-components"
        robots="noindex,nofollow"
      />
      <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <p className="mb-2 font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-accent">
              Phase 1 component library
            </p>
            <h1 className="mb-4 font-[var(--font-display)] text-4xl font-semibold text-foreground">
              Development test components
            </h1>
            <p className="max-w-2xl font-[var(--font-body)] text-base text-muted-foreground">
              Manual review surface for newly built TimeAtlas V3 components.
            </p>
          </div>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 font-[var(--font-display)] text-2xl font-semibold text-card-foreground">
              SwapButton
            </h2>
            <p className="mb-6 font-[var(--font-body)] text-sm text-muted-foreground">
              Sample: source EST, target PST. The component renders a crawlable anchor to
              /pst-to-est.
            </p>
            <SwapButton currentSource="EST" currentTarget="PST" />
          </section>
        </div>
      </div>
    </>
  );
}
