# GTO Sponsorship Manager Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan task by task. Steps use checkboxes for tracking. Do not start implementation, create a repository, or send emails merely because this plan exists.

**Goal:** Build a simple local application for maintaining prospective sponsors, researching their businesses, personalising GTO's approved email, revising drafts, and sending the exact approved messages without manual copy-pasting.

**Architecture:** A Vue browser interface talks to a local Node.js server, which stores contacts, research, draft revisions, approvals, and sending attempts in SQLite. Research and writing use a server-side AI integration; email sending uses a separate Microsoft integration. AI output never authorises sending.

**Tech stack:** Vue 3, TypeScript, Vite, Express, SQLite through `better-sqlite3`, Zod, Vitest, Playwright, and Microsoft MSAL Node. Proposed AI integration: OpenAI Responses API with web search for research and structured output for personalisation. Target Node.js 24 LTS; verify package compatibility and lock dependency versions when implementation starts.

**Spec:** The functional specification, interface design, GTO context, and base email are included in this file so it can be moved to another laptop independently of the website repository.

**Status:** Planning only, 12 October 2026. The user may create the eventual repository on another laptop. This document does not authorise repository creation or implementation now.

## Global constraints

- First version: simple local browser application, one operator, one active 2027 campaign, one sending account.
- Preserve the approved English base email below. French is GTO's usual external language, but translating this campaign is a separate explicit template change.
- Keep local records across application restarts. Internet access is required for research, AI drafting, sign-in, and sending.
- AI may personalise the opening and business relevance; it must not silently rewrite the fixed GTO description, campaign facts, funding purpose, or closing.
- Never invent company facts, audience figures, 2027 events, sponsorship commitments, or recipient addresses.
- All 2026 events are completed. The 2026 sponsor package is historical, not an agreed 2027 offer.
- Omit website visibility from the sponsorship offer. The website link in the signature is allowed.
- Send only after the operator has reviewed and approved a specific draft version and clicked the final send action.
- Source files should generally stay under 300 lines; extract shared UI, utilities, or Vue composables for real reuse and keep responsibilities focused.
- This project is independent of the public GTO website. Do not modify the website to implement this tool.
- Repository code and generic reference documents may be versioned; contacts, research results, personalised drafts, database files, credentials, logs, and backups must be excluded from Git.

## Review focus

1. Business names may match multiple companies: require identity confirmation before using uncertain research. Tested in Task 2.
2. Recipient, sender, subject, body, or campaign changes after approval: reject stale approvals. Tested in Tasks 3, 4, and 6.
3. Double-clicks, repeated HTTP requests, and restarts: preserve the send ledger and prevent duplicate application submissions. Tested in Task 6.
4. Outlook may accept a message even if the client times out: show an unknown outcome and never automatically resend. Tested in Task 6.
5. Accents, commas, duplicate addresses, and spreadsheet formula-like values in CSV: preserve legitimate names, report import errors, and escape exported cells. Tested in Task 1.

## 1. Functional specification

### User journey

1. Add a business name and email address; a website and notes are optional.
2. Select one or more businesses and click **Research**.
3. Inspect each summary and its source links. Resolve ambiguous company matches.
4. Click **Generate draft**. The server combines the approved template with grounded personalisation.
5. Edit the draft or request a revision, such as “make the opening warmer”.
6. Review the recipient, subject, body, sender, and research. Click **Approve draft**.
7. Select approved drafts, review the batch preview, and click **Send approved emails**.
8. View individual outcomes and submission dates. Add new businesses whenever needed.

Each recipient receives an individual email. There is no CC/BCC sponsor batch.
Research, generation, approval, and sending are separate actions. Re-running one
must not silently trigger the others.

### First-version features

- Persistent contact list with add, edit, archive, search, and status filtering.
- CSV import/export with `name,email` as the required columns; optional `website,notes`.
- Business research with a short summary, verified facts, source links, timestamp,
  and an identity state: `matched`, `needs_confirmation`, or `not_found`.
- An editable campaign template and settings: year, funding purpose, signature,
  language, and the benefits GTO is willing to offer.
