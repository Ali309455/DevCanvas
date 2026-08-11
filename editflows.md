# Edit Flow — Post Editing, Auto-Save & Update

This document describes how editing a post works in this app
(`src/pages/EditPost.jsx`, `src/components/Post/PostForm.jsx` and
`src/components/Post/PublishPanel.jsx`) and the most likely reasons why
**author name**, **title**, **category** or **status** edits do not persist.

## 1. The Edit Flow

### Route
`/edit-post/:slug` → `EditPost` (`src/pages/EditPost.jsx`)

1. `EditPost` reads `slug` from the URL.
2. It calls `dbservice.getPost(slug)`. If the post is not found by slug it
   falls back to `getPostById(slug)` (drafts can be opened by raw document id,
   e.g. from `Post.jsx`'s `to={'/edit-post/${post.slug || post.$id}'}`).
3. On success it renders `<PostForm post={post} />`.

### PostForm (all edits happen here)

A single `PostForm` serves **both** "Add new post" (`AddPost`) and
"Edit existing post" (`EditPost`) via the `post` prop.

Registered fields and their owning component:

| Field             | Registered by            | Persisted column |
|-------------------|--------------------------|------------------|
| `title`           | `PostHeader`             | `title`          |
| `slug`            | `PostHeader`             | `slug`           |
| `content`         | `EditorSection` → `RTE`  | `content`        |
| `featuredImage`   | `PublishPanel` (file)    | `featuredImage`  |
| `authorName`      | `PublishPanel`           | `authorName`     |
| `publishedDate`   | `PublishPanel` (date)    | `publishedDate`  |
| `category`        | `PublishPanel` (Select)  | `category`       |
| `status`          | `PublishPanel` (Select)  | `status`         |

`defaultValues` (new post): `status: "draft"`, `category: "Other"`,
`publishedDate: today`.

When editing (`post.$id` exists) the form is populated with a `reset()` of the
DB row inside a `useEffect`.

### Two write paths

**A. Auto-save (background, debounced 2 s) — `debouncedAutoSave`**

- A `watch()` subscription fires on changes to
  `title`, `slug`, `content`, `category`, `status`,
  `authorName`, `publishedDate`.
- It marks the form `"Not Saved"`, then after 2 s of no typing calls
  `dbservice.updatePost` (existing row) or `createPost` (first draft of a new
  post).
- For existing rows the URL is rewritten with
  `history.replaceState(..., /edit-post/<slug>)` when the slug changed.
- Payload is built by `prepareDraftPayload(currentValues, false)`.
  It preserves the stored `status`, `publishedDate`, `authorName` and image,
  and **falls back** `authorName` to `userData?.name` when the form value is
  empty.
- Auto-save never navigates and never publishes — on a new post the first
  auto-save stores the document id via `setValue("$id", result.$id)`.

**B. Manual submit — `submit(data)`**

- Triggered by the `Update` button in `PublishPanel`.
- Uploads a new featured image only if the field really holds a `File`
  (guards against the stored image-id string).
- Calls `dbservice.updatePost(targetId, { ...data, featuredImage })`.
- On success navigates to `/post/${result.slug}` (falls back to `/drafts` when
  the slug is empty).
- `result` is falsy on an Appwrite error, in which case nothing happens and no
  error is shown.

### Read path

`/post/:slug` → `Post` (`src/pages/Post.jsx`)

- `getPost(slug)`, renders title, author name, date, category, content.
- `AllPosts` / `Home` lists cache the last fetched rows in the Redux slice
  (`setPostsstore`) — see reasons below.

## 2. Why edits do not show up

### Common failure modes (all fields)

1. **Auto-save race (stale snapshot).**
   `debouncedAutoSave` captures the **form snapshot** when the timer is
   scheduled (`getValues()`). If a save is already in flight, the newest
   snapshot is queued in `pendingValuesRef` and written *afterwards*. If the
   user then clicks `Update`, the pending auto-save can overwrite the values
   that `submit()` just wrote with an older snapshot. Symptom: the change shows
   for a moment, then reverts. This is the single most common cause of
   "title / tab / status changed but not stored".

2. **Appwrite error is swallowed.**
   `updatePost` and `createPost` `catch()` and return `undefined`. Auto-save
   shows `"Failed"` (small text in `PublishPanel`) but the manual submit just
   does nothing on `undefined`. A column-name mismatch, an invalid enum value or
   an expired session all fail here silently. Symptom: "nothing happens".

3. **Cached lists are stale.**
   `AllPosts` fetches posts **only when the store is empty**
   (`storePosts.length === 0`) and dispatches the raw rows into the Redux
   store. After a publish/unpublish or rename, `/all-posts` keeps showing the
   old rows until the store is cleared. Symptom: list unchanged although the
   single post page shows the new values.

4. **`reset()` re-runs.**
   In dev (`StrictMode`) the init `useEffect` runs twice; if editing is
   in progress when `post` identity changes, `reset()` overwrites the form with
   the row values, discarding unsaved edits.

### Field-Specific Reasons

#### Title does not change

1. **Empty title is rejected silently.** `title` has `required: true`. The
   `Input`/`Select` components receive no `error`/`helperText`, so a failed
   validation does not show a message and `submit()` never runs.
2. **Slug reload.** Changing the title regenerates the `slug`
   (`slugTransform`). The post page is addressed by slug, so after saving the
   old URL `/post/<old-slug>` → 404 and the post only shows under the new slug.
   If the DB update that wrote the new slug failed (see *common failure
   modes*), the title still saved but the slug went stale → you open the old
   slug and see the OLD title (same row).
3. **Auto-save overwrite race** (item 1 above) writing an older title back.

#### Author name — never changes

- **Fallback to login account name.** `prepareDraftPayload` does
  `authorName: currentFormValues.authorName || userData?.name`. If the field is
  saved empty, auto-save overwrites the stored value with the signed-in user's
  name — the "changed" name reverts to the account name.
- **Server not an author column.** If the Appwrite table column is not exactly
  `authorName` (or is read-only via permissions), the update fails → revert to
  `undefined`, nothing changes.
- Auto-save or user-navigation before the 2 s debounce / `Update` click.

#### Category — does not change

- **Option mismatch.** The `Select` only offers
  `["Web","App","AI","Data","Coding","Design","Other"]`. If the option you pick
  is not in that list (e.g. an old value that came from the DB) the `<select>`
  shows an arbitrary entry and Appwrite enum validation may reject the update,
  failing like #1.
- The auto-save race writes a stale category afterwards.
- The `Post` related-posts fetch uses `category` for `getRelatedPosts`; if the
  cache is stale you may still see old "related" grouping even though the
  category is updated.

#### Status — does not change

- **Drafts are draft by design.** New posts are always auto-saved as
  `"draft"`; an existing row keeps its own status (`isNew ? draft : status`).
  If you set status to draft and expect it in the *published* list, it won't
  appear (query is `status == "published"`).
- **List caching.** when moving a post to `published`, `/all-posts` still shows
  the cached rows (public). The single-post page reflects it.
- **Submit vs auto-save split:** the **Update button** changes status; if you
  only edit status and navigate away before auto-save/Update, the row keeps the
  old status.
- **Column enum/rejection** — same as category (#2 above).

## 4. Quick debug checklist

- Did auto-save show `Not Saved` → `Saved`? (`PublishPanel` bottom,
  `autoSaveStatus`).
- Has the very last keystroke been 2+ seconds before clicking `Update`
  (stale-snapshot overwrite)?
- Verify the Appwrite row directly (console → database): is the column value
  updated?
- Check the network tab for `updateRow` errors (400 = column/enum/schema).
- Which component shows the old value? Post page vs. `/all-posts` vs. drafts —
  indicates stale Redux cache.
- After editing, use the new slug (title change) or the `$id` fallback URL.

## 5. Suggested hardening (future)

- Make auto-save use a fresh `getValues()` at save time and drop
  `pendingValuesRef` stale snapshots (or cancel a pending timer on submit).
- Surface `updatePost`/`createPost` errors to the user (currently swallowed).
- Refetch `AllPosts` after a publish/status change (`/`), or invalidate the Redux
  slice key after `submit`/`auto-save`.
- Replace fallback `currentFormValues.authorName || userData?.name` with a
  strict "write what the user typed" policy.