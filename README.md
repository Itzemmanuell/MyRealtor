# MyRealtor

A responsive React property catalogue for **sales and rentals**, developed by [Emmanuel Phanuel](https://github.com/Itzemmanuel). Restored from the original MyRealtor project, with its existing logo and property photography.

## Run locally

Use Node.js **24 LTS** (Node 22.12+ is also supported).

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. Dependencies have already been installed in this workspace. On another computer or in CI, use `npm ci` to install the exact versions in `package-lock.json`.

```sh
npm run check       # lint, 38 automated checks, and production build
npm run build       # output: dist/
npm run preview     # serve the production build locally
npm run test:watch  # component and logic tests during development
```

The local dev and preview servers include the same enquiry handler used on Vercel. Without email credentials, the form displays an unavailable message and provides a working direct-email link.

## What's included

- Buy/rent selection with separate sale-price and monthly-rent ranges in USD.
- Combinable location, property type, and price filters, stable dropdown choices, result counts, and reset/empty states.
- Property details, agent-specific listing pages, help, contact, privacy information, and missing-page handling.
- Flexible page heights, consistent gutters, one/two/three-column property layouts, a tablet search layout, and a proportioned desktop contact sidebar.
- Keyboard-operable native selects, visible focus indicators, a skip link, labelled forms, descriptive images, reduced-motion support, and lazy-loaded listing images.
- Enquiry validation on both client and server, delivery/error feedback, direct-email fallback, and an optional real phone link.
- Vercel SPA routing so property pages work when opened directly or refreshed.
- A footer with **Developed by Emmanuel Phanuel** linking to GitHub.

## Configure enquiry email

Enquiries are addressed to **itzemmanuelmurye@gmail.com**. This address is defined in `shared/contact.js`; visitors cannot override the recipient.

1. Create a [Resend API key](https://resend.com/docs/dashboard/api-keys/introduction) and verify a sender domain in Resend.
2. Copy `.env.example` to `.env.local` for local use, or add these values in your Vercel project's environment variables:

```dotenv
RESEND_API_KEY=your_server_only_resend_key
CONTACT_FROM_EMAIL=MyRealtor <enquiries@your-verified-domain.com>
```

3. Restart the local server, or redeploy on Vercel after changing deployment variables.
4. Optionally set `VITE_CONTACT_PHONE` to your real international phone number to display **Call Emmanuel**. The original fake agent phone numbers have been removed.

`CONTACT_FROM_EMAIL` must be a sender allowed by your Resend account. The Gmail inbox is the **recipient**, not the verified sender. Never prefix either email-service secret with `VITE_`, and never commit `.env.local`.

The form submits to `POST /api/contact`. The server sends plain-text email through Resend with the visitor's email as `reply_to`, and reports success only after the provider accepts it. An idempotency key prevents duplicate delivery of identical enquiries within Resend's idempotency window. Provider acceptance does not guarantee inbox delivery.

Basic abuse controls include same-origin validation, a hidden honeypot, body/field limits, and a three-attempts-per-minute limit per request address per running server instance. The in-memory limit is not a global distributed limit; configure a hosting firewall rate-limit rule for `/api/contact` when using the form publicly at scale. No database is needed. Tests mock all delivery requests and never send real email.

## Publish the code to GitHub

This folder is a checkout of `https://github.com/Itzemmanuel/MyRealtor.git`. The changes are local and uncommitted; no push or deployment has been performed.

Review the changes, then run:

```sh
git status
git add .
git commit -m "Improve property search, responsive layouts, and enquiries"
git push origin main
```

If the remote changed while you were working, reconcile the changes before pushing. Do not force-push. `node_modules`, `dist`, local secrets, and test coverage output are ignored. Commit the lockfile and `.env.example`.

## Deploy on Vercel

Import the GitHub repository into Vercel, or push to the repository already connected to the original deployment.

- Framework preset: **Vite**
- Node version: **24.x**
- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Add the email environment variables above to enable online enquiries.

`vercel.json` rewrites application URLs to `index.html` while preserving `/api/` and `/assets/`. Vercel runs `api/contact.js` as a server function; do not deploy only the `dist` directory if you need the email API. The project is prepared for Vercel, not GitHub Pages, which cannot run this server function without a separate backend.

References: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Resend email API](https://resend.com/docs/api-reference/emails/send-email).

## Content and maintenance

- `shared/listings.js`: 18 demonstration properties; sale or rent, price, description, address, and sample agent information. Rental prices added during this update are illustrative monthly USD amounts.
- `src/Data.jsx`: connects the property records to the original bundled images.
- `src/lib/search.js`: filters, price ranges, formatting, and property ID validation.
- `src/index.css`: shared styling and responsive rules.
- `api/contact.js`: server-only enquiry delivery.
- `shared/contact.js`: recipient and shared validation.

All property and agent information remains **sample content**, clearly labelled in the site. Replace it with verified listing data and review the published site/privacy information before operating a real estate service. Login/signup controls were removed because there is no account feature; no fake authentication was added.

## Validation

`npm run check` covers filter boundaries, combinations and reset behavior, sales/rentals switching, navigation and agent listings, invalid URLs, enquiry input validation, mocked email delivery and failures, recipient enforcement, and basic abuse controls. GitHub Actions runs this command on pushes and pull requests.

Browser layout validation still needs a connected browser. The implementation includes responsive breakpoints, but automated component tests use jsdom, which does not perform real layout. Before publishing, inspect widths **320, 375, 390, 640, 768, 1024, 1280, and 1440px**, plus landscape and 200% text/zoom. Check for horizontal scrolling, overlapping text, usable search controls, and readable forms. Live Vercel routing and real email delivery should be verified after deployment.
