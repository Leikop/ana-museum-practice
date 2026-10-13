# ANA Museum (practice project — `ana-practice`)

## Overview
This is a **study exercise**, built to practice the ANA Museum case before the real exam. It is NOT a submission and was built with AI assistance on purpose, as prep material — do not reuse this code as-is for a graded deliverable that forbids AI-assisted development.

### Authorship
Practice repository — not submitted for grading. (On the real exam, this is where you paste your private GitHub repo URL and add your professor as Administrator, per the exam instructions.)

## Tech Stack
Vue 3 (Composition API) + Vite, Pinia, Vue Router, Vue I18n, PrimeVue (Lara preset) + PrimeFlex + PrimeIcons, Axios, json-server.

## Project Structure (DDD-oriented)
```text
src/
  collection/                  # Collection bounded context
    domain/model/              # Collection, HistoricalObject entities
    application/                # collection.store.js (Pinia)
    infrastructure/            # CollectionApi, assemblers (talks to json-server)
    presentation/               # views (Home, New Historical Object Item), components (CollectionSummary)

  coins/                       # Coins bounded context (external API provider)
    domain/model/               # CollectionType, Coin entities
    application/                # coins.store.js (Pinia)
    infrastructure/             # CoinsApi, assemblers (talks to the static gists)

  shared/                      # Cross-context concerns
    infrastructure/             # BaseApi, BaseEndpoint
    presentation/                # Layout (toolbar + sidebar), language switcher, page-not-found
```

## Running
```bash
npm install

# terminal 1 - fake API
cd server && sh start.sh

# terminal 2 - app
npm run dev
```

## Data source
`server/db.json` is the **official file given in the exam attachment**, copied verbatim — nothing invented. It only contains 1 Collection (id 1, size 5) and 2 HistoricalObjects already registered against it. That means out of the box you can verify: Total Price, Available Size (5 − 2 = 3), and that Create gets disabled once size runs out. You will NOT see the "No Historical Object" empty state or the 2-per-column grid with this data alone — add a second Collection by hand in `db.json` (or `POST` one) if you want to exercise those paths too.

## A real bug this data exposed
The HistoricalObject resource field is **`CoinId`** (capital C), not `coinId` — it's written that way both in the exam's text description and in the real `db.json`. The first version of this practice project spread the raw resource straight into the entity (`new HistoricalObject({...resource})`), which silently left `coinId` at 0 because the casing didn't match. Fixed now in `historical-object.assembler.js` with an explicit field-by-field mapping (and a matching `toResourceFromEntity` for the POST direction). Lesson: never trust a spread/rest copy between a resource and an entity when you haven't actually checked the resource's exact casing — always verify field names against the real payload, not against what "should" be there by convention.

## Other judgment calls made while practicing
- **PrimeVue preset**: picked *Lara* as the closest match to money.org's clean, corporate, Bootstrap-like look. On the real exam, open the target site and the four preset demos side by side (colors, border-radius, shadows, typography) before deciding — don't assume Lara is always right.
- **`coinCollectionId` vs `collectionTypeId`** on HistoricalObject: `coinCollectionId` is read as "which Collection this item belongs to" (FK to Collection.id). `collectionTypeId` is read as "which CollectionType the coin options come from" (copied from the parent Collection's `collectionType`, used to query the external coins list). Re-read the statement yourself and confirm this interpretation before building — ambiguous specs are graded on the interpretation you document and justify, not on guessing the professor's intent.
- **Logo.dev**: requires a publishable token for production use; left as an env var (`VITE_LOGO_DEV_TOKEN`) so it fails gracefully without one.
- Conventional Commits, incremental commit history, and the GitHub collaborator step are exam-day requirements — this practice repo wasn't built that way since it isn't being submitted.
