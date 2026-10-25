import type { HighlightItem } from '@/types'
import {
  seatBasedPricingMigrationFlow,
  customerSatisfactionCsatAnalyticsFlow,
  ragKnowledgeCaptureFlow,
  websiteSourcesForAiAnswersFlow,
  aiAssistedEngineeringHarnessFlow,
  customDomainReworkFlow,
  helpdeskImportMadeReliableFlow,
  googleAndMicrosoftContactImportFlow,
  localizationPlatformWithAiTranslationFlow,
  branchesAndSchedulesFlow,
  trialAndFreePlanLimitsFlow,
  reliableOrganizationResetFlow,
  emailEventAttributionFlow,
  rawSqlAndJsonAggregationForHeavyReadsFlow,
  investingInTheHarnessFlow,
  idempotencyEverywhereFlow,
  optimisticUiFlow,
  containedVisibleFailuresFlow,
  singlePassLoopsFlow,
  partialSuccessOverAllOrNothingFlow,
  grandfatheringExistingUnitsFlow,
  downgradesAtRenewalPreviewFirstFlow,
  externalSideEffectsAfterCommitFlow,
  serializeWorkOnSharedResourcesFlow,
  oneStrongMainModelOverManySubagentsFlow,
  suppressionBlocksSendingNotDataFlow,
  secureByDefaultFlow,
} from '@/data/highlightDiagrams'