- Draft generation, manual editing, instructed revision, and visible version history.
- Explicit approval bound to the exact sending account and message content.
- Sending through the connected account and persistent outcome records.
- Settings showing connection state, required setup, and actionable provider errors.
- Local database backup/export and clear instructions for moving laptops.

### Outside the first version

No scheduled or unattended sending, automatic follow-ups, inbox monitoring,
reply generation, shared team access, cloud hosting, desktop packaging,
attachment management, or marketing analytics. “Iteration” in this version
means re-researching or revising drafts. Follow-up emails can be a later feature
with their own approval flow.

### Proposed defaults and unresolved setup choices

- Proposed sender: `gto.luxembourg@hotmail.com`; the user has not confirmed it.
  Confirm the actual sender before configuring the email integration.
- Proposed AI provider: OpenAI API. This is an implementation recommendation,
  not an account connection already available to the application.
- An API key and provider usage budget must be configured on the implementation
  laptop. Keep model IDs configurable and validate that the configured research
  model supports web search and the drafting model supports structured outputs.
- Funding purpose, final 2027 benefits, and signature must be entered before
  generating a complete, sendable draft. Do not guess them from the 2026 package.
- No real sponsor contacts have been supplied. Start with an empty list.

## 2. Simple interface design

Use a practical dashboard with three navigation items: **Sponsors**, **Campaign**,
and **Settings**. Carry over GTO's restrained dark gray surfaces, white text,
and occasional yellow accents. This is an internal tool: omit hero photography,
scroll reveals, decorative effects, and elaborate animations.

### Sponsors screen

```text
GTO Sponsorship Manager          Sponsors | Campaign | Settings
2027 campaign                   Outlook: disconnected

[Search...] [Status: All]                   [+ Add sponsor]
[Research selected] [Generate selected] [Send approved...]

Select | Business       | Email               | Status
[ ]    | Example Garage | contact@example.lu  | Needs research
[ ]    | Example Shop   | info@example.lu     | Draft ready
```

The example rows are illustrative, not seed contacts. Buttons explain why they
are disabled. Bulk operations show progress and per-business errors; successful
results survive a failure on another business.

### Sponsor detail screen

- Contact editor at the top, including optional website and notes.
- Research panel with summary, identity confirmation, source links, and refresh.
- Draft panel with subject and plain-text body fields, version history, and an
  instruction field for **Revise draft**.
- **Approve draft** after the complete email preview; show approval state clearly.
- A submission history panel for the exact messages previously attempted.

Show research beside the draft on wider screens and above it on smaller screens.
Use clear labels, visible keyboard focus, readable source links, and text in
addition to status colours. Avoid a miniature chat interface; one instruction
field and version history are sufficient for iteration.

### Campaign and settings

Campaign contains the fixed template, funding purpose, agreed benefits, signature,
language, and year. Show a preview before saving a new template version.
Settings contains Microsoft connection/disconnection, AI configuration status,
and local backup/export. Never display access tokens or saved API keys.

## 3. Portable GTO context

When creating the future project, write this section into `context/gto.md` and
point its `AGENTS.md` and drafting prompt to that file. The full website reference
can optionally be copied later; it is not required to understand this plan.

- GTO Luxembourg is a community-driven ASBL and a small, passionate group of
  car enthusiasts from Luxembourg, founded in 2017. The supplied team count is eight.
- Slogan: **We share passion!**
- Activities: friendly automotive events, prestige car tours, and photoshoots
  around exceptional cars, mainly supercars, hypercars, and selected sportscars.
- Supercar Sunday is the main annual event: a free, public, family-friendly
  gathering in Mersch. Owners register selected vehicles; visitors attend freely.
- GTO goes Luxembourg is a smaller, more exclusive, free tour through Luxembourg,
  organised depending on the weather. Do not infer a future date.
- All 2026 events are done. No 2027 event dates or special anniversary event are confirmed.
- 2027 marks ten years since founding; do not invent anniversary programming.
- Website: `https://gto-luxembourg.lu`; Instagram: `@gto.lu`;
  Facebook: `GTO Luxembourg`; email: `gto.luxembourg@hotmail.com`.
