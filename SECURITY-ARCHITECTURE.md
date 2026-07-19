# Secure CMS Architecture for St. Ann

## Decision and boundary

The public school website and staff CMS must be separately deployed applications. The current `admin-cms.html` is a visual prototype only and must not be deployed publicly or treated as an authentication boundary.

The CMS is only for public communications: bulletins, events, newsletters, sermons, and approved public media. It must never store grades, attendance, discipline, health data, financial-aid data, emergency contacts, or other student records. Those remain in approved school systems.

```text
Staff -> School SSO + phishing-resistant MFA -> Private CMS
  -> server-side roles -> review/approval -> audit log
  -> public-content database / quarantined media
  -> one-way publisher -> versioned public snapshot -> Public website/CDN

SIS / student records -------- NO CONNECTION -------- CMS
```

The public site receives only a sanitized, versioned snapshot. It has no database credentials, write endpoint, staff session, or network route to the CMS or SIS.

## Editing experience

- Plain-language forms, live preview, autosaved server-side drafts, scheduling, and revision comparison.
- Sections for Bulletins, Events, Newsletters, Sermons, and Media.
- Workflow: Draft, In review, Approved, Scheduled, Published, Archived.
- Templates, required-field checks, link validation, accessibility prompts, and one-click rollback.

## Identity and authorization

- Use the school's Microsoft 365 or Google Workspace identity provider through OIDC/SAML; do not create CMS passwords.
- Require MFA for every user and phishing-resistant MFA/passkeys for administrators and publishers.
- Authorize every request on the server. Hiding UI is not authorization.
- **Contributor:** own drafts. **Editor:** all public drafts. **Publisher:** approve/publish/rollback. **Administrator:** membership and policy.
- Require two-person approval for urgent alerts, homepage takeovers, and content containing a student's name or recognizable image.
- Disable access through the identity provider offboarding process and review membership quarterly.
- Use short-lived, secure, HTTP-only, same-site sessions and rotate them after privilege changes.

## Regulatory and data isolation

- Classify CMS data as Public or Pre-publication only.
- Block common sensitive fields/patterns and require publisher confirmation for names or student media.
- Keep media consent in the approved system of record; store only a non-sensitive approval reference if needed.
- No advertising trackers, behavioral profiling, or reuse/sale of data.
- Vendor agreements must specify purpose, school control, deletion/return, incident notification, subprocessors, location, retention, and no unauthorized redisclosure.
- Complete school/Diocese counsel and policy review for FERPA, COPPA where applicable, PPRA, North Carolina law, and contractual obligations before launch.

## Storage and publishing

- Use an encrypted managed relational database for structured content, with separate production and staging.
- Use private object storage for media with versioning, type/size allowlists, metadata stripping, and malware scanning.
- Generate an allowlisted JSON/HTML snapshot, sign its manifest, and publish atomically.
- Never ship CMS/database credentials to browsers or the public site.
- Separate accounts/projects, identities, secrets, domains, and deployment pipelines for CMS and public web.
- Deny outbound CMS traffic by default except identity, storage, scanning, logging, and publishing services.

## Security, recovery, and audit

- TLS/HSTS, restrictive CSP/CORS/referrer policy, frame protection, CSRF protection, output encoding, schema validation, parameterized queries, upload verification, and rate limits.
- Append-only audit records for sign-in, failed access, draft reads, edits, approvals, publishing, role changes, exports, and rollback. Record actor, time, action, object, before/after hashes, request ID, and result.
- Alert on repeated failures, privilege changes, bulk exports, unusual publishing, disabled scanning, and logging interruption.
- Encrypt backups, support point-in-time recovery, isolate backup credentials, and test restores quarterly.
- The public site must serve the last known-good snapshot during CMS outages. Every publish must be atomic and reversible.
- Maintain an incident playbook for account compromise, improper disclosure, malicious publication, rollback, evidence preservation, notification assessment, and credential rotation.

## Production gates

1. Select the school identity provider, approved hosting vendor, and data region.
2. Complete privacy/security review and vendor agreement.
3. Build the private API, database, media quarantine, audit store, and one-way publisher.
4. Move the visual editor behind SSO; replace browser storage as the authoritative data store.
5. Test roles, tenant membership, CSRF/XSS/uploads, logs, restore, rollback, and offboarding.
6. Deploy CMS and public site separately and verify the public artifact excludes all admin files.
7. Train staff on public-content classification, student media, phishing, approval, and incident reporting.

Public deployment exclusions include `admin-cms.html`, `admin-newsletter.html`, source maps, environment files, migrations, internal documents, and test fixtures.

This is a security architecture, not legal certification. Final controls and retention periods require school/Diocese legal, privacy, and IT approval.
