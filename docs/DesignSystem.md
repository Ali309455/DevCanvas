# Glitch Blog
# Product Design System v1.0

---

> Version: 1.0
>
> Project: Glitch Blog
>
> Stack:
>
> - React
> - Vite
> - TailwindCSS
> - React Router
> - Framer Motion
> - TinyMCE
> - Lucide Icons

---

# 1. Vision

Glitch Blog is **not another CRUD blog**.

It is an AI-assisted technical publishing platform designed for developers, engineers, students and technical writers.

The design should communicate:

- Premium
- Modern
- Editorial
- Technical
- Minimal
- Intelligent
- Fast

The user should immediately understand that writing and reading are the primary experiences.

Every design decision should reinforce this idea.

---

# 2. Design Philosophy

Our design language combines four ideas.

## Editorial Layout

Large typography

Generous whitespace

Readable content

Magazine-inspired hierarchy

Content-first experience

---

## Neo Brutalism

Strong borders

Flat surfaces

Bold shadows

Simple geometry

High contrast

Never excessive.

The interface should feel confident—not loud.

---

## Modern SaaS

Professional spacing

Reusable components

Predictable interactions

Smooth animations

Accessible UI

---

## AI First

AI should assist.

Never interrupt.

AI appears only when relevant.

It should feel like a writing partner.

---

# 3. Core UX Principles

## Principle 1

Content is always the hero.

Everything else supports it.

---

## Principle 2

Reduce cognitive load.

Every page should have one primary purpose.

---

## Principle 3

Use color intentionally.

90%

Neutral

10%

Accent

Never the opposite.

---

## Principle 4

Consistency over creativity.

Every page should feel like the same product.

---

## Principle 5

Micro interactions should reward actions.

Never distract.

---

# 4. Brand Personality

The interface should feel:

✔ Premium

✔ Smart

✔ Confident

✔ Calm

✔ Technical

✔ Creative

✔ Friendly

Never:

✘ Childish

✘ Cyberpunk

✘ Gaming UI

✘ Color overload

✘ Heavy glassmorphism

✘ Random gradients

---

# 5. Typography

## Heading Font

Space Grotesk

Used for:

- Hero titles
- Page titles
- Cards
- Buttons
- Navigation
- Headings

Weights

600

700

800

---

## Body Font

Inter

Used for

- Articles
- Forms
- Descriptions
- Comments
- Settings

Weights

400

500

---

## Code Font

JetBrains Mono

Used for

- Code blocks
- Inline code
- Terminal snippets
- Commands

---

## Metadata Font

IBM Plex Sans Condensed

Used only for

- Reading time
- Author
- Date
- Categories
- Statistics

---

# 6. Color Philosophy

Use color to guide attention.

Not decorate.

Primary UI remains neutral.

Accent colors communicate actions.

---

# 7. Light Theme

Background

#F8F7F4

Surface

#FFFFFF

Surface Hover

#F3F3F3

Border

#111111

Primary Text

#111111

Secondary Text

#666666

Primary Accent

#8B5CF6

Soft Accent

#F2EBFF

Success

#22C55E

Warning

#FFD84D

Danger

#EF4444

Information

#3B82F6

---

# 8. Dark Theme

Background

#121212

Surface

#1B1B1B

Surface Hover

#252525

Border

#F4F4F4

Primary Text

#F7F7F7

Secondary Text

#A0A0A0

Primary Accent

#A78BFA

Soft Accent

#2A1F45

Success

#22C55E

Warning

#FFD84D

Danger

#EF4444

Information

#60A5FA

---

# 9. Border System

Default

2px

Feature Card

3px

Radius

Cards

18px

Buttons

12px

Inputs

12px

Images

18px

Pills

999px

---

# 10. Shadows

Primary Shadow

4px 4px 0 currentColor

Hover Shadow

6px 6px 0 currentColor

Pressed

2px 2px 0 currentColor