- The user is vice-president and coordinates communication, sponsors, media,
  and technology, including the website.
- 2026 sponsors: Reinert, Aral Luxembourg, Domaines Vinsmoselle, Alpha Car Services.
  Do not describe them as confirmed 2027 sponsors.
- Historical benefits included social post mentions, appreciation stories,
  sponsor announcements, reel collaborations, poster/flyer logos, event stands,
  tour sticker logos, checkpoint stands, and visibility in event photos.
  These are examples to discuss, not future promises. Website visibility is
  deliberately excluded from this campaign's offer.
- Voice: simple, natural, polite, short, and realistic. Avoid a corporate or
  pushy sales tone and exaggerated claims. Prefer “tour” over “balade automobile”.
- French is the usual external language; English is used for the approved base
  here. Any translation needs an explicitly approved template version.

## 4. Base email and personalisation boundaries

Preserve this email as `templates/sponsorship-2027.en.md` in the future project.
Use explicit variables instead of letting the AI recreate it from memory.

```text
Subject: GTO sponsorship 2027

Dear {{recipient_name}},

{{personalised_opening}}

We’re a Luxembourg non-profit bringing car owners and enthusiasts together since 2017 through friendly automotive events, prestige car tours, and photoshoots around exceptional cars. Our events include Supercar Sunday, our free public gathering in Mersch, and GTO goes Luxembourg, our smaller, more exclusive tour.

2027 marks our tenth anniversary, and we’re inviting businesses to support the year ahead. Your sponsorship would help us {{funding_purpose}}.

In return, we could give {{business_name}} visibility within Luxembourg’s car community through social-media coverage and recognition at our events. We’d be happy to discuss a partnership suited to your business.

Would you be interested in receiving a short overview of the sponsorship options?

Kind regards,
{{sender_name}}
GTO Luxembourg
{{sender_phone}}
https://gto-luxembourg.lu
```

Default opening pattern: “Given {{business_name}}’s {{verified_connection}},
I thought a partnership with GTO Luxembourg could be a good fit.” The AI may
write a more natural opening with the same meaning and one grounded sentence
of business relevance. Keep the fixed paragraphs unchanged by default.

Contact name is optional. If only a business name is known, use
`Dear {{business_name}} team,` rather than inventing a person's name.
The campaign editor can explicitly revise fixed wording or benefits; this creates
a new template version and makes older unsent drafts stale.

No unresolved `{{variables}}`, bracketed instructions, or empty required fields
may reach approval. Preview must show the exact subject and body that will be sent.

Apply the principles of `cold-email`, `marketing-psychology`, and `copy-editing`:
genuine relevance, mutual value, grounded claims, one easy next step, and concise
natural language. Embed these instructions in the prompt; installed coding-agent
skills are not automatically loaded by a standalone application's API calls.

## 5. Architecture and persistent records

Suggested future structure; do not create it in the website repository now:

```text
gto-sponsorship-manager/
  AGENTS.md
  README.md
  .env.example
  .gitignore
  package.json
  context/gto.md
  templates/sponsorship-2027.en.md
  shared/contracts.ts
  client/src/{App.vue,api.ts,styles.css}
  client/src/pages/{SponsorsPage,CampaignPage,SettingsPage,SponsorDetailPage}.vue
  client/src/components/{SponsorTable,DraftEditor,ResearchPanel,SendPreview}.vue
  server/app.ts
  server/db/{database.ts,migrations/001_initial.sql}
  server/contacts/{repository.ts,routes.ts,csv.ts}
  server/campaign/{repository.ts,routes.ts,render.ts}
  server/research/{service.ts,provider.ts,routes.ts}
  server/drafts/{service.ts,routes.ts,approval.ts}
  server/mail/{auth.ts,provider.ts,dispatch.ts,routes.ts}
  tests/{contacts,research,drafts,approval,auth,dispatch}.test.ts
  tests/e2e/workflow.spec.ts
  data/                         # ignored: SQLite, exports, backups
```

