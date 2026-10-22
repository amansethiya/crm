# EstateFlow CRM
**Every Lead. Every Property. Every Opportunity.**

Enterprise-styled, **frontend-only demonstration** of a real estate CRM, following the supplied project brief. Built with React, Vite, Tailwind CSS, React Router, React Hook Form, Lucide, and Recharts. No sensitive customer data is included.

## Quick start

Requirements: Node.js 20.19+ or 22.12+, npm, Internet access to install packages.

```bash
npm install
npm run check:demo
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

## What's implemented

- Responsive dark sidebar, persistent light workspace, route-aware top bar, search, navigation, and demo in-app notifications.
- Executive dashboard with lead KPIs derived from shared records, acquisition trend and source charts, pipeline mix, activity, team performance, visits and tasks.
- Leads: search, multi-filter, sort, pagination, create/edit/delete with validation, duplicate phone/email detection on creation, detail drawer, notes, history, assignment, follow-up tasks, CSV export.
- Projects: filtered portfolio and directly navigable project detail view.
- Units: filtered availability, details, **local simulated unit hold with status conflict guard**, release hold.
- Pipeline: Kanban stage changes through drag-and-drop and dropdown (keyboard/mobile accessible), updates shared lead state.
- Site visits: schedule/edit visit, set outcome/status, agenda filtering.
- Tasks: create/edit/complete, overdue and upcoming filters.
- Workflow library: enable/disable and edit demo workflows, create a simulated workflow, view configuration and static illustrative logs.
- Contacts derived from leads, team metrics, reporting charts, document metadata viewer, settings, local reset.
- Fictional Indian real estate demo data and locale-aware INR amounts.
- Single versioned localStorage key for demo persistence.

## Explicit limits

**This is not a production CRM.** It does not connect to actual Meta Ads, Google Ads, WhatsApp, property portals, email, calendars, or live property inventories. There are no live backend APIs, authentication, user accounts, secure RBAC, server data, background jobs, AI assistance, file uploads, payment flows, or real reservations. Sample automation counts and documents are metadata demonstrations.

Data stored in `localStorage` is not appropriate for real customer personal data. For production, add server-backed authenticated APIs, server-side RBAC, validation, encryption, consent/compliance controls, audit history, resilient webhooks, deduplication, queues and observability before handling live leads.

## Structure

```
src/
  app/App.jsx                 Route definitions
  components/layout/          Responsive app shell
  components/common/          Shared UI primitives
  context/DemoDataContext.jsx Central demo state and mutations
  data/mock/seed.js           Consistent fictional CRM records
  pages/                      13 functional sections
  utils/format.js             INR/date/CSV helpers
  styles/index.css            Tailwind and design system
```

## Suggested next development milestones

1. Create a separate Express API workspace with a clear endpoint contract, central validation and MongoDB schemas (Lead, Contact, Project, Unit, Visit, Task, Workflow, Activity, User).
2. Add real authentication, invitations and server-side role and record permissions.
3. Migrate mock service calls to Axios API service functions; keep the frontend interfaces unchanged.
4. Add Meta Lead Ads and Google Ads lead-form ingestion through signed/verified webhooks and polling where applicable, with retry/deduplication, campaign ID mapping and audit trails.
5. Create consent-aware communication services and follow-up SLA worker jobs with Redis/BullMQ.
6. Build the public buyer/investor listing portal, member accounts, content/blogs, opt-in enquiry forms and AI assistants with separate permission scopes.
7. Add production analytics based on source/campaign attribution, qualified lead outcomes and eventual bookings.

## Important data notes

The project names, unit configurations, phone numbers, email addresses, values and sales activity are all fictional. The displayed project totals represent illustrative full project sizes; the inventory module contains a **36-unit tracked sample** rather than claiming to cover every unit.

## Known environment limitation during handoff

Dependency installation was not possible in the authoring runtime because the public npm registry could not be reached (DNS `EAI_AGAIN`). The complete application source is supplied for installation in a normal Internet-connected development environment. Do not claim a successful browser test or compiled build until `npm install && npm run build` succeeds there.
