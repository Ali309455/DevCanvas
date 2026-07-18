# Responsive Audit Report — DevCanvas / Glitch Blog

**Date:** 2026-07-14  
**Scope:** Read-only; no code changed  
**Method:** Static review of layouts, chrome, pages, PostForm/RTE, article CSS  
**Status:** Awaiting approval before fixes

Breakpoints in use: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280

---

## Critical

### C1. PostForm never stacks — fixed 70/30 columns
| | |
|---|---|
| **Pages** | `/add-post`, `/edit-post/:slug` |
| **Where** | `src/components/Post/PostForm.jsx` (~176–191) |
| **Root cause** | `flex` + `w-[70%]` / `w-[30%]` with no `flex-col` breakpoint. On phones/tablets editor + AI + publish sit side-by-side → unusable RTE / horizontal squeeze. |
| **Proposed fix** | `flex flex-col xl:flex-row gap-6`; main `w-full xl:flex-1 min-w-0`; sidebar `w-full xl:w-80 shrink-0`. Put PublishPanel above AuthorAI on mobile. |

### C2. TinyMCE desktop toolbar / fixed height 700
| | |
|---|---|
| **Pages** | Add/Edit post |
| **Where** | `src/components/RTE.jsx` (~21–50) |
| **Root cause** | `menubar: true`, long single toolbar, `height: 700`, no `toolbar_mode` / mobile config. Toolbar overflows; iframe fights narrow parents (worse with C1). |
| **Proposed fix** | `toolbar_mode: 'sliding'`; `menubar: false` under `md`; shorter mobile toolbar; `height` via `min(70vh, 500)` / `matchMedia`; parent `min-w-0 max-w-full`. |

### C3. Article TOC + Reader AI only at `xl` — no mobile alternative
| | |
|---|---|
| **Pages** | `/post/:slug` |
| **Where** | `src/pages/Post.jsx` (~132–136, 218–221) |
| **Root cause** | Both asides `hidden xl:block`. Below 1280px TOC and AI are unreachable. |
| **Proposed fix** | Sticky “Contents” / “Ask AI” → bottom sheet or inline `details` under title; keep sticky columns only at `xl`. |

### C4. Reader AI / TOC forced into 180px conflicting with child widths
| | |
|---|---|
| **Pages** | `/post/:slug` at `xl+` |
| **Where** | `Post.jsx` (`w-[180px]`, invalid `w-max-[180px]`); `ReaderAISidebar.jsx` (`max-w-xs`, `p-6`); `TableOfContents.jsx` (`max-w-xs`) |
| **Root cause** | Parent ~180px vs children wanting ~320px + heavy padding → clip/overflow at desktop. |
| **Proposed fix** | Aside `w-64`–`w-72` (align with skeleton); children `w-full`; replace `w-max-[180px]` with real width class. |

---

## Major

### M1. Broken hero image class (missing `]`)
| | |
|---|---|
| **Pages** | Home (`md+`) |
| **Where** | `src/pages/Home.jsx` ~115 — `w-[95% aspect-video ...` |
| **Root cause** | Invalid Tailwind arbitrary value; width/aspect may not apply. |
| **Proposed fix** | `w-[95%] aspect-video object-cover ...` |

### M2. Featured hero card hidden on mobile with no substitute
| | |
|---|---|
| **Pages** | Home `<md` |
| **Where** | `Home.jsx` ~107–108 `hidden md:block` |
| **Root cause** | Featured story never shown on phones. |
| **Proposed fix** | Compact featured block `md:hidden` under CTAs; keep current card for `md+`. |

### M3. PostCard + feed padding crush content on small screens
| | |
|---|---|
| **Pages** | Home, AllPosts, Drafts |
| **Where** | `PostCard.jsx` `p-16`; Home grid `gap-16` |
| **Root cause** | 64px padding each side + shell gutters leave tiny media/title area on ~320–390px. |
| **Proposed fix** | Card `p-4 sm:p-6 md:p-8`; grid `gap-6 md:gap-10 lg:gap-12`. |

### M4. Nested horizontal padding (shell + pages)
| | |
|---|---|
| **Pages** | All routes (esp. forms/auth) |
| **Where** | `App.jsx` `px-8 md:px-12`; Header/Footer `px-6`; PostForm/Login add more |
| **Root cause** | Double/triple gutters shrink usable width; header/footer misaligned vs main (`1200` vs `1440`). |
| **Proposed fix** | One gutter token on header/main/footer; align footer to `--page-max-width`; drop redundant page `px-*`. |

### M5. `.browser-css` missing img/table/iframe overflow guards
| | |
|---|---|
| **Pages** | `/post/:slug` |
| **Where** | `src/index.css` (~142–188) — only `pre { overflow-x: auto }` |
| **Root cause** | Wide images/tables/embeds cause page-level horizontal scroll. |
| **Proposed fix** | `img, video, iframe { max-width:100%; height:auto }`; `table { display:block; overflow-x:auto; width:100% }`. |

### M6. Search control dead on click (keyboard-only palette)
| | |
|---|---|
| **Pages** | Global header |
| **Where** | `Header.jsx` ~77–83 (no `onClick`); palette via Ctrl/⌘+K only |
| **Root cause** | Touch/mobile users cannot open command palette. |
| **Proposed fix** | Wire Search `onClick` to palette open; hit area ≥44×44. |

