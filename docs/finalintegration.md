# Glitch Blog — AI Author Experience Implementation Guide

## Objective

Complete the **frontend integration** for all AI-powered authoring features already implemented in the backend.

**Important**
- Do **NOT** modify backend logic.
- Do **NOT** regenerate AI prompts.
- Do **NOT** modify API contracts.
- The backend is considered complete.
- The AI service already exists.

---

# Existing Architecture

The project already contains

```
appwrite/
    AI.js
```

Inside this file exists an AI service class (singleton instance).

It already exposes every required author feature.

Examples include

- summarize()
- extractTakeaways()
- continueWriting()
- suggestTitles()
- fixGrammar()

The frontend must consume this service.

DO NOT duplicate API calls.

DO NOT create another AI service.

Everything should go through

```
AIService
```

---

# Current State

Already Implemented

- Backend AI
- AI Routes
- AI Service
- Summarization
- Extract Takeaways
- Reader AI Sidebar
- Axios Integration

Missing

- Continue Writing
- Suggest Titles
- Fix Grammar

Those three features must now be implemented in the frontend.

---

# Overall Goal

The AI should feel like a **professional writing assistant**.

Not a chatbot.

The AI should enhance the editor rather than distract from it.

Think

- Notion AI
- Grammarly
- Ghost AI
- Medium AI

---

# Core Principle

The editor is the primary workspace.

The sidebar is only the trigger.

The generated content should never remain trapped inside the sidebar.

The sidebar should only provide

- Actions
- Status
- Short previews

Actual AI content should open in a dedicated workspace.

---

# Required Features

Implement

## Continue Writing

## Suggest Titles

## Fix Grammar

using the existing AI service.

No backend modifications.

---

# Continue Writing UX

Current editor

↓

User clicks

```
Continue Writing
```

↓

Current article content is sent

↓

AI generates continuation

↓

DO NOT automatically insert into editor.

Instead

Open

```
AI Result Modal
```

The author should review the generated continuation first.

Inside modal

Show

```
Continue Writing

-----------------------------------

Generated Content

-----------------------------------

Buttons

Copy

Insert Below Cursor

Replace Selection

Discard

Regenerate
```

Only after clicking

```
Insert Below Cursor
```

should the content enter TinyMCE.

Never insert automatically.

---

# Suggest Titles UX

User clicks

```
Suggest Titles
```

↓

Generate

8–10 titles.

Open modal.

Display

```
Title Suggestions

○ Title 1

○ Title 2

○ Title 3

...

Copy

Use Title

Regenerate
```

Clicking

```
Use Title
```

updates

```
Title Input
```

Automatically.

---

# Fix Grammar UX

The AI should receive

Current article

↓

Return

Corrected version.

Open modal.

Display

```
Original

-------------------

Corrected

-------------------

Buttons

Replace Entire Content

Copy

Discard

Regenerate
```

Do not overwrite editor automatically.

---

# Reader Sidebar Issue

Current behavior

Summary appears inside sidebar.

This is poor UX.

Instead

Click

```
Summarize
```

↓

Open modal.

Background

```
blur-sm
```

Dark overlay.

Centered modal.

The modal should display

Summary

Formatting preserved.

Buttons

```
Copy

Close

Regenerate
```

Sidebar should only display

```
Summary Ready ✓
```

or

```
No Summary Yet
```

The sidebar should not contain long text anymore.

---

# Extract Takeaways

Exactly the same UX.

Current

Sidebar fills with bullets.

Replace with

Modal.

Layout

```
Key Takeaways

• ...

• ...

• ...

Buttons

Copy

Close
```

---

# Create Generic AI Result Modal

Instead of separate components.

Create

```
components/

AI/

AIResultModal.jsx
```

This component should support

Mode

Summary

Takeaways

Continue Writing

Grammar

Titles

through props.

Reusable.

---

# Modal Behaviour

When opened

Background

```
backdrop-blur-sm

bg-black/50
```

Prevent scrolling.

ESC closes modal.

Click outside closes modal.

Animate

Opacity

Scale

Use Framer Motion.

---

# TinyMCE Integration

The editor should remain the source of truth.

Never mutate editor directly from AI response.

Every AI response requiring insertion should provide explicit buttons

```
Insert

Replace

Copy
```

The editor API should be used only after user confirmation.

---

# Continue Writing Behaviour

Insert

exactly below current cursor position.

Do NOT append to bottom.

Use TinyMCE selection API.

---

# Fix Grammar Behaviour

If text is selected

↓

Only selected text is corrected.

If nothing selected

↓

Entire article.

---

# Loading States

Every AI action

Shows

```
Thinking...
```

Disable buttons.

Prevent duplicate requests.

---

# Error Handling

Handle

Timeout

429

Network failure

Backend unavailable

Invalid response

Display friendly messages.

Never crash UI.

---

# Copy Feature

Every AI response

Must support

```
Copy to Clipboard
```

Show

```
Copied ✓
```

Toast.

---

# Suggested Folder Structure

```
components/

AI/

AIResultModal.jsx

AITitleList.jsx

AISummaryView.jsx

AITakeawayView.jsx

AIGrammarView.jsx

AIContinuationView.jsx
```

Keep modal generic.

Views render inside.

---

# State Management

Avoid creating dozens of useState variables.

Prefer

```
modalOpen

modalType

modalData

loading

error
```

Instead of

summaryOpen

grammarOpen

takeawayOpen

...

---

# Visual Design

Follow existing Glitch Blog design.

White paper aesthetic.

Neo-brutalist.

Sharp borders.

Magenta accent.

Hard shadows.

Responsive.

Dark mode compatible.

No rounded modern SaaS cards.

---

# Accessibility

Modal traps focus.

ESC closes.

Keyboard navigation works.

Buttons accessible.

---

# Performance

Lazy render modal content.

Avoid unnecessary rerenders.

Prevent duplicate API requests.

---

# Final Expected Workflow

Continue Writing

```
Click Button

↓

Loading

↓

Modal

↓

Review

↓

Insert Below Cursor
```

Summary

```
Click

↓

Loading

↓

Modal

↓

Copy
```

Takeaways

```
Click

↓

Loading

↓

Modal

↓

Copy
```

Grammar

```
Click

↓

Loading

↓

Modal

↓

Replace Selection
```

Titles

```
Click

↓

Loading

↓

Modal

↓

Choose Title

↓

Title Field Updated
```

---

# Deliverables

Implement

- Continue Writing
- Suggest Titles
- Fix Grammar

using the existing AI service.

Replace sidebar rendering of

- Summary
- Takeaways

with a reusable modal system.

Do not modify backend.

Do not change AI prompts.

Do not create duplicate API layers.

The final experience should resemble a professional AI writing assistant integrated into the editor rather than a traditional chatbot.