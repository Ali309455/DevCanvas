# Glitch Blog

# UI Architecture Specification v1.0

---

> Purpose

This document defines the complete UI architecture of Glitch Blog.

It specifies:

- Page hierarchy
- React component composition
- Layout system
- Navigation flow
- Responsive behavior
- AI placement
- Component responsibilities

This document intentionally contains **no implementation code**.

---

# 1. Architecture Philosophy

## React First

Pages should be extremely lightweight.

A page should compose reusable components.

Pages should rarely exceed 150-250 lines.

---

## Single Responsibility

Each component has one responsibility.

Avoid giant components.

Example

❌

Home.jsx

3000 lines

Contains everything.

---

Preferred

Home.jsx

↓

Hero

↓

FeaturedPosts

↓

Categories

↓

ArticleGrid

↓

Newsletter

---

# 2. Application Structure

App

│

├── Public Routes

├── Protected Routes

├── Shared Layouts

├── Global Providers

└── Modals

---

# 3. Global Layouts

Three layouts should exist.

PublicLayout

Used by

Landing

Home

Article

Search

Categories

About

---

DashboardLayout

Used by

Editor

Profile

Bookmarks

Settings

Notifications

---

AuthLayout

Used by

Login

Register

Forgot Password

Reset Password

---

Every layout owns

Navbar

Footer

Theme

Global Search

Command Palette

---

# 4. Route Structure

/

Landing

/home

Homepage

/article/:slug

Article

/write

Editor

/edit/:id

Update Article

/profile/:username

Profile

/settings

Settings

/search

Search

/category/:slug

Category

/login

Login

/register

Register

/forgot-password

Forgot Password

/reset-password

Reset Password

/404

Not Found

---

# 5. Landing Page

Purpose

Sell the platform.

Not the content.

---

Component Tree

LandingPage

│

├── Navbar

├── HeroSection

├── FeatureSection

├── AIShowcase

├── FeaturedArticles

├── Testimonials

├── Newsletter

└── Footer

---

Hero

Contains

Headline

Description

CTA

Secondary CTA

Illustration

Command Palette Preview

---

Features

3-6 cards

Explain platform

Not generic features.

---

AI Showcase

Demonstrate

Writing

Summarization

Outline

Grammar

Continue Writing

---

Footer

Navigation

Socials

Copyright

---

# 6. Homepage

Purpose

Discover articles.

---

Component Tree

HomePage

│

├── Navbar

├── HeroBanner

├── FeaturedArticle

├── CategoryTabs

├── ArticleGrid

├── Newsletter

└── Footer

---

Hero Banner

Shows

Trending article

Quick search

Popular category

---

Article Grid

Responsive

Desktop

3 columns

Tablet

2 columns

Mobile

1 column

---

Each card

Cover

Category

Title

Excerpt

Author

Date

Reading Time

---

# 7. Search Page

Layout

Navbar

↓

Search Input

↓

Recent Searches

↓

Filters

↓

Results

↓

Pagination

---

Supports

Title

Tags

Category

Author

AI Search (future)

---

# 8. Category Page

Navbar

↓

Category Hero

↓

Description

↓

Articles

↓

Pagination

---

# 9. Reading Page

This is the most important page.

---

Layout

Navbar

↓

Reading Progress

↓

Three Column Layout

↓

Footer

---

Desktop

Left

Table of Contents

Share

Reading Time

Bookmark

---

Center

Article

Maximum width

Beautiful typography

Images

Code

Tables

Callouts

Comments

---

Right

Author Card

AI Summary

Related Articles

Like

Bookmark

Report

---

Mobile

Hide sidebars.

TOC becomes bottom sheet.

AI Summary collapses below article.

---

# 10. Editor

Purpose

Writing.

Nothing else.

---

Layout

Navbar

↓

Editor Toolbar

↓

Rich Text Editor

↓

Publishing Settings

↓

Footer

---

Editor

Minimum

80vh

Maximum width

Almost full screen

Distraction free.

---

Publishing Panel

Contains

Title

Slug

Category

Tags

Cover Image

SEO

Visibility

Publish

---

# 11. AI Experience

AI is contextual.

Never permanent.

---

Slash Commands

/

Generates

Heading

Paragraph

Outline

List

Code

Conclusion

FAQ

---

Floating AI Button

Bottom right

↓

Drawer

↓

Contains

Continue Writing

Rewrite

Expand

Shorten

Grammar

SEO

Generate Tags

Summarize

Translate

---

Selected Text

Context Menu

Improve

Rewrite

Explain

Expand

Shorten

Translate

---

# 12. Profile

Layout

Navbar

↓

Profile Header

↓

Statistics

↓

Tabs

↓

Footer

---

Tabs

Articles

Drafts

Bookmarks

History

Settings

---

Statistics

Articles

Views

Likes

Bookmarks

Reading Time

---

# 13. Settings

Sections

General

Appearance

Notifications

Security

Connected Accounts

Danger Zone

---

# 14. Authentication

Split Screen

Left

Brand

Illustration

Features

---

Right

Authentication Card

Login

Register

Forgot Password

Google

---

# 15. Forgot Password

Email

↓

Verification Code

↓

New Password

↓

Success

Simple

Clear

Minimal

---

# 16. Command Palette

Shortcut

Ctrl + K

Available everywhere.

---

Contains

Navigation

Recent

Search

Create Post

Settings

Theme

Profile

Bookmarks

AI Commands

---

Keyboard Navigation

Arrow Keys

Enter

Escape

Tab

---

# 17. Notifications

Dropdown

Unread

Read

Mark All

Empty State

Pagination

---

# 18. Global Search

Accessible from

Navbar

Command Palette

Search Page

---

Supports

Articles

Categories

Authors

Tags

---

# 19. Mobile Architecture

Bottom Navigation

Home

Search

Write

Bookmarks

Profile

---

Desktop Navbar

Logo

Categories

Search

Theme

Profile

---

Tablet

Collapsed navigation

---

# 20. Responsive Rules

Desktop

Three columns

---

Tablet

Two columns

---

Mobile

Single column

Drawers replace sidebars.

---

# 21. Page Loading

Every page

Skeleton

↓

Content

Never

Blank page

Spinner

---

# 22. Error Flow

Loading

↓

Success

↓

Error

↓

Retry

Every page follows this lifecycle.

---

# 23. Component Ownership

Pages own

Layout

Data Fetching

Composition

---

Components own

Rendering

Interaction

Animation

Accessibility

---

Hooks own

Logic

Fetching

Utilities

---

Services own

API communication

---

# 24. Future Expansion

Architecture should support

AI Chat

Notifications

Comments

Collaborative Editing

Teams

Collections

Draft History

Without major restructuring.

---

# 25. Acceptance Criteria

The UI architecture is complete when:

✓ Every page is built from reusable components.

✓ No page contains duplicated UI.

✓ Every layout supports dark mode.

✓ Mobile layout feels native.

✓ AI tools are contextual.

✓ Navigation is consistent.

✓ Components remain reusable across future features.

---

# Final Goal

The user should never feel like they are navigating separate pages.

They should feel like they are using one cohesive product where every screen follows the same design language, interaction patterns, and information architecture.
