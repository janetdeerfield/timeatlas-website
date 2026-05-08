## 2026-05-08 — Remove "Hear the Time" from homepage

**Decision:** Remove the "Hear the Time" audio feature from the homepage entirely. Do not retain as feature flag.

**Reason:** Hero real estate is the highest-value surface on the site. The feature's user demand is unproven, while alternative uses for that space (Time Tools description, SEO content, clearer navigation) have known value. Earlier brief specified a Phase 6 decision based on performance cost; deciding earlier on a real-estate basis is a better criterion.

**Alternatives considered:** Keep with feature flag pending Phase 6 audit. Move to footer or About page. Rejected — neither earns the engineering cost of maintaining the audio asset.

**Reversibility:** Easy. Component code preserved in git history; can be reintroduced later if user research shows demand.