export const proudOf: HighlightItem[] = [
  {
    title: 'Seat-based pricing migration',
    diagram: seatBasedPricingMigrationFlow,
    detail:
      'Moved two SaaS products from tiered plans to per-seat pricing across the Stripe billing Lambda, the core API and the billing UI. Existing customers kept the units they already had, downgrades were scheduled to the next renewal, and a plan-change preview showed exactly what a change would remove before it applied. Repair scripts then reconciled live Stripe subscriptions and renewal schedules.',
    skills: ['Stripe', 'AWS', 'Node.js', 'GraphQL', 'Next.js'],
  },
  {
    title: 'Customer satisfaction (CSAT) analytics',
    diagram: customerSatisfactionCsatAnalyticsFlow,
    detail:
      'Built customer satisfaction from the ground up: rating, settings and survey modules, encrypted survey links sent when a conversation resolves, and a dashboard of 12+ analytics queries covering score trends against the previous period, rating distribution, survey funnel, agent and group leaderboards, and first-response and resolution times. Aggregation runs in PostgreSQL, verified with smoke tests on seeded data.',
    skills: ['PostgreSQL', 'GraphQL', 'Node.js', 'Sequelize'],
  },
  {
    title: 'RAG knowledge capture',
    diagram: ragKnowledgeCaptureFlow,
    detail:
      'Turned resolved customer conversations across 3+ helpdesk modules into chatbot answers. Gemini structured output through LangChain and Zod extracts PII-free knowledge, pgvector embeddings make it retrievable, and an LLM contradiction check holds conflicting answers for human review before they reach customers.',
    skills: ['LangChain', 'Google Gemini', 'Zod', 'pgvector', 'RAG & Embeddings'],
  },
  {
    title: 'Website sources for AI answers',
    diagram: websiteSourcesForAiAnswersFlow,
    detail:
      'Let customers connect their website as a content source for AI answers: crawled page discovery, per-page include and exclude with optimistic updates, on-demand refresh, and reindex limits with attempt tracking to keep crawling cost bounded.',
    skills: ['Node.js', 'GraphQL', 'Next.js', 'PostgreSQL'],
  },
  {
    title: 'AI-assisted engineering harness',
    diagram: aiAssistedEngineeringHarnessFlow,
    detail:
      'Set up the first AI-agent instructions on the core API repo, covering coding conventions, planning protocols, a smoke-testing agent and skill, test-artifact prompts and a Postgres MCP connection. Work now runs through a multi-agent workflow of planning, developer, QA and adversarial reviewer agents, merging 4+ PRs a day, and every recurring pain point becomes an automation in my toolkit of skills, hooks, MCP servers, CLIs and a custom token-metering mod.',
    skills: ['Claude Code', 'MCP', 'GitHub Copilot'],
  },
  {
    title: 'Custom domain rework',
    diagram: customDomainReworkFlow,
    detail:
      'Reworked custom domains so each customer host gets its own AWS Amplify association, gated by purchased domain slots. Verification runs as a background queue chain with backoff (1 minute, then 15-minute steps, stopping after 48 hours) and pushes status to the UI live over GraphQL subscriptions. Fixed rollback, race and duplicate-check bugs along the way.',
    skills: ['AWS', 'GraphQL', 'Node.js', 'Next.js'],
  },
  {
    title: 'Helpdesk import, made reliable',
    diagram: helpdeskImportMadeReliableFlow,
    detail:
      'Took a failing Zendesk and Help Scout import and made it dependable: fixed mailbox imports that failed for every Help Scout account, replies landing on the wrong records and tickets leaking across brands. Added per-organization queuing, capped retries, stale-import cleanup and a final report of what each row lost, covered by 15 test suites.',
    skills: ['Node.js', 'PostgreSQL', 'Jest', 'Next.js'],
  },
  {
    title: 'Google and Microsoft contact import',
    diagram: googleAndMicrosoftContactImportFlow,
    detail:
      'Added a contacts step to sales onboarding that pulls contacts straight from a connected Google or Microsoft account, so new workspaces start with their real customer list.',
    skills: ['Node.js', 'GraphQL', 'Next.js'],
  },
  {
    title: 'Localization platform with AI translation',
    diagram: localizationPlatformWithAiTranslationFlow,
    detail:
      'Built the localization management service: applications, environments, languages, keys and scoped permissions, a one-click deploy to a downloadable translation bundle, and bulk AI translation on AWS Bedrock with placeholder validation so generated strings never break interpolation.',
    skills: ['AWS', 'Node.js', 'PostgreSQL', 'GraphQL'],
  },
  {
    title: 'Branches and schedules',
    diagram: branchesAndSchedulesFlow,
    detail:
      'Introduced branches as a new layer in the organization hierarchy, with branch-level business hours and schedules, a branch manager role wired through the app, and a backfill for existing organizations.',
    skills: ['Node.js', 'GraphQL', 'Next.js', 'PostgreSQL'],
  },
  {
    title: 'Trial and free-plan limits',
    diagram: trialAndFreePlanLimitsFlow,
    detail:
      'Implemented monthly usage limits for trial and free plans across articles, FAQs, categories, sections and feedback, consolidated into one shared validation path instead of checks scattered per module.',
    skills: ['Node.js', 'Sequelize'],
  },
  {
    title: 'Reliable organization reset',
    diagram: reliableOrganizationResetFlow,
    detail:
      'Hardened the organization reset flow so data is cleared and re-seeded in one transaction, while a failure still records the organization status because that write happens outside the rolled-back transaction.',
    skills: ['Node.js', 'PostgreSQL', 'Sequelize'],
  },
  {
    title: 'Email event attribution',
    diagram: emailEventAttributionFlow,
    detail:
      'Fixed recipient attribution for bounce, complaint, open and delivery events in the email-processing Lambda, so engagement and suppression land on the right contact.',
    skills: ['AWS', 'Node.js'],
  },
]