### M7. Article title / meta not responsive
| | |
|---|---|
| **Pages** | `/post/:slug` |
| **Where** | `Post.jsx` ~166–171 `text-[40px]`; meta `flex justify-between` |
| **Root cause** | Fixed display size; long date + “min read” crowd on narrow screens. |
| **Proposed fix** | `text-2xl sm:text-3xl md:text-[40px] break-words`; meta `flex-col sm:flex-row gap-1`. |

### M8. Related posts 3 columns too soon inside ~800px column
| | |
|---|---|
| **Pages** | Post |
| **Where** | `Post.jsx` ~198 `md:grid-cols-3` |
| **Root cause** | At `md`, three cards inside max ~800px → ~220px cards. |
| **Proposed fix** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. |

### M9. Profile / Drafts headers and settings rows don’t wrap
| | |
|---|---|
| **Pages** | `/profile`, `/drafts` |
| **Where** | `Profile.jsx` `mt-32`/`mt-48`, settings `justify-between`; `Drafts.jsx` header row |
| **Root cause** | Large top margins waste fold; labels + toggles/totals collide under ~400px. |
| **Proposed fix** | Responsive margins; `flex-col sm:flex-row` for settings and draft header. |

### M10. Category chips short taps + wrap-heavy
| | |
|---|---|
| **Pages** | Home feed |
| **Where** | `Home.jsx` ~142–156 `px-4 py-1` |
| **Root cause** | Chips ~28–32px tall; 8 wrapping pills dominate small screens. |
| **Proposed fix** | `min-h-11 py-2.5`; optional `overflow-x-auto flex-nowrap` row. |

### M11. MobileNav: no body lock / safe-area / scroll
| | |
|---|---|
| **Pages** | All (`<md`) |
| **Where** | `MobileNav.jsx` |
| **Root cause** | Drawer can exceed viewport; background still scrolls; no `env(safe-area-inset-bottom)`; close `w-8 h-8`. |
| **Proposed fix** | Body scroll lock; `max-h-[85dvh] overflow-y-auto`; safe-area padding; close ≥44px. |

### M12. Skeleton padding ≠ PostCard (layout shift)
| | |
|---|---|
| **Pages** | Home, AllPosts, Drafts loading |
| **Where** | Article card skeleton `p-4` vs PostCard `p-16` |
| **Root cause** | Loading → content jump. |
| **Proposed fix** | Match responsive padding classes. |

### M13. Invalid `xl:gap-5.75` on AllPosts
| | |
|---|---|
| **Pages** | `/all-posts` |
| **Where** | `AllPosts.jsx` |
| **Root cause** | Non-standard spacing token — likely ignored; mismatch vs skeleton. |
| **Proposed fix** | Real value e.g. `xl:gap-12`. |

### M14. Brutal shadow / translate offsets risk horizontal scroll
| | |
|---|---|
| **Pages** | Home hero, PostCards near edges |
| **Where** | `Home.jsx` `translate-x-3/5`; `shadow-brutal` |
| **Root cause** | Offsets extend past padding with no `overflow-x: clip`. |
| **Proposed fix** | Section `overflow-x-clip` or absorb offsets in padding. |

---

## Minor

### m1. Header `pt-12` large on mobile → `pt-6 md:pt-12`
### m2. Search / Logout under-padded tap targets
### m3. Logo wordmark never collapses; unused `width` prop
### m4. Footer `max-w-[1200px]` vs main 1440; right-aligned only
### m5. Auth cards stack padding (`max-sm:max-w-[350px]` + outer `px-8`)
### m6. Home `text-6xl` / BecomeAuthor `text-5xl` / NotFound `text-9xl` need fluid steps
### m7. Hero card `p-20` heavy at tablet → `p-6 md:p-10 lg:p-20`
### m8. Prefer `dvh` over `vh` for shell/auth `min-h`
### m9. Command palette: hard-coded light, kbd footer, `pt-[15vh]` on small screens
### m10. Header author nav crowded at `md` (4 links + logout) — consider `lg` drawer
### m11. Showcase: `class=` typo, grid/col-span issues (dev page)
### m12. TOC dynamic `pl-${…}` may be purged by Tailwind
### m13. PublishPanel preview lacks `aspect-video`
### m14. Type tokens fixed px — no `clamp()` / media scaling

---

## Already OK

- Header ↔ MobileNav pair at `md`
- Home / AllPosts / Dashboard `grid-cols-1 md:… lg:…`
- Viewport meta in `index.html`
- Article `pre` overflow
- Theme toggle / hamburger ~40×40

---

## Suggested fix order (after approval)

1. **C1 + C2** — PostForm stack + RTE mobile  
2. **C3 + C4** — Mobile TOC/AI + aside widths  
3. **M1 + M2 + M3** — Home hero typo/featured + PostCard padding  
4. **M4–M6** — Gutters, browser-css, Search wiring  
5. **M7–M14** then minors

---

**No code was modified.** Approve a severity tier or the ordered list above to begin fixes.
