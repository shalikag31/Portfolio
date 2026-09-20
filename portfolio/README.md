# Shalika G — Portfolio

A production-quality personal portfolio built with plain HTML, CSS and JavaScript — no build tools, no frameworks, no dependencies.

## File structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── favicon/
│       └── favicon.svg
└── README.md
```

## Run it locally

No build step is required — it's static HTML/CSS/JS. Any of these work:

**Option A — just open the file**
Double-click `index.html`, or open it directly in a browser.

**Option B — local server (recommended, avoids any relative-path quirks)**

With Python 3 installed:
```bash
cd portfolio
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

With Node.js installed:
```bash
cd portfolio
npx serve .
```

With VS Code: install the "Live Server" extension, right-click `index.html`, and choose **Open with Live Server**.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio`).
2. Push the contents of this folder to the repository:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/shalikag31/portfolio.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. GitHub will publish the site at `https://shalikag31.github.io/portfolio/` within a minute or two.

## Deploy to Vercel

1. Push the project to a GitHub repository (see steps above).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project**, select the repository.
4. Framework preset: choose **Other** (it's a static site — no build command or output directory needed).
5. Click **Deploy**. Vercel will give you a live URL immediately.

Alternatively, using the Vercel CLI:
```bash
npm i -g vercel
cd portfolio
vercel
```

## Notes on content accuracy

Every project, skill, timeline entry and personal detail on this site comes directly from information provided for this portfolio or from the public project links listed below. Nothing is invented — no fake statistics, certifications, GitHub metrics or marks are shown anywhere on the site.

- EduProof AI: https://eduproof-tau.vercel.app/
- ExamSphere: https://praveendobby.github.io/online-exam/
- Baker's Hunt: https://bakerhunt.oneapp.dev/
- GitHub: https://github.com/shalikag31
- LinkedIn: https://www.linkedin.com/in/shalika-govindaraj-a00b0037b/

## Contact form behavior

The contact form validates input in the browser (name, valid email, message) and, on successful validation, opens the visitor's email client with a pre-filled message addressed to `shalikag31@gmail.com` via a `mailto:` link. There is no backend, so no message is silently "sent to a server" — the site never claims otherwise.

## Accessibility & performance

- Semantic HTML5 landmarks (`header`, `main`, `nav`, `footer`, `section`) and a logical heading hierarchy.
- Skip-to-content link and visible focus states throughout.
- `prefers-reduced-motion` is respected — animations are disabled for users who request it.
- All interactive elements are keyboard-operable.
- No external JS dependencies; fonts are loaded from Google Fonts with `preconnect` for performance.