SQLite is the source of truth; CSV is an interchange format, not a second
editable database. Use migrations, foreign keys, UUID record IDs, and UTC timestamps.

| Record | Required content |
| --- | --- |
| Contact | ID, business name, original email, normalised email for duplicate checks, optional contact name/website/notes, revision, archived timestamp |
| Campaign | ID, year, language, fixed template, template revision, funding purpose, agreed benefits, sender name/phone, context checksum |
| Research | ID, contact ID/revision, business identity, summary, fact/source references, source titles/URLs, research timestamp, identity state |
| DraftRevision | ID, contact/campaign/research IDs, revision, subject, rendered body, instruction, creation timestamp |
| Approval | ID, draft revision ID, recipient and sender identity, content hash, template/contact/context revisions, approval timestamp, invalidation reason |
| SendAttempt | ID, approval ID, immutable recipient/subject/body/sender snapshot, unique dispatch key, state, timestamps, sanitised provider error |

The current draft is distinct from the immutable submitted-message snapshot.
Archiving a contact preserves history. Changing an email never changes historical
recipients; it invalidates unsent approvals and requires a new reviewed draft.

### Service contracts

Define shared Zod schemas and TypeScript types in `shared/contracts.ts`.

- `createContact(input: ContactInput): Contact`
- `updateContact(id: string, input: ContactInput, expectedRevision: number): Contact`
- `researchContact(contactId: string): Promise<ResearchRecord>`
- `generateDraft(contactId: string): Promise<DraftRevision>`
- `reviseDraft(draftId: string, instruction: string): Promise<DraftRevision>`
- `saveDraftEdit(draftId: string, subject: string, body: string): DraftRevision`
- `approveDraft(draftId: string, senderIdentity: string): Approval`
- `enqueueApproved(approvalIds: string[], batchRequestId: string): SendAttempt[]`
- `dispatchAttempt(attemptId: string): Promise<SendAttempt>`

All edits use revision checks; stale saves return HTTP 409 instead of overwriting
another tab's work. The server, not the UI, validates approval eligibility.

### Provider boundaries

Research provider returns a business summary and actual citation metadata.
Prefer business-owned sources. A second structured extraction step creates
facts whose source IDs must exist in the collected evidence. Keep source links
visible and manually reviewable; a citation is not proof of a correct identity match.

Draft provider returns only `{ personalisedOpening, factIdsUsed }` for generation.
For AI revision, it receives the existing opening and the user's instruction;
fixed template changes are made explicitly in Campaign. The server renders the
remaining body. Save manual draft edits as new versions too.

Treat retrieved pages as data, never instructions. Do not give research or drafting
calls access to the mail provider, credentials, or dispatch functions. Send only
business name, optional public website, relevant evidence, and GTO context to AI;
the email address is filled in locally.

## 6. Email integration and approval semantics

Proposed implementation: Microsoft sign-in with delegated `Mail.Send`, using
MSAL Node and a registered application that supports personal Microsoft accounts.
Use a loopback callback, OAuth state and PKCE, and a server-side token cache.
Keep drafts local; mailbox-reading permission is not needed for the initial workflow.

Use OS-backed encrypted persistence through MSAL Node Extensions where available.
If secure persistence is unavailable, retain tokens in memory and require sign-in
after restarting rather than silently using a plaintext token cache. Keep the AI
key server-side in ignored local configuration with restricted file permissions.
An email password is never collected by this application.

Bind the application to loopback only. Serve the built client and API on one origin;
validate Origin and a per-session CSRF token for mutations, validate Host against
the configured loopback origin, and avoid wildcard CORS. OAuth callbacks validate
their state separately. No credentials go into browser storage or Git.

Approval hash covers the sender identity, recipient, subject, rendered body,
draft revision, template revision, contact revision, and GTO context checksum.
Generation, editing, or relevant configuration changes invalidate previous approval.
Refreshing research marks dependent drafts stale and requires a new review.

