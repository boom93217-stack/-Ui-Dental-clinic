# UI Dental Website — Image Update Instructions

This folder contains the new site photos and exactly where each one goes.
Read this file first, then apply the changes below.

## 1. Home page — Hero section
**Image:** `home-hero.jpeg`

- Use as the full-width hero background image (replace the current animated/frame-based hero visual — no video, no looping frame animation).
- Apply a dark gradient overlay (bottom-to-top, ~40% opacity) behind the headline and CTA buttons for text contrast.
- Fix the heading text: it currently renders as "ConfidenceStartsWithYourSmile" with no spaces. Change it to "Confidence Starts With Your Smile". Check the CSS for the heading class in case there's negative letter-spacing causing the words to merge.
- Move the heading and subtext block slightly upward.
- **Animation:** background image slowly zooms in (scale 1.0 → 1.08) over 15–20 seconds on a continuous loop, using CSS `transform: scale()` with `ease-out` timing — subtle, not distracting. Headline fades up first, subtext ~150ms after, then CTA buttons fade in last with a slight scale-up on hover. No other animation on this page.

## 2. About page — Meet Our Dentist
**Image:** `about-meet-dentist.jpeg`

- Use as the primary image in the "Meet Our Dentist" section, right-aligned or in a rounded card next to the doctor's bio text.
- Portrait orientation, moderate rounded corners, subtle fade-in on scroll.

## 3. Services page — Hero/banner
**Image:** `services-treatment.jpeg`

- Use as the hero/banner image at the top of the Services page, above the services list. Full-width or large feature image.

## 4. Contact / Location page
**Image:** `contact-reception.jpeg`

- Place next to the appointment form or contact details.
- Landscape, contained width, rounded corners matching the site's card style.
- Also on this page: shorten the subtext under "Find Our Clinic" from "Conveniently located with easy parking — come see the space for yourself." to "Conveniently located with easy parking."

## 5. Home page — Final CTA / Trust section
**Image:** `home-final-cta.jpeg`

- Use as the background or side image for the closing "Book Appointment" section near the bottom of the homepage.

## How to use these images

- Use the 5 provided images for their specified sections below — don't substitute them.
- For any other part of the site not covered by these 5 images (icons, backgrounds, decorative elements, additional sections), use your own judgment and existing/stock assets as needed — you don't need an exact photo for everything.
- **Exception: the Home page hero must be exact.** Follow the hero instructions precisely — the exact image (`home-hero.jpeg`), the exact heading text fix, the exact animation (zoom + fade-up), and the exact overlay. Do not change or simplify the hero spec — get it perfect first, since it's the most important section of the site.

## Mobile & performance requirements (apply to every change above)

- **Fully responsive:** every section (hero, about, services, contact, gallery, final CTA) must look correct and properly spaced on mobile, tablet, and desktop — test at common breakpoints (375px, 768px, 1024px, 1440px).
- **Images:** use `object-fit: cover` with proper aspect-ratio containers so photos don't stretch, crop awkwardly, or overflow on small screens. Serve appropriately sized images for mobile (don't load a huge desktop image on a phone).
- **Navigation:** collapse into a clean hamburger/mobile menu on small screens; make sure the "Book Appointment" CTA is still easily reachable on mobile (e.g. sticky button).
- **Animations:** the hero zoom and fade-ins must run smoothly on mobile devices too — no jank, no stutter, no layout shift while animating. If a device/browser can't handle the animation smoothly, gracefully fall back to a static image with no animation rather than a laggy one.
- **No bugs:** after applying changes, check for broken layouts, overlapping text/images, console errors, and any leftover unused code (e.g. remnants of the removed Videos page or the old hero animation) — clean those up fully rather than just hiding them.
- **Touch targets:** buttons and nav links should be large enough and properly spaced for touch (minimum ~44px tap target).

## Other site-wide changes

- **Gallery page hero:** change heading from "Real Patients, Real Transformations" to "Real Smiles, Real Results"; change subtext from "Explore before-and-after results from patients who trusted us with their smiles." to "See real before and after transformations." Move the heading/subtext block slightly upward.
- **Navigation:** remove the "Videos" page and its nav link entirely. Reorder navbar to: Home, About Us, Services, Gallery, Location, Book Appointment. Make sure the active nav link correctly highlights the current page.
- **Site-wide animations:** review all other motion effects across the site — several feel blurry, buggy, or laggy. Smooth out or simplify them for performance; remove any that can't be fixed cleanly. Keep the site otherwise free of heavy animation.
- **Image optimization:** compress/optimize all images for web (WebP where possible), lazy-load anything below the fold, and keep a consistent rounded-corner radius and warm neutral tone across all placements to match the brand.