Never use blurry shadows.

---

# 11. Spacing System

Use an 8pt grid.

Allowed spacing values

4

8

12

16

24

32

40

48

64

80

96

128

Avoid arbitrary spacing.

---

# 12. Grid System

Desktop

1440px

Content Width

820px

Reading Width

680–760px

Editor Width

Maximum available width

Sidebar Width

320px

Container Padding

32px

---

Tablet

24px padding

---

Mobile

16px padding

---

# 13. Responsive Strategy

Desktop First

↓

Tablet

↓

Mobile

Every component must be responsive.

No horizontal scrolling.

---

# 14. Component Philosophy

Components should be

Reusable

Composable

Accessible

Theme aware

Animation ready

Responsive

Never tied to a specific page.

---

# 15. Button Language

Primary

Purple background

White text

Shadow

---

Secondary

Surface

Border

Shadow

---

Ghost

Transparent

Underline on hover

---

Danger

Red

Only destructive actions

---

Loading

Button width remains fixed.

Spinner replaced with subtle loader.

---

# 16. Card Language

Cards use

Surface

Border

Shadow

Hover lift

No glass effects.

No gradients.

---

# 17. Forms

Large inputs

Comfortable spacing

Visible labels

Accessible focus states

Helpful validation

Never rely only on placeholder text.

---

# 18. Icons

Library

Lucide

Size

20px

24px

Stroke

2px

Icons always align with text.

---

# 19. Illustrations

Style

Flat

Editorial

Minimal

Soft abstract shapes

Purple accents

Avoid

3D

Cartoons

Emoji style

---

# 20. Animation Philosophy

Animations should communicate.

Not entertain.

Allowed

Fade

Scale

Translate

Opacity

Shadow

Layout animation

Avoid

Bounce

Elastic

Long animations

Over-rotation

---

Animation Duration

Fast

150ms

Normal

200ms

Slow

300ms

---

# 21. Dark Mode

Dark mode is handcrafted.

Never invert colors.

Every component has its own dark appearance.

Maintain identical hierarchy.

Users should immediately recognize every component.

---

# 22. Accessibility

WCAG AA contrast

Keyboard navigation

Visible focus ring

Semantic HTML

ARIA where required

Reduced motion support

Proper heading hierarchy

Accessible forms

---

# 23. Performance Principles

Lazy load heavy pages

Lazy load editor

Optimize images

Prevent layout shift

Use skeleton loaders

Avoid unnecessary re-renders

Memoize expensive components

Split bundles where appropriate

---

# 24. Empty States

Every feature requires an empty state.

Examples

No Posts

No Drafts

No Bookmarks

No Notifications

No Search Results

Each should include

Illustration

Helpful message

Primary action

---

# 25. Error States

Every API interaction supports

Loading

Success

Error

Retry

Toast notification

Recovery path

Never leave users without guidance.

---

# 26. Design Tokens

Never hardcode

Colors

Spacing

Radius

Shadow

Typography

Transitions

Everything should reference design tokens.

---

# 27. Overall User Journey

Landing

↓

Explore

↓

Read

↓

Register

↓

Write

↓

Publish

↓

Share

↓

Repeat

Every page should encourage the next action naturally.

---

# 28. Definition of Done

The interface is considered complete when:

✓ Light and Dark themes are fully supported.

✓ Every page is responsive.

✓ Components are reusable.

✓ Typography is consistent.

✓ Colors follow the design system.

✓ Skeleton loading is implemented.

✓ Accessibility standards are met.

✓ Animations are subtle and consistent.

✓ No duplicated UI exists.

✓ The experience feels like a premium AI-powered publishing platform rather than a traditional blog.

---

# Final Design Goal

When someone visits Glitch Blog, they should think:

> "This feels like a professional writing platform built for developers—not a portfolio CRUD project."

Every design choice—from typography and spacing to animations, loading states, and AI interactions—must reinforce that impression.