At the final send preview, show sender, recipients, subjects, exact bodies, and count.
Clicking **Send approved emails** freezes snapshots and atomically queues attempts.
Enforce a unique dispatch key per approval/message revision in SQLite; repeated
requests return the existing attempts. Disallow another first-contact submission
for a contact already submitted in this campaign.

Attempt states: `queued`, `submitting`, `submitted`, `failed`, `unknown`.

- Submit individually, serially, through Microsoft Graph. No AI call occurs during dispatch.
- Graph `202 Accepted` becomes `submitted`, never “delivered”.
- A definite rejection becomes `failed` with an explanation. Correct the cause
  and explicitly retry; editing content requires a new approval.
- A timeout after submission may have reached Outlook: mark `unknown`, show
  instructions to check Sent Items, and do not automatically retry.
- After restart, `submitting` becomes `unknown`. Queued messages wait for an
  explicit **Resume sending** action; startup itself never sends mail.
- Record manual reconciliation as a separate audit event. Never promise exactly-once
  provider delivery: the ledger prevents local duplicates, but cannot resolve an
  ambiguous external acceptance without reconciliation.

## 7. Implementation tasks

All tasks below are future work. Use mocked AI and mail providers in automated
tests. Commit checkpoints only after the user has created or authorised the new
repository; do not initialise or commit a separate repository during planning.

### Task 1: Persistent contacts, campaign, and runnable local shell

**Files:** Create `package.json`, `.env.example`, `.gitignore`, `README.md`,
`AGENTS.md`, `context/gto.md`, `templates/sponsorship-2027.en.md`,
`shared/contracts.ts`, `server/app.ts`, `server/db/*`, `server/contacts/*`,
`server/campaign/*`, `client/src/App.vue`, and `tests/contacts.test.ts`.

**Interfaces:** Produces the contact/campaign types, repository functions above,
CRUD endpoints under `/api/contacts` and `/api/campaign`, CSV import/export,
and `npm run dev`, `npm run build`, `npm start`, `npm test`, `npm run typecheck`.

- [ ] Write failing tests: `persists_contacts_after_reopen`,
  `rejects_duplicate_email`, `preserves_accented_csv_names`,
  `reports_bad_csv_rows`, `escapes_formula_like_export_cells`,
  `rejects_stale_contact_edit`, and `archives_without_deleting_history`.
  Assert trim/case-insensitive duplicate matching, original email preservation,
  quoted CSV values, row-number errors, and persisted revisions.
- [ ] Run `npx vitest run tests/contacts.test.ts`; verify the missing behaviours fail.
- [ ] Implement migrations, validation, parameterised database access, imports,
  campaign rendering, and the same-origin local server. Seed only the campaign
  and GTO context, with no actual or fake sponsor contacts.
- [ ] Run the same test command and `npm run typecheck`; require passing results.
- [ ] Verify a fresh start shows an empty list, and data survives a restart.
- [ ] Save a future repository checkpoint: `feat: add local campaign and contacts`.

### Task 2: Grounded business research

**Files:** Create `server/research/{provider,service,routes}.ts`,
`tests/research.test.ts`; extend shared research schemas.

**Interfaces:** Consumes contacts; produces `researchContact` and
`POST /api/contacts/:id/research`, research retrieval, and an identity-confirmation endpoint.

- [ ] Write failing tests: `stores_source_links`, `flags_ambiguous_business`,
  `keeps_not_found_unmatched`, `rejects_fact_with_unknown_source`,
  `does_not_use_page_instructions`, and `marks_research_stale_after_identity_edit`.
  Supply fixtures with two similarly named companies and no verifiable match.
- [ ] Run `npx vitest run tests/research.test.ts`; verify failures are meaningful.
- [ ] Implement web-search evidence collection and schema-validated extraction.
  Require identity review for uncertain matches and allow a website hint or
  manual correction with a recorded source. Store each research version.
- [ ] Run the research tests and typecheck; require passing results.
- [ ] Save a future checkpoint: `feat: add sourced sponsor research`.

### Task 3: Template-based drafts and revision history

**Files:** Create `server/drafts/{service,routes}.ts`, `tests/drafts.test.ts`;
extend `server/campaign/render.ts` and shared draft schemas.

