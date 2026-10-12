# Adding events

Edit **`src/data/events.js`**. Add one object to the `events` array for each edition. No component, router, or SEO changes are needed. Save and rebuild/deploy the website as usual.

The page features the nearest upcoming event, shows further upcoming events below it, and sorts completed editions newest first. Undated announcements appear after dated upcoming events. The archive initially shows six editions; “Show more events” reveals six more.

## A past edition

Copy this object and replace the example values:

```js
{
    slug: 'event-name-2025', // Unique URL; keep this stable once published.
    title: 'Event name',
    year: 2025,
    status: 'past', // Use when only the year is known.
    location: 'Luxembourg',
    shortDescription: 'One short sentence about this edition.',
    gallery: []
},
```

Add as many past Supercar Sunday editions and GTO goes Luxembourg tours as you want. Use the actual year and details; an exact date is optional for historical editions.

## Recurring event types

The same file defines shared titles and short descriptions in `eventTypes`. Use `type: 'supercarSunday'` or `type: 'luxembourgTour'` instead of repeating `title` and `shortDescription` on every edition. Optional `edition: '#9'` adds the edition to the title. An individual `title` or `shortDescription` overrides the shared text.

```js
{
    slug: 'gto-goes-luxembourg-2025',
    type: 'luxembourgTour',
    year: 2025,
    status: 'past',
    orderInYear: 1,
    gallery: []
},
```

`orderInYear: 1` places a year-only tour above that year's Supercar Sunday when its exact date is unknown. It controls display order, not the event date. Past events sort by year, then this optional order, then their actual date, newest first. For multiple events with known dates in the same year, omit `orderInYear` to use their dates.

The 2027 Supercar Sunday #9 is an undated announcement. Add its confirmed date, location, and photographs when available.

## Adding photographs

Keep original images in `image-sources/events/`, with one folder per edition. The folder's exact name goes in that event's `imageFolder` field. Originals stay untouched and outside the production website. They are excluded from Git; keep your normal photo backup.

```text
image-sources/events/supercar-sunday-2026/
    DSC07498.jpg
    DSC07546.jpg
```

After adding, replacing, or removing photos, run from the project root:

```sh
npm run images:events
```

This generates WebP previews (up to 800px), covers (up to 1600px), and viewer images (up to 2000px on the longest edge) inside `public/images/events/`. It corrects camera orientation, converts colours to sRGB, strips embedded metadata from the website copies, and never enlarges a smaller source. Busy photos can be resized further to stay within the 100 KB preview, 250 KB cover, and 350 KB viewer budgets.

Unchanged originals reuse their existing outputs. Changed files receive new URLs so browsers won't keep showing an old copy. The command removes obsolete outputs from the previous generated index. Empty folders produce placeholders and no gallery. The generated `src/data/event-images.json` and WebP files should be committed/deployed with the normal site changes; don't edit them directly. Building the website doesn't require the originals or rerun conversion.

## Cover, order, and captions

Edit these fields in the event object in `src/data/events.js`:

```js
imageFolder: 'supercar-sunday-2026',
coverPhoto: 'DSC07498.jpg',
photoOrder: ['DSC07498.jpg', 'DSC07546.jpg'],
photoCaptions: {
    'DSC07498.jpg': 'A blue supercar with its doors open',
    'DSC07546.jpg': 'Visitors and cars at the gathering'
},
```

Use original filenames exactly, including case and spaces. `coverPhoto` chooses the cover; if missing or unavailable, the first gallery photo is used. `photoOrder` puts the listed files first, then appends the remaining photos in natural filename order. `photoCaptions` provides accessible image descriptions. These edits only require saving the data file and the normal rebuild/deploy, since all image versions have already been generated.

If `imageFolder` is omitted, manually supplied `imageSrc`, `imageAlt`, and `gallery: [{ src, thumb, alt }]` still work. `thumb` is optional for legacy images. For new batches, use the original-folder workflow above.

The events grid loads one responsive cover per edition. Detail galleries load small previews near the viewport, and the enlarged viewer downloads the selected larger photo when opened. Original JPEG files are never referenced by the website.

## An upcoming event

Use a new slug per edition. Omit `status: 'past'` and supply the confirmed `startsAt`. Replace all example values, including the date tokens, before adding the entry:

```js
{
    slug: 'event-name-YEAR',
    title: 'Event name',
    year: 2027, // Replace with the actual year.
    startsAt: 'YYYY-MM-DD', // Confirmed date, or timestamp with its UTC offset.
    location: 'Confirmed location',
    shortDescription: 'Two short sentences explaining the event.',
    gallery: []
},
```

For an exact time, use `startsAt: 'YYYY-MM-DDTHH:mm:ss+02:00'` and, preferably, `endsAt` in the same format. Use `+02:00` for Luxembourg summer time and `+01:00` for winter time. With an end time, the event remains in the upcoming section until it ends. A date-only event remains there until the end of that day in Luxembourg. Without an end time, a timed event moves to the archive at its start time.

The displayed date comes from `startsAt`. You can override it with `date: 'Your display text'`. `locationLabel` optionally supplies a short place name for cards while `location` holds the full address.

For a confirmed event whose date hasn't been announced, omit `startsAt`. It appears as an announcement with “Date to be announced”. Do not add a future edition merely because it is usually annual.

## Optional detail-page fields

- `explanation`: a longer description; defaults to `shortDescription`.
- `sourceUrl`: a link to the original Facebook event, shown on the detail page.
- `duration`: readable time information, e.g. `'14:00–17:00'`.
- `faqs`: an array of `{ question: '...', answer: '...' }`.
- `mapQuery`: a confirmed address for the optional, click-to-load Google map.
- `registration`: `{ url: 'https://...', label: 'Register your car' }`; add only while registration is open, and remove when it closes. For Supercar Sunday, clarify in the description or FAQ that public attendance does not require vehicle registration.
- `price`: optional confirmed numeric price for registration structured data; use `0` only if confirmed free.

Past detail pages show a recap and photographs. They hide participation, FAQ, and map sections automatically, even if those fields remain in the record.

The existing 2026 slugs stay unchanged to preserve their published URLs. Use year-specific slugs for new editions, for example `supercar-sunday-2027` once that edition is confirmed.
