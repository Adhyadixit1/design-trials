# Mobile content interaction pass

September 8, 2026. Changes apply at widths up to 700px; desktop grids and full prose remain available.

| Content area | Mobile treatment |
| --- | --- |
| Homepage hero | Preserved 3:2 frame; trust content is in a separate section immediately below it |
| Four trust points | Native swipe carousel with next/previous buttons, position indicator, and dots |
| Welcome / service introduction / merchandise introduction | Short visible headings and expandable supporting copy |
| Featured services / six repair stages | One card at a time with swipe and keyboard navigation |
| Shop history / financing explanation | Expandable supporting text; primary contact and navigation links remain visible |
| Testimonials | Swipeable cards on homepage and Reviews page; complete quotations retained |
| Service areas | Expandable community lists on homepage, About, and Contact pages |
| Homepage blog | Swipeable article cards instead of three vertically stacked previews |
| Homepage appointment form | Open-on-demand form; direct call/book actions remain available |
| About values / career benefits / financing options | Mobile card rails; original desktop grids retained |
| Service directory / Blog directory | Compact linked rows; detailed information remains on the destination pages |
| Service detail pages | Existing process accordions, expandable visit guidance, swipeable related services |
| Blog article pages | Expandable chapters, with the first chapter initially open |
| Product pages | Expandable design/story copy and swipeable detail cards; sizes, pricing, cart, and existing FAQ stay accessible |

## Interaction safeguards

- No autoplay, automatic advancement, or timers.
- Native horizontal scrolling preserves normal vertical page scrolling.
- Arrow controls, keyboard Arrow/Home/End support, accessible labels, and current-card indicators.
- Reduced-motion preferences respected.
- Disclosures preserve a single copy of the original content and expose their expanded state.
- No publishing, payments, or form integrations added.

## Checks

Next.js production build and TypeScript passed. Changed components passed lint with only the eight pre-existing homepage image warnings. HTTP checks cover the 56 local pages and confirm the trust content is outside the hero. Visual/device interaction testing was not performed.
