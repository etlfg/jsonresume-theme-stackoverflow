# Agent Instructions (v3 - FINAL DELIVERY)

Welcome! You are working in an isolated feature worktree for the `jsonresume-theme-stackoverflow` project. 

## ⚠️ THE QUALITY STANDARD
"It looks fine" is not a verification. You are required to act as your own harshest critic. You must provide a **Visual Audit** before signaling completion.

## 🛠 Workflow

### 1. Understand the Goal
Read `TODO.md` to understand the exact requirements.

### 2. Development Cycle
- **Edit** $\rightarrow$ **Build** (`npm run build`) $\rightarrow$ **Preview** (`node preview.js`) $\rightarrow$ **Screenshot** (`node screenshot.js`).

### 3. Mandatory Visual Audit (The "Proof")
Before you commit and signal completion, you MUST use `read_image` on `preview-pdf-view.png` and write a **Visual Audit Log** in your thought process:
- **Expected**: "I expect to see a blue background in the header and a FontAwesome briefcase icon next to 'Experience'."
- **Observed**: "In the image, the background is white and the icon is missing." $\rightarrow$ **RESULT: FAIL. Loop back to Edit.**
- **Observed**: "The header is blue, and the briefcase icon is correctly aligned. The duration '(3 years)' is visible and styled in grey." $\rightarrow$ **RESULT: PASS.**

### 4. Quality Gate (Strict)
**Do not signal completion until you have explicitly described the visual evidence in your logs.**

**Completion Criteria:**
- [ ] Feature works exactly as requested in `TODO.md`.
- [ ] **Visual Audit Log** provided (Expected vs. Observed).
- [ ] `preview-pdf-view.png` shows a professional, polished result.
- [ ] No `!important` hacks; used Svelte styles/CSS variables.

## 📦 Wrap-up & Delivery

Once the feature is visually verified and passed the quality gate, you must finalize your work using the following standards:

### 1. Atomic Commits
Do not create one giant "fixed everything" commit. Break your changes into **atomic commits**. Each commit should represent a single logical change (e.g., one commit for the utility function, one for the Svelte component, one for the CSS).

### 2. Conventional Commit Messages
Use the **Conventional Commits** specification for all messages:
- `feat: ...` (new feature)
- `fix: ...` (bug fix)
- `style: ...` (styling changes that don't affect logic)
- `refactor: ...` (code change that neither fixes a bug nor adds a feature)
- `docs: ...` (documentation changes)

*Example: `feat(duration): implement localized date difference calculation`*

### 3. Branch Merging
After committing all changes to your feature branch:
1. Switch to the `master` branch.
2. Merge your feature branch into `master` using a merge commit (do not fast-forward if you want to preserve the feature branch history).
3. Verify that the project still builds and renders correctly on `master`.

## 📂 Key Files
- `TODO.md` / `AGENTS.md`
- `resume.yaml` / `preview.js` / `screenshot.js`
- `preview-pdf-view.png` (The primary source of truth)
