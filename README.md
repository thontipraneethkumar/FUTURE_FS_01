# Personal Portfolio Website

A single-page, responsive portfolio site built with plain HTML, CSS, and JavaScript — no framework or build step required. Built for **Future Interns — Full Stack Web Development, Task 1**.

🔗 **Live site:** _add your deployed URL here_
🔗 **Repo:** _add your GitHub repo URL here_

## Sections

- **Home** — intro, role, and primary calls to action
- **About Me** — short bio and a "currently learning" note
- **Skills** — frontend, backend, database, and tooling, grouped
- **Projects** — project cards with tags and links to code / live demo
- **Resume** — timeline of education/experience, quick facts, downloadable PDF
- **Contact** — validated contact form plus direct email / GitHub / LinkedIn links

## Before you publish — edit these

Open `index.html` and search for:

| Placeholder | Replace with |
|---|---|
| `Jordan Avery` / `[Your Name]` | Your name |
| `your.email@example.com` | Your real email |
| `github.com/yourhandle` | Your GitHub profile |
| `linkedin.com/in/yourhandle` | Your LinkedIn profile |
| Project names, descriptions, tags, links | Your real projects |
| `/resume.pdf` | Add your actual resume PDF to the project root with this exact filename |

## Backend setup — making the contact form actually send email

The contact form now posts to a real backend (`/api/contact`), not a third-party form service. It's a small serverless function that validates your message and emails it to you with [Nodemailer](https://nodemailer.com). It works the same way whether you deploy to Vercel or Netlify.

**1. Install the one dependency**

```bash
npm install
```

**2. Get an app password** (recommended: Gmail)
Google Account → Security → 2-Step Verification → App passwords → generate one for "Mail". Don't use your normal Gmail password — it won't work and you shouldn't expose it anyway.

**3. Set environment variables**

Copy `.env.example` to `.env` for local testing, or — for deployment — add the same variables in your hosting provider's dashboard:

- **Vercel:** Project → Settings → Environment Variables
- **Netlify:** Site configuration → Environment variables

| Variable | Value |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` (or your provider's SMTP host) |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | the mailbox sending the email |
| `SMTP_PASS` | the app password from step 2 |
| `CONTACT_TO_EMAIL` | where messages should land (your inbox) |

**4. Redeploy.** Once the env vars are set, submissions on the live site will land in your inbox, with the visitor's email set as "reply-to" so you can just hit reply.

If the env vars aren't set yet, the form will show a clear error instead of silently failing, and the message gets logged server-side so nothing is lost.

### How it's wired

- `api/contact.js` — the function Vercel runs automatically (anything in `/api` becomes an endpoint)
- `netlify/functions/contact.js` — the equivalent for Netlify
- `netlify.toml` — redirects `/api/contact` to the Netlify function, so the **same frontend code works on either host** without changes
- `lib/sendContactEmail.js` — the shared validation + email-sending logic both functions call

## Run locally

No build tools needed for the static site — it's a plain HTML file. The backend, though, needs Node.

```bash
npm install
npx vercel dev      # runs the site + /api/contact locally (recommended)
```

`vercel dev` is the easiest way to test the form end-to-end on your machine before deploying, since it serves both the static site and the serverless function together. If you'd rather not install the Vercel CLI, you can still open `index.html` directly to check layout — the form just won't have anywhere to submit to until it's running through `vercel dev` or deployed.

## Deploy

### Vercel
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Framework preset: **Other** → add the four `SMTP_*` / `CONTACT_TO_EMAIL` environment variables from the Backend setup section above → **Deploy**
4. `api/contact.js` deploys automatically as a serverless function — no extra config needed

### Netlify
1. Push this folder to a GitHub repo
2. Go to [netlify.com](https://www.netlify.com) → **Add new site** → **Import an existing project**
3. Build command blank, publish directory `.` → add the same environment variables → **Deploy site**
4. `netlify.toml` is already set up to detect `netlify/functions/contact.js` and route `/api/contact` to it

Either way you'll get a live `*.vercel.app` or `*.netlify.app` URL with a working contact form in a few minutes. Both also support attaching a custom domain for free if you have one.

## Tech stack

- HTML5 / CSS3 (custom properties, CSS Grid, no framework)
- Vanilla JavaScript (mobile nav toggle, form validation, fetch to backend)
- Node.js serverless functions (Vercel/Netlify) + Nodemailer for the contact form backend
- Google Fonts: Fraunces (display), Work Sans (body), JetBrains Mono (labels/code)

## After deploying

- [ ] Push the code to a public GitHub repo
- [ ] Add the live URL and repo URL to the top of this README
- [ ] Share the live link on LinkedIn
