# EstateFlow CRM — architecture and integration roadmap

## Current scope

Vite/React SPA + local `DemoDataContext` + fictional seed data + client-side demo persistence.

No server, live external APIs, sending, authentication, or AI agents are active.

## Production separation

```
Buyer/Investor Web App       Internal CRM Web App
          \                      /
           \  HTTPS session     /
          Express API / service layer
           |          |          |
      MongoDB      Redis/BullMQ    Object store
           |          |
           |       Jobs/retries
           |          |
      Audit trail   Meta / Google / WhatsApp / portals
           |
      Reporting views / attribution
```

## Model entities

- User, Role, Team, AssignmentRule
- Project, Unit, UnitAvailabilityEvent, Reservation
- Lead, Contact, LeadSource, CampaignAttribution, ConsentEvent
- Activity, Task, SiteVisit, Booking, DocumentMetadata
- WorkflowDefinition, WorkflowRun, OutboxEvent, IntegrationConnection, WebhookInbox

## Proposed API contracts

| HTTP | Path | Purpose |
|---|---|---|
| GET/POST | `/api/leads` | Paginated list and create |
| GET/PATCH/DELETE | `/api/leads/:id` | Lead detail and mutations |
| POST | `/api/leads/:id/notes` | Append activity/note |
| POST | `/api/leads/:id/assign` | Audited reassign |
| GET/POST | `/api/tasks` | Follow-up work |
| GET/POST | `/api/visits` | Visit appointment records |
| GET | `/api/projects` | Project catalogue |
| GET/PATCH | `/api/units` | Inventory status |
| POST | `/api/units/:id/hold` | Atomic server-side hold with expiry |
| POST | `/api/units/:id/release` | Release hold |
| GET/POST | `/api/workflows` | Definitions |
| GET | `/api/analytics/overview` | Authorised KPI data |
| POST | `/api/integrations/meta/webhook` | Verify and ingest Meta event |
| POST | `/api/integrations/google/lead` | Verify and ingest eligible Google Ads leads |

## Attribution rules

Store source, platform, campaign ID/name, ad ID/name, form ID, click identifiers as permitted, project interest, consent context, and ingestion event IDs. Track first and most recent touch separately. Deduplicate on normalised contact fields, not solely on name, and provide merge/reconciliation. Keep raw webhook inbox events and processed outcome audit for replay, with secrets on server only.

## Real assignment engine

Configurable rules for location, project, product, ticket size, agent availability, assigned workload, shift, permissions, fairness and SLA. Assignment events must be durable, idempotent, reversible with history, and protected from concurrent races.

## Assistant separation

- Public property advisor: reads only published approved property and article content; can submit opt-in enquiries. No private CRM or personal lead history is queryable.
- Employee assistant: scoped to authenticated permissions; references authorised leads, inventory and team KPIs; offers explainable recommended actions with links back to records; changing a lead or contacting a buyer requires explicit confirmation.
- Knowledge retrieval must filter by document ownership/access level before retrieval and avoid leaking information across organisations.

## Launch blockers before real data

Server authentication and RBAC, tenancy boundaries if multi-company, encrypted secrets, verified webhook signatures, privacy/consent notices, retention rules, audit logging, rate limits, backups, observability, concurrency-safe unit status, job retries and compliant data processing. Test with staging accounts and fake data before connecting production ads.