export const decisions: HighlightItem[] = [
  {
    title: 'Raw SQL and JSON aggregation for heavy reads',
    diagram: rawSqlAndJsonAggregationForHeavyReadsFlow,
    category: 'Technical',
    detail:
      'For analytics-heavy reads I write parameterized raw SQL that aggregates and nests results with json_agg and json_build_object in a single round trip, instead of chaining ORM includes and looping in Node. It costs some readability, so it stays inside well-named helpers and only where the query load justifies it.',
  },
  {
    title: 'Investing in the harness',
    diagram: investingInTheHarnessFlow,
    category: 'Workflow',
    detail:
      'Time spent on agent instructions, skills, hooks and test tooling comes out of feature work today, but it compounds: every later task starts with the context and checks already in place. I automate pain points I have hit more than once, not hypothetical ones.',
  },
  {
    title: 'Idempotency everywhere',
    diagram: idempotencyEverywhereFlow,
    category: 'Architectural',
    detail:
      'Anything that can run twice should be safe to run twice: re-runnable upgrade and repair scripts, background check chains that stand down when a newer one is queued, resumed imports that skip finished work, and stale jobs failed so they can never resume.',
  },
  {
    title: 'Optimistic UI',
    diagram: optimisticUiFlow,
    category: 'Technical',
    detail:
      'When a write is almost always accepted, the UI updates immediately and keeps the previous state to roll back to if the server rejects it. Slow or uncertain operations stream real status over subscriptions instead of pretending.',
  },
  {
    title: 'Contained, visible failures',
    diagram: containedVisibleFailuresFlow,
    category: 'Architectural',
    detail:
      'One bad record should never take down a page or a job. Errors are isolated to the smallest unit, such as a single domain status or a single import row, and are always logged and reported rather than silently swallowed.',
  },
  {
    title: 'Single-pass loops',
    diagram: singlePassLoopsFlow,
    category: 'Technical',
    detail:
      'I reach for a plain for loop when it does the work in one pass with early exits or several conditions, instead of a filter, map, reduce chain that walks the data repeatedly and allocates throwaway arrays. Simple transforms still get map.',
  },
  {
    title: 'Partial success over all-or-nothing',
    diagram: partialSuccessOverAllOrNothingFlow,
    category: 'Product',
    detail:
      'A large import should not fail because one agent is past the seat cap. Rows that cannot land are skipped with a reason, and the import finishes with a grouped report of exactly what was lost.',
  },
  {
    title: 'Grandfathering existing units',
    diagram: grandfatheringExistingUnitsFlow,
    category: 'Product',
    detail:
      'When pricing moved to per-seat, customers kept the units they already had at no extra cost and only new units bill at the new price. It trades some short-term revenue for trust: nobody pays more for something that was included yesterday.',
  },
  {
    title: 'Downgrades at renewal, preview first',
    diagram: downgradesAtRenewalPreviewFirstFlow,
    category: 'Product',
    detail:
      'Upgrades apply immediately, while downgrades and removals are scheduled for the next renewal, and customers see what a change will remove before confirming. More billing state to manage, but no features vanishing mid-cycle.',
  },
  {
    title: 'External side effects after commit',
    diagram: externalSideEffectsAfterCommitFlow,
    category: 'Architectural',
    detail:
      'Deleting a cloud resource, such as an Amplify domain association, runs only after the database transaction commits. A rolled-back update may leave an orphan to clean up, but it can never take a live domain down.',
  },
  {
    title: 'Serialize work on shared resources',
    diagram: serializeWorkOnSharedResourcesFlow,
    category: 'Technical',
    detail:
      'Parallel by default, sequential when operations share a resource: deletes under a shared parent association run one at a time, because in parallel they overwrote each other.',
  },
  {
    title: 'One strong main model over many subagents',
    diagram: oneStrongMainModelOverManySubagentsFlow,
    category: 'Workflow',
    detail:
      'A single capable main session keeps full context, while cheaper subagents start cold, re-read what is already known and hand back lossy summaries, costing more tokens for weaker results. I track this with a token-metering mod I built, and still use subagents for wide, read-only searches.',
  },
  {
    title: 'Suppression blocks sending, not data',
    diagram: suppressionBlocksSendingNotDataFlow,
    category: 'Product',
    detail:
      'A suppressed contact means do not email them, not that they do not exist. Imports still bring in their tickets and replies; only outbound mail is blocked.',
  },
  {
    title: 'Secure by default',
    diagram: secureByDefaultFlow,
    category: 'Technical',
    detail:
      'Short-lived access tokens, provider credentials hidden from non-service callers, parameterized queries, and hosts under our own domains reserved for platform staff. A little friction in exchange for a much smaller blast radius.',
  },
]

