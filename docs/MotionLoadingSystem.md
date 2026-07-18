# Glitch Blog

# Motion & Loading System v1.0

---

## Purpose

Motion is not decoration.

Motion communicates.

It should explain

- what changed
- where content appeared
- what is loading
- what is interactive
- what succeeded
- what failed

Every animation should improve usability.

Never distract users.

---

# 1. Motion Philosophy

The UI should feel

✓ Fast

✓ Smooth

✓ Predictable

✓ Premium

Never

✘ Bouncy

✘ Flashy

✘ Slow

✘ Over-animated

---

# 2. Animation Tokens

Fast

150ms

Normal

200ms

Slow

300ms

Extra Slow

400ms

Never exceed 400ms.

---

## Easing

Default

easeOut

Hover

easeInOut

Modal

easeOut

Drawer

easeOut

Route

easeInOut

Keep easing consistent.

---

# 3. Animation Types

Allowed

Fade

Scale

Translate

Opacity

Shadow

Layout

Height

Blur (minimal)

Avoid

Bounce

Spin

Elastic

Flip

Random rotations

Long delays

---

# 4. Hover Animations

Cards

Lift

2px

Increase shadow

Primary Buttons

Lift

2px

Shadow grows

Links

Underline animation

Icons

Translate X/Y

2px

Never scale icons aggressively.

---

# 5. Route Transitions

Current Page

↓

Fade Out

↓

Skeleton

↓

Fade In

↓

Content

Never

Blank screen

Spinner

Blank white flash

---

Duration

200ms

---

# 6. Skeleton Philosophy

Skeletons should preserve layout.

Users should know exactly what is loading.

Every visible component requires a matching skeleton.

---

# 7. Skeleton Components

NavbarSkeleton

HeroSkeleton

FeaturedArticleSkeleton

ArticleCardSkeleton

ArticleGridSkeleton

ArticleSkeleton

TOCSkeleton

SidebarSkeleton

ProfileSkeleton

CommentSkeleton

NotificationSkeleton

SearchSkeleton

EditorSkeleton

CommandPaletteSkeleton

SettingsSkeleton

BookmarkSkeleton

RelatedArticlesSkeleton

FooterSkeleton

---

# 8. Skeleton Rules

Keep exact dimensions.

Never shift layout.

Use shimmer animation.

Subtle only.

Duration

1.5s

Infinite

Use neutral colors.

Support dark mode.

---

# 9. Loading States

Landing

Navbar Skeleton

Hero Skeleton

Feature Skeleton

Footer Skeleton

---

Homepage

Navbar

Featured

Article Grid

Categories

Newsletter

Footer

---

Reading Page

Navbar

Progress

TOC

Article

Sidebar

Comments

---

Editor

Toolbar

Editor

Publish Panel

---

Profile

Header

Statistics

Tabs

Cards

---

Search

Input

Filters

Results

---

# 10. Button Loading

Never resize buttons.

Disable interaction.

Show inline loader.

Preserve width.

Example

Publish

↓

Publishing...

↓

Published ✓

---

# 11. AI Loading

AI should never show

Loading...

Instead

Show

Thinking...

with animated content placeholders.

Streaming animation preferred.

Support

Cancel

Retry

Copy

Regenerate

---

# 12. Unique Brand Loading

Never use a generic spinner.

Brand loading animation:

Idea

Editor Cursor

Animated typing lines

Blinking caret

Article placeholders

Subtle purple accent

Example

██████████████

██████████

██████████████████

|

|

|

The user immediately understands

"This platform is about writing."

---

Alternative

Glitch logo

Letters appear

G

GL

GLI

GLIT

GLITCH

Fade

Repeat

Keep animation below

2 seconds

---

# 13. Page Transitions

Landing

↓

Home

Fade

Scale

---

Home

↓

Article

Layout transition

Shared image

Progress fade

---

Article

↓

Editor

Fade

Editor expands

---

Profile

↓

Settings

Slide

Fade

---

# 14. Command Palette

Ctrl + K

Overlay fade

Palette scales

Results stagger

Arrow navigation animated

ESC fades

---

# 15. Drawer Animation

Bottom Sheet

Mobile

Slide Up

Desktop

Slide Left

Duration

250ms

Backdrop

Opacity

0 → 50%

---

# 16. Modal Animation

Fade

-

Scale

95%

↓

100%

Duration

180ms

Close

Reverse

---

# 17. Toast Animation

Slide Up

Fade

Auto dismiss

4s

Stack vertically

---

# 18. Dropdown Animation

Fade

TranslateY

8px

↓

0

Duration

180ms

---

# 19. Tabs

Underline slides

Content fades

Avoid instant swaps.

---

# 20. Theme Switching

Never flash.

Animate

Background

Text

Border

Shadow

Duration

200ms

No page reload.

---

# 21. Reading Experience

Reading progress updates smoothly.

TOC highlight animates.

Code blocks fade in.

Images lazy load with blur.

Headings reveal naturally.

---

# 22. Editor Experience

Toolbar

Sticky

Auto Save

Animated

Word Count

Live

Reading Time

Live

Slash Commands

Instant

Floating AI

Slide In

---

# 23. Empty States

Every feature requires one.

Structure

Illustration

↓

Title

↓

Description

↓

Primary Action

↓

Secondary Action (optional)

Examples

No Posts

No Drafts

No Bookmarks

No Search Results

No Notifications

No Comments

No Categories

---

# 24. Error States

Friendly

Clear

Actionable

Structure

Icon

↓

Title

↓

Explanation

↓

Retry

↓

Contact Support (optional)

---

# 25. Success States

Show

Check animation

Toast

Small celebration

Never interrupt workflow.

---

# 26. Motion Accessibility

Respect

prefers-reduced-motion

Disable

Large transitions

Parallax

Complex movement

Keep

Fade

Opacity

Instant transitions

---

# 27. Performance

60 FPS

Avoid layout thrashing.

Use transform.

Avoid expensive repainting.

Lazy load heavy animations.

Do not animate

width

height

top

left

when transform is sufficient.

---

# 28. Motion Checklist

Every interaction should answer

What happened?

Where did it go?

What changed?

Can the user undo it?

Does motion help understanding?

If not,

remove it.

---

# 29. AI Agent Instructions

Implement a premium motion system inspired by

- Linear
- Notion
- Raycast
- GitHub
- Vercel

Requirements

- Never use fullscreen spinners.
- Replace page loading with skeletons.
- Every reusable component has a skeleton equivalent.
- Preserve layout while loading.
- Route transitions under 250ms.
- Use Framer Motion consistently.
- Use transform and opacity animations.
- Support reduced motion.
- All loading states must feel intentional.
- Theme switching should animate smoothly.
- Loading should reinforce the identity of a technical publishing platform.

---

# 30. Definition of Done

Motion system is complete when

✓ No generic spinners remain.

✓ Every page has skeleton loading.

✓ Every interaction provides visual feedback.

✓ Motion improves usability.

✓ Animations are consistent.

✓ Performance remains smooth.

✓ Dark mode transitions feel natural.

✓ Loading experience strengthens the brand.

---

# Final Goal

The user should never think

"This page is loading."

Instead they should think

"The application is progressively revealing content."

The loading experience should feel like a premium writing platform where content is always on its way rather than a website waiting for data.
