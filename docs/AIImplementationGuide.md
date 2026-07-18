# Glitch Blog
# AI Implementation Guide v1.0

---

> Purpose

This document defines the engineering standards, React architecture, coding conventions, performance requirements, and implementation rules for Glitch Blog.

This document is intended for AI coding agents (Claude Code, Cursor, Codex, Copilot) and human contributors.

The AI should follow these instructions unless explicitly overridden.

---

# 1. Project Goal

Build a production-quality frontend for an AI-assisted technical publishing platform.

The application should prioritize:

- Scalability
- Maintainability
- Accessibility
- Performance
- Component reusability
- Consistent design

Never optimize for short-term speed at the cost of architecture.

---

# 2. Technology Stack

Framework

- React (Vite)

Routing

- React Router

Styling

- TailwindCSS

Animation

- Framer Motion

Icons

- Lucide React

Rich Text Editor

- TinyMCE

State

- Context API
- React Query (recommended for server state)

HTTP Client

- Axios

Notifications

- Sonner / React Hot Toast

Forms

- React Hook Form

Validation

- Zod

---

# 3. Project Structure

src/

app/

assets/

components/

hooks/

layouts/

pages/

services/

context/

constants/

config/

lib/

utils/

styles/

routes/

types/

Do not place business logic inside pages.

---

# 4. Folder Responsibilities

Pages

Compose UI

Fetch data

Pass props

No complex rendering logic.

---

Components

Render reusable UI.

Contain minimal business logic.

---

Hooks

Contain reusable logic.

No JSX.

---

Services

API requests only.

No UI logic.

---

Utils

Pure helper functions.

---

Config

Application configuration.

---

Constants

Application constants.

---

# 5. Page Rules

Each page should:

Compose existing components.

Avoid duplicate layouts.

Avoid duplicate state.

Maximum length

≈250 lines

If larger

Split the page.

---

# 6. Component Rules

Maximum length

≈250 lines

One responsibility.

Reusable.

Theme-aware.

Accessible.

Responsive.

Support loading state.

Support error state.

Support skeleton.

Support animation.

---

# 7. Hook Rules

Every reusable logic belongs in hooks.

Examples

useTheme()

useReadingProgress()

useCommandPalette()

useDebounce()

useSearch()

useKeyboardShortcut()

useAutoSave()

useIntersectionObserver()

useInfiniteScroll()

useMediaQuery()

useAI()

useToast()

No hook should render JSX.

---

# 8. Styling Rules

TailwindCSS only.

Avoid custom CSS unless absolutely necessary.

Use utility classes.

Extract repeated class combinations using helper utilities (e.g. clsx/cva).

Never hardcode colors.

Use design tokens.

Never duplicate spacing.

Never duplicate border values.

---

# 9. Dark Mode

Dark mode should use the class strategy.

Every component supports

Light

Dark

No exceptions.

Never invert colors.

Every theme should be handcrafted.

---

# 10. Performance

Use lazy loading for

Editor

Comments

AI Features

Profile

Settings

Related Articles

Heavy Modals

Use React.lazy() where appropriate.

---

Memoize expensive components.

Avoid unnecessary renders.

Use React.memo() carefully.

---

# 11. Data Fetching

Separate

Server State

Client State

Recommended

React Query

Never manually cache API responses unless necessary.

---

# 12. Error Handling

Every request supports

Loading

Success

Error

Retry

Toast

Recovery UI

Never fail silently.

---

# 13. Forms

Use

React Hook Form

Validation

Zod

Inline validation.

Accessible labels.

Helpful messages.

---

# 14. API Layer

Never call Axios directly inside UI components.

Always use

services/

Example

articleService

authService

userService

searchService

notificationService

---

# 15. Context

Use Context API only for global concerns.

Theme

Authentication

Command Palette

Notifications

Preferences

Avoid storing server state inside Context.

---

# 16. Routing

Route-based code splitting.

Lazy load pages.

Protect authenticated routes.

Support 404.

Support loading routes.

---

# 17. Images

Lazy load.

Responsive.

Blur placeholder.

Fallback image.

Never stretch images.

---

# 18. Accessibility

Keyboard navigation.

ARIA labels.

Focus rings.

Screen reader support.

Semantic HTML.

Reduced motion.

Color contrast.

---

# 19. Animations

Framer Motion only.

Allowed

Fade

Scale

Translate

Opacity

Shadow

Layout

Avoid

Bounce

Spin

Elastic

Long transitions

Animation duration

150–250ms

---

# 20. AI Features

AI should always be asynchronous.

Never block typing.

Support

Cancel

Retry

Loading

Streaming-ready architecture

Future-compatible.

---

# 21. Code Quality

No duplicated JSX.

No duplicated styles.

No duplicated logic.

Prefer composition.

Prefer hooks.

Prefer reusable components.

---

# 22. Naming Conventions

Components

PascalCase

Hooks

camelCase

Constants

UPPER_CASE

Files

Match exported component.

Avoid abbreviations.

---

# 23. Import Order

React

Third-party libraries

Components

Hooks

Services

Utils

Styles

Keep import order consistent.

---

# 24. Comments

Write comments only when explaining

Why

not

What

Avoid unnecessary comments.

Code should be self-explanatory.

---

# 25. Type Safety

Even in JavaScript

Use JSDoc where useful.

Prefer predictable object shapes.

If migrating to TypeScript later,

architecture should remain compatible.

---

# 26. Reusability Checklist

Before creating a component ask

Can an existing component solve this?

Can this become generic?

Should this be a hook?

Can props solve this?

Will another page reuse it?

---

# 27. Git Practices

Small commits.

Meaningful messages.

One feature per commit.

Avoid committing generated files accidentally.

---

# 28. AI Coding Rules

The AI agent must

Never generate giant files.

Never duplicate components.

Never create similar buttons twice.

Always search for reusable components first.

Always respect the Design System.

Always respect the Component Library.

Always respect the UI Architecture.

If uncertain,

prefer extending an existing component over creating a new one.

---

# 29. Refactoring Rules

When adding features

Prefer extension

Not replacement.

Avoid breaking APIs.

Keep component interfaces stable.

---

# 30. Definition of Done

A feature is complete when

✓ Responsive

✓ Accessible

✓ Theme-aware

✓ Uses design tokens

✓ Reuses components

✓ Uses hooks

✓ Handles loading

✓ Handles errors

✓ Has skeleton

✓ Has animations

✓ Passes linting

✓ Uses services

✓ Follows architecture

---

# 31. Master Prompt for AI Coding Agents

You are implementing the frontend for Glitch Blog.

Before writing any code:

- Read DESIGN_SYSTEM.md
- Read UI_ARCHITECTURE.md
- Read COMPONENT_LIBRARY.md
- Follow this IMPLEMENTATION_GUIDE.md

Implementation Requirements

- Build reusable React components.
- Follow a composition-first architecture.
- Never create duplicate UI.
- Never exceed approximately 250 lines per component.
- Extract reusable logic into hooks.
- Extract API calls into services.
- Support light and dark themes.
- Implement responsive layouts from mobile to desktop.
- Implement skeletons for all major components.
- Use Framer Motion for subtle animations.
- Optimize for accessibility and performance.
- Prefer maintainability over speed.
- Every new feature must integrate with the existing component system instead of introducing parallel implementations.

When in doubt, choose the solution that results in the smallest, most reusable, and most maintainable codebase.

---

# Final Objective

The resulting project should resemble a production-grade SaaS application with a cohesive design system, scalable React architecture, and a polished user experience—not a collection of disconnected pages or CRUD screens.