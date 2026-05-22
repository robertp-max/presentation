# Asset Extraction Report

## Source
- Brand site: `https://ciinstituteofnursing.com/`
- Brand kit reference: `c:\Users\razer\Documents\CI-ION_Branding.html`

## Favicon — Extracted from Live Site
Source HTML head emits:
- `/favicon.ico?favicon.0b3bf435.ico`
- `/assets/favicon/favicon-16x16.png`
- `/assets/favicon/favicon-32x32.png`
- `/assets/favicon/apple-touch-icon.png`
- `/assets/favicon/android-chrome-192x192.png`
- `/assets/favicon/android-chrome-512x512.png`

Downloaded and saved to:
- `public/icons/ciin-favicon.ico`
- `public/icons/favicon-16x16.png`
- `public/icons/favicon-32x32.png`
- `public/icons/apple-touch-icon.png`
- `public/icons/android-chrome-192x192.png`
- `public/icons/android-chrome-512x512.png`
- `public/icons/site.webmanifest`

Wired into `index.html`:
- `<link rel="icon" type="image/x-icon" href="/icons/ciin-favicon.ico" />`
- `<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />`
- `<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />`
- `<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />`
- `<link rel="manifest" href="/icons/site.webmanifest" />`
- `<meta name="theme-color" content="#8B1515" />`

## Logo Assets
- Primary (light UI): `public/assets/brand/ci-ion-logo-original.svg`
  - Source: `https://ciinstituteofnursing.com/assets/logos/ci-ion-logo-original.svg`
- White logomark (dark UI): `public/assets/brand/ci-ion-logomark-white.svg`
  - Source: `https://ciinstituteofnursing.com/assets/logos/ci-ion-logomark-white.svg`

Used in app top bar (`brand-mark`) and printable footer.

## Brand Tokens (applied)
From the official CI-ION brand kit:
- Primary Maroon: `#8B1515` (print accent / theme-color)
- Accent Gold: `#FFC107` (in-app gold tones use `#f2c14e` / `#ffd472` for dark-mode legibility)
- Pure White / Surface: `#FFFFFF`, `#F8F9FA`
- Text Dark: `#212529`
- Border Gray: `#DEE2E6`

Fonts loaded in `index.html`:
- Montserrat (headings)
- Poppins (alternative heading)
- Open Sans (body)
- Roboto Mono (file names / numeric chips)

## Prepared Files Catalog
Source folder: `C:\AI\CIION\_Hand_Off\`
Mirrored into the served package at `public/handoff/` (31 deliverables). Surfaced in the UI as **Prepared Files** with right-side drawer per group.

## Verification Steps
1. `npm run build` (passes)
2. Open dev server, confirm browser tab shows CI Institute favicon.
3. Confirm Prepared Files page shows 6 group cards; opening any group shows the full file list with download links.
4. Confirm no "handoff" wording in visible UI strings.
