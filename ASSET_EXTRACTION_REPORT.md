# Asset Extraction Report

## Source Website
- `https://ciinstituteofnursing.com/`

## Favicon + Icon Assets Extracted
- Source link in HTML: `/favicon.ico?favicon.0b3bf435.ico`
  - Download URL used: `https://ciinstituteofnursing.com/favicon.ico?favicon.0b3bf435.ico`
  - Saved as: `public/icons/ciin-favicon.ico`
- Source link in HTML: `/assets/favicon/favicon-16x16.png`
  - Download URL used: `https://ciinstituteofnursing.com/assets/favicon/favicon-16x16.png`
  - Saved as: `public/icons/favicon-16x16.png`
- Source link in HTML: `/assets/favicon/favicon-32x32.png`
  - Download URL used: `https://ciinstituteofnursing.com/assets/favicon/favicon-32x32.png`
  - Saved as: `public/icons/favicon-32x32.png`
- Source link in HTML: `/assets/favicon/apple-touch-icon.png`
  - Download URL used: `https://ciinstituteofnursing.com/assets/favicon/apple-touch-icon.png`
  - Saved as: `public/icons/apple-touch-icon.png`
- Source link in HTML: `/assets/favicon/android-chrome-192x192.png`
  - Download URL used: `https://ciinstituteofnursing.com/assets/favicon/android-chrome-192x192.png`
  - Saved as: `public/icons/android-chrome-192x192.png`
- Source link in HTML: `/assets/favicon/android-chrome-512x512.png`
  - Download URL used: `https://ciinstituteofnursing.com/assets/favicon/android-chrome-512x512.png`
  - Saved as: `public/icons/android-chrome-512x512.png`

## Additional Brand Asset Extracted
- Source URL: `https://ciinstituteofnursing.com/assets/logos/ci-ion-logomark-white.svg`
- Saved as: `public/assets/brand/ci-ion-logomark-white.svg`

## Wiring in Vite App
- `index.html` now references:
  - `/icons/ciin-favicon.ico`
  - `/icons/favicon-16x16.png`
  - `/icons/favicon-32x32.png`
  - `/icons/apple-touch-icon.png`
  - `/icons/site.webmanifest`
- `public/icons/site.webmanifest` references:
  - `/icons/android-chrome-192x192.png`
  - `/icons/android-chrome-512x512.png`
