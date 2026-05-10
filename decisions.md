# Decisions Log

Per Appendix B of the [V3 Build Brief](./timeatlas-v3-build-brief.md), this file tracks key decisions made at each phase gate.

---

## 2026-05-10 — Phase 1: /dev-test-components route

**Decision:** Added a temporary `/dev-test-components` preview route that renders sample instances of all Phase 1 components (ClientOnlyTime, CityZoneTile, ConverterCard) for side-by-side review during development.

**Reason:** Enables fast visual comparison of every component variant without navigating the full app. Accelerates review cycles for Phase 1 and subsequent phases.

**Deletion checklist:** Remove `/dev-test-components` route and `DevTestComponents.tsx` page before V3 production deploy. The route is excluded from `sitemap.xml` and carries `noindex,nofollow` meta.

**Reversibility:** Easy — delete one page file and remove one route entry.
