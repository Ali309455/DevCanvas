You are a senior frontend engineer and UI/UX developer.

I will provide:

1. My complete React frontend codebase.
2. A reference website/Figma that represents the visual design I want.

Your job is to transform my existing frontend so it closely matches the reference design while preserving all existing functionality.

## Rules

* Do NOT change backend logic.
* Do NOT change APIs.
* Do NOT change authentication.
* Do NOT modify business logic.
* Do NOT remove features.
* Do NOT rename API functions or routes unless absolutely necessary.
* Keep all existing functionality working.

## Your Task

Analyze the reference thoroughly and extract its:

* Design system
* Typography
* Colors
* Layout
* Grid
* Spacing
* Components
* Animations
* Micro-interactions
* Responsive behavior
* Hover effects
* Loading states
* Empty states
* Error states
* Button styles
* Form styles
* Navigation
* Card layouts
* Overall design language

Then apply those design principles to my application.

Do not copy code from the reference. Recreate the same visual quality using clean React components.

## Improve the Entire UI

Redesign every page consistently, including:

* Home
* Navbar
* Footer
* Blog listing
* Blog details
* Login
* Signup
* Create/Edit Post
* Profile
* Search
* Settings (if present)
* Dashboard (if present)

## Modern UI Requirements

Improve:

* Typography hierarchy
* Whitespace
* Component consistency
* Responsive layouts
* Mobile experience
* Tablet layouts
* Desktop layouts
* Buttons
* Inputs
* Cards
* Dialogs
* Dropdowns
* Pagination
* Forms
* Icons
* Image presentation

## Loading Experience

Replace generic spinners with elegant loading experiences.

Create reusable loading components for:

* Entire page loading
* Blog cards
* Hero section
* Forms
* Images
* Suspense boundaries

## Empty & Error States

Create beautiful reusable pages/components for:

* 404
* 500
* Unauthorized
* Empty blog list
* Empty search
* Offline state
* Network error

## Animations

Use tasteful animations.

Prefer Framer Motion if it already exists in the project.

Use animations only where they improve UX.

Examples:

* Page transitions
* Hover interactions
* Button press feedback
* Fade-ins
* Card entrance
* Image loading
* Navigation transitions

Avoid excessive animation.

## Performance

While redesigning:

* Remove duplicated UI code.
* Create reusable components.
* Create reusable layouts.
* Optimize rendering.
* Lazy load pages where appropriate.
* Memoize expensive components if beneficial.
* Remove unused CSS.

## Code Quality

Write production-quality code.

Use reusable components.

Maintain clean folder structure.

Keep styling consistent.

Avoid inline styles unless justified.

## Workflow

Work iteratively.

Before modifying files:

* Explain what you are going to change.

After each iteration:

* List every modified file.
* Explain why it was changed.
* Mention any potential improvements for the next iteration.

Do not attempt to redesign everything at once. Work page by page and component by component to minimize regressions and keep the application stable.

My next message will contain the reference link and/or images. Base your redesign entirely on that reference while preserving my application's functionality.
## Final Audit (Required)

When the entire frontend redesign is complete, perform a final audit.

Create a report with the following sections:

### 1. Changes Made

List every significant UI/UX improvement you implemented.

### 2. Backend Compatibility

Explicitly confirm that:

* No backend logic was modified.
* No API endpoints were changed.
* No authentication flow was altered.
* No business logic was changed.
* No database schema assumptions were modified.

### 3. Recommended Backend Enhancements

Identify features or UI improvements that could **not** be fully implemented because they require backend support.

For each item, include:

* Feature name
* Why it requires backend changes
* Suggested API/database changes
* Priority (High/Medium/Low)

Examples include:

* Reading time calculation
* View count
* Like/Reaction system
* Bookmark/Favorites
* Comments & Replies
* User Following
* Notifications
* Search indexing
* Related posts
* Reading history
* Recently viewed
* Draft autosave
* Rich author profiles
* Trending posts
* Recommended posts
* Analytics
* Image optimization
* SEO metadata
* Social sharing
* Email subscriptions
* Newsletter
* Tags & categories enhancements

### 4. Nice-to-Have Features

Suggest modern blog features that would improve the application but are currently absent.

### 5. Performance Report

List performance optimizations completed and any remaining opportunities.

### 6. Accessibility Report

Summarize accessibility improvements made and any remaining issues.

### 7. Technical Debt

List code quality or architectural improvements that should be addressed in future iterations.

Do not implement backend-dependent features. Instead, document them clearly so they can be added later without breaking the existing application.
