# Vercel deployment preparation

The site uses standard Next.js for development and production builds. No deployment has been made.

## Import settings

- Root directory: this folder, `carrolls-garage-site` (use `.` if the repository starts here).
- Framework preset: Next.js.
- Node.js: 24.x.
- Install command: `npm ci`.
- Build command: `npm run build`.
- Output directory: leave at the Next.js default; do not use `dist`.
- No application secrets or additional environment variables are required for this design preview.

`vercel.json` supplies the framework, install, and build settings. Metadata uses Vercel's deployment hostname instead of localhost when built on Vercel.

## Local commands

```sh
npm run dev
npm run build
npm start
```

The previous Cloudflare/Vinext preview command is preserved as `npm run dev:legacy`; it is not used for Vercel builds.

## Verification

Checked September 8, 2026 with Next.js 16.3.4 and Node.js 24:

- Production build and TypeScript checks passed.
- All 56 application URLs returned HTTP 200 under the production server.
- Unknown service, article, and product URLs returned 404.
- Legacy article redirects, image optimization, and homepage JavaScript/CSS assets passed HTTP checks.
- `npm audit --omit=dev` reported zero known production vulnerabilities. This does not represent a full application security review or a clean audit of the preserved legacy development tooling.
- No Vercel project was created, linked, or published.

## Before a real business launch

This is deployment-ready design-preview code, not an operational store. Appointment/contact/career/newsletter forms do not send submissions. Cart data is browser-local; checkout does not charge or place orders. Merchandise prices, product specifications, and article bodies include sample/draft content. Connect and approve those systems/content before taking real orders or bookings.

Do not deploy automatically. Publishing still requires an explicit request identifying Vercel as the destination.

Reference: [Vercel Next.js build configuration](https://vercel.com/docs/builds/configure-a-build).
