# Glitch Blog

# Component Library v1.0

---

## Purpose

This document defines every reusable React component used throughout the application.

Goals

- Reusable
- Accessible
- Responsive
- Theme Aware
- Animation Ready
- AI Friendly

A component should solve one problem only.

If a component starts handling multiple unrelated responsibilities,
split it.

---

# 1. Component Philosophy

Every component should satisfy these rules.

✓ Single Responsibility

✓ Reusable

✓ Small

✓ Predictable

✓ Accessible

✓ Theme Aware

✓ Responsive

✓ Lazy-load Friendly

✓ Testable

---

# 2. Folder Structure

components/

│

├── ui/

├── layout/

├── navigation/

├── article/

├── editor/

├── ai/

├── auth/

├── profile/

├── feedback/

├── search/

├── category/

├── common/

└── skeleton/

Never place page-specific components inside ui/.

---

# 3. UI Components

These are generic building blocks.

Button

Input

Textarea

Card

Badge

Chip

Avatar

Tooltip

Dropdown

Modal

Drawer

Tabs

Accordion

Alert

Toast

Progress

Spinner (only for buttons)

Divider

Separator

Pagination

Breadcrumb

CommandPalette

ThemeToggle

All pages should use these.

Never duplicate them.

---

# 4. Layout Components

AppLayout

PublicLayout

DashboardLayout

AuthLayout

Container

Section

Grid

Stack

Sidebar

PageHeader

PageFooter

SectionTitle

ContentWrapper

---

# 5. Navigation Components

Navbar

DesktopNav

MobileNav

NavItem

SearchBar

ThemeToggle

ProfileMenu

NotificationDropdown

CommandPaletteButton

Breadcrumb

---

# 6. Article Components

ArticleCard

FeaturedArticleCard

ArticleGrid

ArticleHeader

ArticleContent

ArticleImage

ArticleQuote

ArticleCodeBlock

ArticleTable

ArticleTags

ArticleMeta

AuthorCard

RelatedArticles

BookmarkButton

LikeButton

ShareButton

CommentSection

ReadingProgress

ReadingTime

TableOfContents

---

# 7. Editor Components

EditorToolbar

EditorContainer

RichTextEditor

WordCounter

CharacterCounter

ReadingTimeCalculator

AutoSaveIndicator

EditorStatusBar

PublishPanel

TagSelector

CategorySelector

CoverUploader

SeoPanel

DraftBadge

VisibilitySelector

---

# 8. AI Components

FloatingAIButton

AIDrawer

AICommandMenu

AISuggestionCard

ContinueWritingButton

RewriteButton

GrammarSuggestion

HeadingGenerator

OutlineGenerator

SummaryGenerator

TagSuggestion

SeoSuggestion

SelectedTextMenu

PromptHistory

AIResponse

AILoader

Never permanently occupy page space.

AI should appear only when requested.

---

# 9. Authentication Components

LoginForm

RegisterForm

ForgotPasswordForm

ResetPasswordForm

GoogleButton

PasswordInput

OtpInput

VerificationStatus

AuthCard

---

# 10. Profile Components

ProfileHeader

ProfileStats

ProfileAvatar

ProfileTabs

ArticleHistory

BookmarksGrid

DraftGrid

ActivityTimeline

ProfileSettings

---

# 11. Search Components

SearchInput

SearchFilters

SearchResults

RecentSearches

EmptySearch

SearchSuggestions

SearchPagination

---

# 12. Feedback Components

Toast

Snackbar

Alert

SuccessMessage

WarningMessage

ErrorState

RetryCard

LoadingOverlay

ConfirmationDialog

---

# 13. Empty States

Every feature needs one.

Examples

No Posts

No Drafts

No Bookmarks

No Notifications

No Search Results

No Categories

Each contains

Illustration

Title

Description

Primary Action

---

# 14. Skeleton Components

Every visible component requires
its own skeleton.

NavbarSkeleton

HeroSkeleton

ArticleCardSkeleton

FeaturedSkeleton

SidebarSkeleton

EditorSkeleton

ProfileSkeleton

CommentSkeleton

SearchSkeleton

NotificationSkeleton

SettingsSkeleton

CommandPaletteSkeleton

Loading should preserve layout.

Never show blank pages.

---

# 15. Component Rules

Maximum component size

≈250 lines

If larger

Split it.

---

Maximum nesting

5 levels

Beyond that

Extract components.

---

No duplicated JSX.

---

No duplicated Tailwind classes.

---

No inline styles.

---

# 16. Component States

Every interactive component supports

Default

Hover

Focus

Active

Loading

Disabled

Success

Error

Dark Mode

---

# 17. Common Props

Reusable components should support

className

children

variant

size

disabled

loading

icon

onClick

asChild (where appropriate)

Never invent inconsistent prop names.

---

# 18. Variant System

Buttons

Primary

Secondary

Ghost

Outline

Danger

Success

Cards

Default

Featured

Outlined

Interactive

Compact

Badges

Primary

Secondary

Warning

Success

Danger

Neutral

---

# 19. Accessibility

Every component must

Support keyboard navigation

Expose ARIA labels

Have visible focus states

Support screen readers

Maintain color contrast

---

# 20. Responsiveness

Every component should define

Desktop behavior

Tablet behavior

Mobile behavior

No component should overflow horizontally.

---

# 21. Animation

Use Framer Motion.

Allowed

Fade

Scale

Translate

Opacity

Layout

Shadow

Avoid

Bounce

Elastic

Long animations

---

# 22. Component Ownership

Pages

↓

Compose components

Components

↓

Render UI

Hooks

↓

Contain logic

Services

↓

API

Utilities

↓

Helpers

Keep responsibilities separated.

---

# 23. Naming Convention

PascalCase

Components

camelCase

Hooks

UPPER_CASE

Constants

No abbreviations.

Example

ArticleReadingProgress

instead of

ARP

---

# 24. Import Rules

Absolute imports preferred.

Group imports

React

Libraries

Components

Hooks

Services

Utilities

Styles

Maintain consistency.

---

# 25. Component Checklist

Before creating a component ask

Can this be reused?

Does it already exist?

Can props make it flexible?

Does it support dark mode?

Does it support mobile?

Does it support loading?

Does it have a skeleton?

Does it animate correctly?

Does it satisfy accessibility?

If any answer is "No",

improve the component first.

---

# 26. Definition of Done

A component is complete when

✓ Reusable

✓ Responsive

✓ Theme aware

✓ Accessible

✓ Animated

✓ Supports loading

✓ Supports error states

✓ Uses design tokens

✓ Has documentation

✓ No duplicated logic

---

# Final Goal

The entire application should feel like it is built from one coherent component library rather than dozens of unrelated UI elements.

A new page should be created primarily by composing existing components instead of writing new ones.
