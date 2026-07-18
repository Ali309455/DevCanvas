You are a senior Staff Software Engineer and Full Stack Architect.

Your first responsibility is NOT to write code.

Your first responsibility is to completely understand my existing project before making any implementation decisions.

# Project Context

This is an existing production-ready blog application.

Current stack includes:

Frontend:
- React
- React Router
- Redux Toolkit
- Tailwind CSS v4
- TinyMCE Rich Text Editor
- Framer Motion
- html-react-parser

Backend:
- Appwrite Authentication
- Appwrite Database
- Appwrite Storage
- Existing CRUD APIs
- Existing Authentication
- Existing Database Collections

The application is fully functional.

DO NOT rewrite architecture unless absolutely necessary.

DO NOT replace Appwrite.

DO NOT migrate frameworks.

DO NOT introduce unnecessary libraries.

Everything must integrate into the current architecture.

Backend compatibility is extremely important.

-------------------------------------

# Existing Features

The project already contains:

- Authentication
- Login / Signup
- Protected Routes
- Blog CRUD
- TinyMCE Editor
- Rich Text Rendering
- Image Upload
- Home Page
- Hero Article
- Post Cards
- Blog Details
- Responsive Layout
- Modern Editorial UI
- Search UI Trigger (no backend implementation)
- Dashboard
- Loading States
- Error Pages

-------------------------------------

# Your Task

Perform a COMPLETE ARCHITECTURAL AUDIT.

Do NOT implement anything yet.

Analyze the ENTIRE project.

For every folder and file:

- Explain its responsibility.
- Explain how data flows.
- Explain backend interactions.
- Explain state management.
- Explain routing.
- Explain Appwrite usage.
- Explain component hierarchy.
- Explain possible extension points.
- Identify reusable code.
- Identify technical debt.
- Identify bottlenecks.
- Identify performance issues.
- Identify security concerns.
- Identify scalability concerns.

I want you to understand the project exactly like a senior engineer joining an existing codebase.

-------------------------------------

# Then Analyze These Features

Evaluate the feasibility of implementing these features inside the EXISTING architecture.

For EACH feature, provide:

1. Overview

2. User Experience

3. Frontend Changes

4. Backend Changes

5. Database Changes

6. Appwrite Changes

7. API Changes

8. State Management Changes

9. New Components

10. Existing Components To Modify

11. Required Hooks

12. Utility Functions

13. Loading States

14. Error Handling

15. Security Considerations

16. Performance Considerations

17. Accessibility Considerations

18. SEO Impact

19. Mobile Considerations

20. Risks

21. Estimated Complexity

22. Estimated Development Time

23. Whether it requires third-party services

24. Whether it can be implemented entirely with Appwrite

25. Priority

-------------------------------------

# Features To Analyze

1.
AI Reading Assistant

Capabilities:
- Summarize article
- Explain paragraph
- Beginner mode
- Generate interview questions
- Generate quiz
- Translate article
- Ask questions about article

-------------------------------------

2.
Semantic AI Search

Natural language search like:

"React performance"

"authentication tutorial"

instead of keyword matching.

-------------------------------------

3.
Command Palette (Ctrl + K)

Capabilities:

Search Posts

Navigate

Create Post

Toggle Theme

Dashboard

Recent Articles

Quick Actions

-------------------------------------

4.
Automatic Table of Contents

Generated from article headings.

Scroll Spy

Active Heading

Smooth Navigation

-------------------------------------

5.
Reading Progress

Progress Bar

Time Remaining

Estimated Reading Time

Reading Completion

-------------------------------------

6.
Offline Reading (PWA)

Installable App

Offline Cached Articles

Offline Assets

Background Sync

-------------------------------------

7.
Draft Auto Save

Debounced Saving

Restore Draft

Conflict Handling

Saving Indicators

-------------------------------------

8.
Author Analytics Dashboard

Views

Reading Time

Completion Rate

Top Articles

Traffic Trends

Bookmarks

-------------------------------------

9.
Rich Code Blocks

Syntax Highlighting

Copy Button

Download Button

Line Numbers

Filename

Highlighted Lines

Language Detection

-------------------------------------

10.
Related Articles Recommendation

Based on:

Tags

Content Similarity

Categories

Author

Reading History

-------------------------------------

# Deliverables

For EACH feature create:

## 1. Architecture Diagram

Describe where it fits.

## 2. Component Tree

New Components

Modified Components

## 3. Folder Structure

Exactly where files should live.

## 4. Backend Impact

Exactly which backend files need changes.

## 5. Database Impact

Collections

Attributes

Indexes

Relationships

## 6. Appwrite Impact

Storage

Functions

Databases

Permissions

Authentication

## 7. API Impact

Existing endpoints

New endpoints

Modified endpoints

## 8. Data Flow

Step-by-step request lifecycle.

## 9. Implementation Order

Smallest safe steps.

## 10. Risks

Potential bugs.

Breaking changes.

Migration concerns.

## 11. Refactoring Opportunities

ONLY if necessary.

Never suggest rewriting working code.

-------------------------------------

# Important Rules

Never replace existing architecture.

Never rewrite components unless required.

Reuse existing hooks.

Reuse existing services.

Reuse existing Redux slices.

Reuse existing Appwrite services.

Keep styling consistent with the current Glitch Blog design.

Maintain backend compatibility.

Do not break existing CRUD operations.

Do not change authentication.

Do not change routing unless necessary.

Do not introduce complexity for the sake of modern patterns.

Prefer incremental improvements over rewrites.

If multiple implementation strategies exist:

- Compare them.
- Explain trade-offs.
- Recommend the most maintainable approach.

-------------------------------------

# Final Deliverable

At the end, produce a master implementation roadmap.

Group features into:

Phase 1 (Quick Wins)

Phase 2 (Core Features)

Phase 3 (Advanced Features)

Phase 4 (AI Features)

Phase 5 (Production Polish)

For each phase include:

- Estimated hours
- Dependencies
- Risk level
- Files affected
- Backend work
- Frontend work
- Testing checklist

Do not write production code yet.

The goal is to completely understand the existing project and produce a professional engineering blueprint before implementation.