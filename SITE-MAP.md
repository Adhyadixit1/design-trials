# Carroll’s Garage local website

## Pages

- `/` — homepage with full-bleed hero, story rail, and service/shop previews.
- `/about-us` — shop identity, values, historical image, service area.
- `/services` — searchable directory of all 34 services from the current site.
- `/services/[slug]` — individual service information and preselected appointment link.
- `/shop` — merchandise collections with filters and price sorting.
- `/products/[slug]` — eight product pages with persistent local cart.
- `/blog` and `/blog/[slug]` — blog directory and three article pages.
- `/contact-us` — contact details, directions, and inquiry preview.
- `/appointment?service=...` — appointment preview with selected service.
- `/reviews` — three complete attributed testimonials from the original homepage.
- `/careers` — existing benefits and an inquiry preview.
- `/financing` — existing provider names and contact route.
- `/pay-invoice` — payment assistance; no payment details collected.

## Homepage content audit

See [HOMEPAGE-CONTENT-AUDIT.md](./HOMEPAGE-CONTENT-AUDIT.md) for the section-by-section comparison and restored content. The homepage now includes the original welcome message, all eight customer conveniences, four-photo gallery, featured services, warranty, full six-step process, financing, complete testimonials, all service areas, three dated blog cards, contact details, and newsletter preview.

## Content provenance and preview boundaries

Reviewed https://carrollsgaragewa.com/ and its About Us, Services, Blog, Contact Us, Reviews and Careers pages on September 7, 2026. The service directory reflects the 34 service names listed there. Detail-page copy is adapted for this new design.

The current blog destinations contain empty or default article bodies. The local article bodies are new draft copy based on those existing topics. Original root-level article URLs redirect to the new `/blog/` destinations, including `/hello-world`.

Contact, appointment and careers forms are explicitly local previews and do not send or store submissions. The current source site’s Pay Invoice button has no configured portal URL, so the local page directs customers to the shop for assistance. Financing terms and current job openings should be confirmed with the business.

Merchandise, fit specifications and prices remain sample content. Checkout is a preview without payment processing. Cart state is stored locally in the browser.

## Local-only policy

Use http://localhost:3000. No deployment or hosting is authorized.
