# Sachin Chaurasiya — Portfolio

Personal portfolio website for Sachin Chaurasiya, Full-Stack Developer & AI/LLM Engineer.

Static site — vanilla HTML, CSS, and JS (with jQuery for DOM/scroll helpers). No build
step required.

## Structure

```
.
├── index.html              home page (hero, about, skills, education, projects preview,
│                            coding profiles, contact)
├── 404.html                custom not-found page
├── data/
│   ├── skills.json          skills rendered on the home page
│   └── projects.json        project data rendered on home + projects page
├── projects/
│   ├── index.html            full projects listing page
│   ├── projects.css          styles for the projects page
│   └── projects.js           fetches data/projects.json and renders cards
└── assets/
    ├── css/style.css         global styles (home page + shared)
    ├── js/
    │   ├── main.js            home page behaviour: nav, typewriter, skills/projects
    │   │                      rendering, contact form, scroll animations
    │   ├── app.js             particles.js background config
    │   └── particles.min.js   particles.js library
    ├── images/                photos, generated project/education graphics, favicon
    └── files/                 resume PDF
```

## Editing content

- **Skills** — edit `data/skills.json`. Each entry is `{ "name": ..., "icon": <image URL> }`.
- **Projects** — edit `data/projects.json`. Each entry has `name`, `desc`, `image`
  (filename in `assets/images/projects/`, without extension), and `links.view` / `links.code`.
- **Coding profile stats** (LeetCode/GitHub/CodeChef section) — edit the `#coding-profiles`
  section directly in `index.html`.

No HTML changes are needed to add/remove a skill or project — just edit the JSON.

## Running locally

Open `index.html` directly, or serve the folder with any static file server, e.g.:

```
npx serve .
```

Note: project/skill images are referenced with absolute paths (`/assets/images/...`),
so the site is expected to be served from the domain root (this is standard for
GitHub Pages / Netlify / Vercel project deploys).

## Notes

- The contact form opens the visitor's email client with a pre-filled message — no
  third-party form service or API key required.
- The hero "I am into ..." typing effect is a small dependency-free typewriter in
  `assets/js/main.js` (no external typing library).