**Interfaces:** Consumes contacts, confirmed research, and campaign settings;
produces `generateDraft`, `reviseDraft`, `saveDraftEdit`, draft/history retrieval,
and generation/revision endpoints under `/api/contacts/:id/drafts`.

- [ ] Write failing tests: `preserves_fixed_base_paragraphs`,
  `uses_only_confirmed_fact_ids`, `uses_business_team_when_name_missing`,
  `requires_funding_purpose_and_signature`, `retains_previous_revisions`,
  `rejects_stale_save`, and `omits_website_visibility_offer`.
  Assert that instructed AI revision changes only the personalised opening.
- [ ] Run `npx vitest run tests/drafts.test.ts`; verify the missing behaviours fail.
- [ ] Implement constrained AI output, deterministic rendering, versioned manual
  edits, and an explicit template-save action. Refuse generation from unresolved
  business identity and show what input is needed.
- [ ] Run the draft tests and typecheck; require passing results.
- [ ] Save a future checkpoint: `feat: add personalised draft revisions`.

### Task 4: Simple interface and exact-version approvals

**Files:** Create the pages and components in Section 5,
`client/src/{api.ts,styles.css}`, `server/drafts/approval.ts`,
`tests/approval.test.ts`, and initial `tests/e2e/workflow.spec.ts`.

**Interfaces:** Consumes contact/research/draft endpoints; produces
`approveDraft`, `POST /api/drafts/:id/approve`, and reviewable batch previews.

- [ ] Write failing tests: `rejects_placeholder_draft`,
  `requires_connected_sender`, `invalidates_approval_on_edit`,
  `invalidates_approval_on_recipient_or_template_change`,
  `invalidates_approval_on_research_refresh`, and `rejects_old_tab_approval`.
- [ ] Run `npx vitest run tests/approval.test.ts`; verify meaningful failures.
- [ ] Implement Sponsors, Sponsor detail, Campaign, and Settings as specified.
  Keep archived/submitted history read-only and distinguish approvals from sends.
- [ ] Run approval tests, typecheck, and the mock-provider browser workflow.
- [ ] Inspect desktop and narrow-screen layouts, keyboard access, empty states,
  loading states, and per-contact errors. Use plain textareas for draft editing.
- [ ] Save a future checkpoint: `feat: add review and approval dashboard`.

### Task 5: Microsoft connection and provider adapter

**Files:** Create `server/mail/{auth,provider,routes}.ts`,
`tests/auth.test.ts`; update Settings and setup documentation.

**Interfaces:** Produces connection status, connect/callback/disconnect endpoints,
and `MailProvider.submit(snapshot: MessageSnapshot): Promise<SubmissionResult>`.
The provider cannot select or generate messages. `SubmissionResult` distinguishes
`accepted`, `rejected`, and `unknown` outcomes.

- [ ] Write failing tests: `validates_oauth_state`, `reports_expired_sign_in`,
  `checks_sender_identity`, `does_not_expose_credentials`,
  `disconnect_removes_cached_access`, and `refuses_cross_origin_mutation`.
- [ ] Run `npx vitest run tests/auth.test.ts`; verify meaningful failures.
- [ ] Confirm the sender and target laptop OS; configure a personal-account-capable
  Microsoft app registration, delegated send permission, and protected persistence.
  Supply a memory-only fallback if the OS credential store is unavailable.
- [ ] Implement Graph submission and sanitised errors; a successful HTTP acceptance
  is not a delivery receipt. Keep real sending disabled until dispatch is implemented.
- [ ] Run the auth tests and typecheck; verify real sign-in without sending any mail.
- [ ] Save a future checkpoint: `feat: connect Microsoft sending account`.

### Task 6: Explicit dispatch and durable send ledger

**Files:** Create `server/mail/dispatch.ts`, `tests/dispatch.test.ts`;
extend mail routes and `client/src/components/SendPreview.vue`.

**Interfaces:** Consumes validated approvals and `MailProvider`; produces
`enqueueApproved`, `dispatchAttempt`, batch outcome retrieval, explicit resume,
and manual reconciliation for unknown outcomes.

