import {
  Database,
  Cloud,
  Radio,
  Gauge,
  Sparkles,
  Mail,
  ShieldCheck,
  Braces,
  GitBranch,
} from 'lucide-react'
import type { MyStuffTopic } from '@/types'

/**
 * "My Stuff" — a curated logbook of engineering concepts picked up on the job,
 * grouped into themed topics. Each topic becomes one card in the carousel.
 *
 * Note `detail` strings may contain `inline code` in backticks; the carousel
 * splits on backticks and renders those segments as styled <code> chips.
 */
export const myStuff: MyStuffTopic[] = [
  {
    id: 'data-queries',
    label: 'Data & Queries',
    title: 'Data & Queries',
    blurb: 'Pushing work down to the database — and parallelising without melting it.',
    icon: Database,
    accent: 'var(--clr-primary)',
    skills: ['PostgreSQL', 'Sequelize', 'Node.js', 'GraphQL'],
    notes: [
      {
        term: '.map + Promise.all, carefully',
        detail:
          'A couple of parallel DB calls are fine, but fanning out N independent queries through `Promise.all` opens N connections at once and can exhaust the pool — at scale it takes the system down. For writes, reach for `bulkCreate` / `bulkUpdate` instead of parallel singles.',
      },
      {
        term: 'INNER vs LEFT JOIN',
        detail:
          'Use an INNER JOIN (`required: true` on a Sequelize `include`) when you only want rows that actually have the association; a LEFT JOIN (`required: false`) keeps the parent row even when the associated record is null.',
      },
      {
        term: 'Push work to the database',
        detail:
          'A complex query at the database level beats pulling rows into the server and looping in memory — that eats RAM and falls over at scale. Collapse the work into one query with JSON aggregation.',
      },
      {
        term: 'Sequelize dataValues',
        detail:
          "Model instances aren't plain objects, so serialisers like GraphQL can't reach nested `dataValues`. `toJSON()` flattens them to plain objects — safe as long as nothing downstream calls `.update()`, `.reload()` or `.destroy()` on the result.",
      },
    ],
  },
  {
    id: 'aws-infra',
    label: 'AWS & Infra',
    title: 'AWS & Infrastructure',
    blurb: 'Domains, certificates, and how a custom URL actually reaches your app.',
    icon: Cloud,
    accent: 'var(--clr-accent-gold)',
    skills: ['AWS', 'Node.js'],
    notes: [
      {
        term: 'DNS record types',
        detail:
          "`A` points to an IPv4 address, `AAAA` to IPv6, and `CNAME` to another domain. CloudFront — AWS's CDN — is hundreds of edge servers with no fixed IP, so you point a domain at it with a `CNAME`, never a hard-coded `A` record.",
      },
      {
        term: 'Custom domain flow (Amplify)',
        detail:
          '`CreateDomainAssociationCommand` registers the domain; `GetDomainAssociationCommand` returns two CNAMEs (certificate verification + subdomain). You add them at the registrar (GoDaddy/Cloudflare), DNS propagates, ACM detects the verification record, issues the SSL cert, and CloudFront gets linked.',
      },
      {
        term: 'ACM vs CloudFront',
        detail:
          'ACM issues the SSL/HTTPS certificate — the padlock and the security. CloudFront serves the actual app to visitors worldwide and resolves the right edge IP every time.',
      },
      {
        term: 'Background jobs',
        detail:
          "Long-running work belongs off the request path — independently-deployed Lambda workers fed by SQS, running scheduled and queue-triggered jobs — so the core API stays responsive and failed jobs retry safely instead of blocking a user's request.",
      },
      {
        term: 'Multi-tenant SaaS',
        detail:
          'One application serving many customers, each fully isolated from the others — the tenancy model behind the SaaS products I worked on.',
      },
    ],
  },
  {
    id: 'realtime-events',
    label: 'Realtime',
    title: 'Realtime & Events',
    blurb: 'Subscriptions, webhooks, and the gotchas of publishing live data.',
    icon: Radio,
    accent: 'var(--clr-accent-purple)',
    skills: ['GraphQL', 'Apollo-GraphQL', 'Node.js'],
    notes: [
      {
        term: 'Subscriptions, webhooks & pub/sub',
        detail:
          'Webhooks, GraphQL subscriptions and pub/sub all push updates outward instead of waiting to be polled — and scope matters: an organisation-wide subscription has a very different blast radius from a localised one.',
      },
      {
        term: 'Publish plain objects only',
        detail:
          "`pubSub.publish()` needs plain JS objects all the way down — even nested fields. Raw model instances won't serialise, so convert before you publish.",
      },
      {
        term: 'Null associations on live events',
        detail:
          'If an association comes back null in a real-time event, either the query never `include`d it, or the instance needs a `reload()` before publishing so the fresh association is attached.',
      },
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    title: 'Performance & Scale',
    blurb: 'Keeping interfaces and APIs fast as the data grows.',
    icon: Gauge,
    accent: 'var(--clr-accent-green)',
    skills: ['React', 'Redis', 'Node.js'],
    notes: [
      {
        term: 'React virtualization',
        detail:
          'When the backend returns a large, unpaginated list, render only the rows currently in view. It slashes DOM nodes and render time on data-heavy screens — worth ~150ms on the heaviest ones.',
      },
      {
        term: 'Throttling vs rate limiting',
        detail:
          'Throttling smooths and slows the flow of requests; rate limiting hard-caps the count within a time window and rejects the overflow. Different tools for different abuse patterns.',
      },
      {
        term: 'Fire-and-forget analytics',
        detail:
          'Sending a PostHog event fire-and-forget adds zero latency — ideal for analytics. Awaiting it guarantees delivery but lets a tracking error block core flow (avoid); a queue guarantees delivery at the cost of extra infrastructure.',
      },
      {
        term: 'Bloom filters',
        detail:
          "A tiny, fast probabilistic 'have I seen this?' check — widely used in caching layers to skip pointless lookups for keys that definitely aren't there.",
      },
    ],
  },
  {
    id: 'ai-llm',
    label: 'AI / LLM',
    title: 'AI / LLM Integration',
    blurb: 'Wiring LLMs into a real backend without losing state.',
    icon: Sparkles,
    accent: 'var(--clr-accent-purple)',
    skills: ['Claude', 'Google Gemini', 'GitHub Copilot'],
    notes: [
      {
        term: 'Checkpointer (LangGraph)',
        detail:
          'A persistent database that stores conversation state. If the server crashes mid-conversation it reloads the last checkpoint and resumes — without re-running tool calls or losing context.',
      },
      {
        term: 'Temperature',
        detail:
          'The model’s creativity dial — low is deterministic, high is wild, and ~0.5 sits balanced in the middle.',
      },
      {
        term: 'Context scoping',
        detail:
          'Feeding the model compressed prompts plus a codebase knowledge graph scopes its context to the relevant nodes instead of whole file trees — markedly better token efficiency.',
      },
    ],
  },
  {
    id: 'email',
    label: 'Email',
    title: 'Email & Deliverability',
    blurb: 'Why your emails land — or bounce.',
    icon: Mail,
    accent: 'var(--clr-accent-gold)',
    skills: ['Node.js'],
    notes: [
      {
        term: 'MIME',
        detail:
          'Multipurpose Internet Mail Extensions — the standard that defines what an email can actually carry beyond plain text.',
      },
      {
        term: 'Links vs file attachments',
        detail:
          "File attachments bloat the email, trip spam filters, and can't be recalled once sent. Download links keep mail light, dodge spam triggers, can expire or require auth, and let you track downloads.",
      },
      {
        term: 'Reputation & bounces',
        detail:
          "Sender reputation decides inbox vs spam. A soft bounce is temporary (mailbox full); a hard bounce is permanent (address doesn't exist) and should be suppressed right away to protect that reputation.",
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    title: 'Security & Auth',
    blurb: 'Trust the server, never the client.',
    icon: ShieldCheck,
    accent: 'var(--clr-accent-red)',
    skills: ['Zod', 'Node.js'],
    notes: [
      {
        term: 'Validate on the server',
        detail:
          'Client-side checks are convenience, not security — they can be impersonated or bypassed. Authorisation has to be enforced on the server, every time.',
      },
      {
        term: 'Least privilege',
        detail:
          "When an event is denied, the fix isn't to open everything up — deny by default and allow only the one specific event that's actually needed.",
      },
      {
        term: 'WAF token',
        detail:
          'The frontend and services attach a WAF token to reach the backend APIs; the Web Application Firewall itself sits at the backend API layer, inspecting traffic before it ever hits the app.',
      },
    ],
  },
  {
    id: 'code-patterns',
    label: 'Code Patterns',
    title: 'Code Patterns',
    blurb: 'Small habits that keep a codebase honest.',
    icon: Braces,
    accent: 'var(--clr-primary)',
    skills: ['TypeScript', 'JavaScript'],
    notes: [
      {
        term: 'No magic strings',
        detail:
          "Don't scatter raw string literals across the codebase — centralise them in objects, enums or user-defined types so the compiler catches a typo instead of production.",
      },
      {
        term: 'Sensible default return types',
        detail:
          'Stay consistent: object → `null`, number → `0`, boolean → an explicit `true`/`false`, array → `[]`. Predictable shapes mean far fewer defensive checks downstream.',
      },
      {
        term: 'null vs undefined vs falsy',
        detail:
          "Know the difference between them, and when `hasOwnProperty` is the correct check rather than a plain truthiness test that `0` or `''` would slip through.",
      },
      {
        term: 'Conditional fields via spread',
        detail:
          "`{ ...(condition && { field: value }) }` adds a key only when it's needed — cleaner than building the object and mutating it afterwards.",
      },
      {
        term: 'for..of vs for..in',
        detail:
          "`for..in` gives you keys, `for..of` gives you values. `for (i in [3,4,5])` → `0,1,2`; `for (v of [3,4,5])` → `3,4,5`.\nOnly `for..of` works with `await` inside the loop, letting you build entries one by one before a single bulk insert — `.forEach` and `for..in` can't pause per item: \n`for (const id of ids) { const row = await fetchUser(id); rows.push(row); } await db.insertMany(rows);`",
      },
      {
        term: 'ES6 Symbol()',
        detail:
          "`Symbol()` mints a unique, immutable value every call — `Symbol('id') !== Symbol('id')`. Solves naming collisions and lets you attach \"invisible,\" collision-proof metadata to objects: symbol keys are skipped by `for..in`, `Object.keys` and `JSON.stringify`, so `obj[mySym] = 'meta'` won't clash with other libs or leak into serialisation.",
      },
    ],
  },
  {
    id: 'devops-ci',
    label: 'DevOps & CI',
    title: 'DevOps & CI/CD',
    blurb: 'Hooks, pipelines, and reading the build.',
    icon: GitBranch,
    accent: 'var(--clr-accent-green)',
    skills: ['Git', 'GitHub Actions', 'Docker'],
    notes: [
      {
        term: 'Husky git hooks',
        detail:
          '`pre-commit`, `post-checkout` and friends run scripts at git lifecycle points — lint, type-check, codegen. For service repos, a push goes through cleanly with the AWS SAM CLI and Docker running locally.',
      },
      {
        term: 'CI/CD build states',
        detail:
          'A GitHub Actions run moves through pending → running → success or failed; reading those states at a glance tells you whether to dig into the logs or move on.',
      },
    ],
  },
]

export default myStuff
