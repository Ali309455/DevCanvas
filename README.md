<<<<<<< HEAD
# Dev Canvas

**Dev Canvas is a modern AI-assisted publishing platform built with React, Node.js, Express.js, and Appwrite.** It began as a simple blog project and gradually evolved into a full-stack editorial workspace with rich text authoring, real-time AI writing assistance, reading enhancements, authentication, and a scalable backend architecture.

---

## The Journey

This project did not begin as a polished product. It started as an experiment: *Can I build a developer-focused publishing platform that feels as intentional as Medium or Hashnode while integrating AI in a way that genuinely helps writers rather than distracting them?*

As the project grew, so did the scope. What started as a CRUD blog became a platform that combines content management, authentication, editorial UX, AI-assisted writing, and production-oriented architecture decisions.

I rebuilt parts of the UI multiple times, moved from a basic blog layout to a neo-brutalist editorial design, integrated Appwrite for authentication and file storage, and later added a dedicated Node.js and Express AI layer powered by Gemini.

The result is **Dev Canvas** — a platform designed around the writing experience.

---

## What Dev Canvas Can Do

### Authentication & User Management

* Email/password authentication
* Google OAuth integration
* Protected routes
* Session management
* Role-aware UI

### Rich Authoring Experience

* TinyMCE-based rich text editor
* Auto-generated slugs
* Draft auto-save
* Featured image uploads
* Category and status management
* Structured publishing workflow

### AI Writing Assistant

Integrated directly into the editor workflow:

* Summarize article
* Extract key takeaways
* Continue writing from cursor position
* Suggest multiple article titles
* Fix grammar and improve clarity
* Context-aware article assistance

### Reader Experience

* Reading progress bar
* Estimated reading time
* Table of contents with scroll spy
* AI-powered article summary
* AI-generated takeaways
* Responsive editorial layout

### Production Features

* Express REST API architecture
* JWT authentication
* File storage with Appwrite
* Environment-based configuration
* Error handling and loading states
* Reusable component system

---

## Tech Stack

### Frontend

* **React**
* **Vite**
* **React Router**
* **Redux Toolkit**
* **Tailwind CSS**
* **Framer Motion**
* **GSAP**
* **TinyMCE**

### Backend

* **Node.js**
* **Express.js**
* **JWT Authentication**
* **Appwrite SDK**

### AI Layer

* **Google Gemini (gemini-3.5-flash)**
* Custom AI service abstraction
* Prompt-based editorial workflows

### Tooling

* Git & GitHub
* ESLint
* PostCSS
* Vercel deployment

---

## Architecture Overview

```text
React Frontend
       ↓
Express API
       ↓
AI Service Layer
       ↓
Gemini / Appwrite Auth & Storage
```

A key decision was separating the AI logic from the frontend. The React application never talks directly to the AI provider; all AI requests flow through a dedicated backend service layer. This made the system more secure, easier to maintain, and flexible enough to switch providers later.

---

## AI Workflow

One of the most interesting parts of the project was designing the author experience.

Instead of injecting AI text directly into the editor, every AI action opens a review modal where the author can:

* Preview the generated content
* Copy it
* Insert it below the cursor
* Replace selected text
* Regenerate the response
* Discard it

This small UX decision significantly improved the feeling of control and made the AI behave like an assistant rather than an autopilot.

---

## UI Philosophy

I moved away from generic SaaS styling and adopted a **neo-brutalist editorial aesthetic**:

* White paper canvas
* Sharp black borders
* Hard shadows
* Magenta accent highlights
* Minimal gradients
* Strong typography hierarchy

The goal was to create something that feels memorable and intentional, not another template-driven blog.

---

## What I Learned

This project taught me far more than how to build a blog.

### Full-Stack Architecture

* Designing scalable API boundaries
* Separating business logic into services
* Structuring React applications for growth
* Managing state across complex UI flows

### AI Product Thinking

* Prompt engineering for editorial tasks
* Context management
* Streaming vs. non-streaming responses
* Caching AI results
* Building trustworthy AI interactions

### UX & Product Design

* Why review-before-insert matters
* How writers interact with AI differently than chat users
* The importance of preserving focus in an editor
* Designing modals, sidebars, and loading states that do not interrupt writing flow

### Debugging & Resilience

I spent a significant amount of time solving:

* Vite and Tailwind configuration issues
* Framer Motion integration problems
* Deployment inconsistencies on Vercel
* Appwrite auth and storage errors
* JWT expiration edge cases
* Auto-save race conditions
* Responsive layout regressions

Those debugging sessions were some of the most valuable learning moments in the project.

---

## Challenges I’m Proud Of

* Building a reliable draft auto-save system
* Integrating AI into a rich text editor without breaking author control
* Refactoring a large component into a maintainable architecture
* Creating a cohesive design system across light and dark modes
* Shipping a project that combines frontend, backend, authentication, storage, and AI in a single product

---

## Future Improvements

Planned ideas include:

* Real-time collaborative editing
* AI-powered semantic search
* Retrieval-Augmented Generation (RAG) across all posts
* Personalized content recommendations
* Analytics dashboard for authors
* Version history and article diffs
* Offline drafting support

---

## Running the Project Locally

### Clone

```bash
git clone https://github.com/your-username/dev-canvas.git
cd dev-canvas
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the backend with:

```env
JWT_SECRET=
APPWRITE_ENDPOINT=
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
APPWRITE_BUCKET_ID=
GEMINI_API_KEY=
```

---

## Final Reflection

Dev Canvas is the project where I stopped thinking only like a frontend developer and started thinking like a **product engineer**.

I had to consider architecture, security, UX, performance, AI behavior, deployment, and maintainability at the same time. The codebase reflects not just a finished application, but a progression of decisions, experiments, refactors, and lessons learned along the way.

If I were to summarize the project in one sentence:

> **Dev Canvas is a full-stack AI-assisted publishing platform built as a journey from a simple React blog to a production-oriented editorial experience powered by a React frontend, an Express backend, and thoughtful AI-driven author workflows.**
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
>>>>>>> master