- [ ] Write failing tests: `sends_only_approved_snapshot`,
  `rejects_sender_change_after_approval`, `deduplicates_double_click`,
  `never_resends_submitted_first_contact`, `records_partial_batch_failure`,
  `timeout_is_unknown_without_retry`, and `restart_does_not_autosend`.
  Assert zero provider calls for stale/unapproved drafts, one call for repeated
  dispatch requests, and no startup call for queued or interrupted attempts.
- [ ] Run `npx vitest run tests/dispatch.test.ts`; verify meaningful failures.
- [ ] Implement atomic snapshot creation, unique dispatch keys, serial submissions,
  persistent transitions, and the final user send action. Show the exact selected
  messages and outcome states without implying delivery.
- [ ] Run dispatch tests, typecheck, and the full browser workflow with mock providers.
- [ ] After explicit user approval, send one clearly labelled test email to an
  address the user controls. Check Sent Items and receipt manually before sponsor use.
- [ ] Save a future checkpoint: `feat: send approved emails with durable history`.

### Task 7: Laptop setup, backups, and final verification

**Files:** Finish `README.md`, `.env.example`, `.gitignore`,
`tests/e2e/workflow.spec.ts`, and backup/export endpoints.

**Interfaces:** Produces documented installation, local startup, provider setup,
backup/download, and restore instructions; preserves all IDs and history when restoring.

- [ ] Add browser tests for add → research → revise → approve → submit using mocks,
  including a failed business alongside a successful one and editing after approval.
- [ ] Add backup/restore verification that contacts, research, revisions, and attempts
  survive transfer while credentials are not included. Use SQLite's backup mechanism
  rather than copying a live database file without its transaction state.
- [ ] Run `npm test`, `npm run typecheck`, `npm run build`, and
  `npx playwright test tests/e2e/workflow.spec.ts`; require passing results.
- [ ] Test setup in a fresh directory on the intended laptop; verify the local server
  binding, disabled send without connection, and required configuration messages.
- [ ] Verify ignored data and credentials cannot enter a normal Git commit.
- [ ] Save a future checkpoint: `docs: document portable setup and verified workflow`.

## 8. Completion criteria

- The user can add a sponsor using only name and email, then supply extra identity
  information only when research needs it.
- Research shows real sources and uncertain matches stay reviewable.
- The approved base remains recognisable and fixed text survives AI revisions.
- Draft history persists and incomplete or stale drafts cannot be approved or sent.
- A final button sends individual approved messages without opening an email composer.
- Submission outcomes persist; ambiguous outcomes are never blindly retried.
- The application runs locally and can be moved to another laptop with its records.
- No real sponsorship mail has been sent without the user's explicit final approval.

## 9. Moving this plan to the other laptop

1. Copy this Markdown file to the other laptop. It includes the required context
   and template, so the website repository is not required.
2. Create the new local/private GitHub repository there when ready. Suggested name:
   `gto-sponsorship-manager`; no repository has been created by this planning task.
3. Give the implementing assistant this file and instruct it to implement Task 1 first,
   continuing through the numbered tasks with verification.
4. Confirm the sender account, laptop OS, AI provider/budget, campaign funding purpose,
   benefits, and signature before the corresponding integration or live sending steps.
5. Configure credentials separately on that laptop. Move records with a local backup,
   not by adding contact data or secrets to the repository.

## 10. Integration references

Recheck these official sources during implementation; authentication and API
capabilities can change. Provider-facing details are proposed, not configured here.

- [OpenAI web search](https://developers.openai.com/api/docs/guides/tools-web-search):
  Responses API research with citation metadata; retain visible source links.
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs):
  validate constrained personalisation output against a schema.
- [Microsoft Graph sendMail](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0):
  personal-account delegated send permission, Sent Items, and the distinction
  between HTTP acceptance and delivery.
- [MSAL Node Extensions](https://learn.microsoft.com/en-us/entra/identity-platform/msal-node-extensions):
  OS-backed token-cache persistence across supported laptop platforms.
