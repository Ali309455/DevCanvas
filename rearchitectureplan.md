# Glitch Blog — Re-Architecture Master Plan

## Objective

This is NOT a feature implementation task.

This phase focuses entirely on restructuring the application architecture while keeping the existing application functional.

The primary objective is to transform the current CRUD blog into a scalable publishing platform.

---

# General Rules

## DO

- Preserve existing functionality whenever possible.
- Make changes incrementally.
- Keep commits small and isolated.
- Reuse existing components before creating new ones.
- Maintain React best practices.
- Keep the code modular.
- Extract reusable logic into hooks.
- Keep UI changes minimal unless explicitly requested.
- Follow the existing project coding style.

---

# UI Guidelines

The existing visual design language must remain consistent.

Maintain:

- White background
- Sharp corners
- Thin black borders
- Magenta accent
- Minimal shadows
- Existing typography
- Existing spacing scale

The goal is NOT to redesign the application.

The goal is to expose the new architecture through intuitive interfaces.

---

## UI Changes ARE Allowed

Create new UI whenever it is required to support a feature.

Examples include:

- Author Dashboard
- Become an Author page
- Reader Profile
- Draft Management
- Role-specific Navigation
- Author Settings
- Empty States
- Loading States
- Permission States
- Access Denied pages

These interfaces should clearly demonstrate the new architecture.

---

## UI Changes are NOT Allowed

Do not redesign existing pages only for aesthetics.

Avoid:

- Random layout changes
- Color palette changes
- Typography changes
- Component rewrites without purpose
- Animation changes unrelated to the feature

Every UI change must exist because it exposes functionality.

---

## Design Principle

Architecture should be visible.

A recruiter should immediately understand the platform capabilities by interacting with the interface.

If a backend or architectural feature cannot be discovered by using the UI, create the minimum UI necessary to expose it.

Do not hide important functionality behind code.

## DO NOT

- Do not redesign the UI.
- Do not remove existing features.
- Do not break current routes.
- Do not rename files unless necessary.
- Do not change Appwrite authentication.
- Do not introduce unnecessary dependencies.
- Do not implement AI features.
- Do not implement PWA features.
- Do not optimize unrelated code.
- Do not refactor everything at once.

---///////''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''';;';''''''''''''''''''''''''''''''''''''''''

# Scope

This phase ONLY covers:

- Content identity
- User roles
- Authorization
- Navigation architecture
- Layout separation
- Author onboarding
- Dashboard architecture
- Technical debt cleanup

Nothing else.

---

# Existing Stack

Frontend

- React
- Redux Toolkit
- React Router
- Tailwind CSS

Backend

- Appwrite

Database

- Appwrite Database

---

# Development Philosophy

Never perform a large rewrite.

Every task should leave the application in a working state.

After each module:

- Build
- Test
- Verify
- Continue

---

# Module 1 — Content Identity

Current issue:

Slug is currently acting as the document identifier.

This must be removed.

Goal:

Separate

- Document ID
- Slug
- Title

Rules

- Document ID is immutable.
- Slug is SEO-friendly.
- Title is editable.
- Slug should not be treated as the primary identifier.
- Slug generation should be independent from title updates.
- Existing posts should remain accessible.

Do not implement URL redirects unless requested.

---

# Module 2 — User Roles

Introduce a role-based architecture.

Supported roles

- Guest
- Reader
- Author
- Admin (future-ready only)

Avoid using

```
if(auth)
```

Prefer

```
role
permissions
```

---

# Module 3 — Authorization

Authorization should be centralized.

Avoid scattered permission checks.

Create reusable utilities/hooks.

Every protected page should check authorization before rendering.

---

# Module 4 — Reader Experience

Reader should NOT have access to

- Create Post
- Edit Post
- Delete Post
- Dashboard
- Drafts

Reader navigation should only expose reading-related functionality.

---

# Module 5 — Become an Author

Create a dedicated onboarding flow.

This flow should be isolated.

Initially approval may be automatic.

Future moderation should be easy to add.

---

# Module 6 — Author Experience

Create a dedicated Author Dashboard.

Dashboard should eventually support

- Drafts
- Published Posts
- Analytics
- Quick Draft
- Profile

Do not implement analytics yet.

Only prepare the architecture.

---

# Module 7 — Layout Separation

Separate layouts.

Examples

Public Layout

Author Layout

Future Admin Layout

Avoid putting role logic inside every page.

Layout should determine available navigation.

---

# Module 8 — Navigation

Navigation should depend on user role.

Guest

- Home
- Articles
- Login
- Signup

Reader

- Home
- Articles
- Categories
- Profile
- Become Author

Author

- Dashboard
- Create Post
- Drafts
- Published Posts
- Profile

---

# Module 9 — Folder Structure

Prefer

```
components/

layouts/

hooks/

services/

utils/

pages/

features/

constants/
```

Avoid extremely large components.

If a component exceeds approximately 300–400 lines, consider splitting it.

---

# Module 10 — Technical Debt

Reduce duplicated logic.

Extract

- Authorization
- Draft logic
- Queries
- Form utilities

into reusable hooks/services.

---

# Testing Rules

After every module verify

- Authentication
- Navigation
- Create Post
- Edit Post
- Delete Post
- Related Posts
- Routing

No existing functionality should regress.

---

# AI Restrictions

The assistant must NOT

- invent requirements
- redesign pages
- change styling unnecessarily
- modify unrelated files
- introduce breaking changes

If an architectural decision is uncertain,

STOP

Explain the trade-offs

Wait for approval.

---

# End Goal

At the end of this phase the application should feel like a publishing platform rather than a CRUD blog while remaining fully compatible with future AI features and Progressive Web App support.
