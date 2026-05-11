# Decisions

## 2026-05-08 — Remove "Hear the Time" from homepage

**Decision:** Remove the "Hear the Time" audio feature from the homepage entirely. Do not retain as feature flag.

**Reason:** Hero real estate is the highest-value surface on the site. The feature's user demand is unproven, while alternative uses for that space (Time Tools description, SEO content, clearer navigation) have known value. Earlier brief specified a Phase 6 decision based on performance cost; deciding earlier on a real-estate basis is a better criterion.

**Alternatives considered:** Keep with feature flag pending Phase 6 audit. Move to footer or About page. Rejected — neither earns the engineering cost of maintaining the audio asset.

**Reversibility:** Easy. Component code preserved in git history; can be reintroduced later if user research shows demand.

## 2026-05-10 - Phase 1 decision

**Decision:** Added a temporary component preview route at /dev-test-components for development QA only.

**Reason:** Team needs a single side-by-side workspace to verify V3 Phase 1 component variants before integrating each component into production pages.

**Alternatives considered:** Reviewing each component only in-page where it is used.

**Reversibility:** Easy.

## Deletion checklist

- [ ] Remove /dev-test-components route before V3 production deploy

**Implementation note:** The preview route is included in local production preview builds so reviewers can inspect component output after `npm run build && npm run preview`. It remains `noindex,nofollow` and must be removed before deployment.
