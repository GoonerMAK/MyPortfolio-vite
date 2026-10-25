import type { FlowSpec } from '@/components/DeepDive/FlowDiagram'

// One diagram per highlight, keyed by the item's title in highlights.ts.
// Grid: columns 0–2, rows top to bottom; see FlowDiagram for routing rules.
export const highlightDiagrams: Record<string, FlowSpec> = {
  // ── Features built ─────────────────────────────────────────────
  'Seat-based pricing migration': {
    nodes: [
      { id: 'old', label: 'Tiered plans', col: 0, row: 0 },
      { id: 'seat', label: 'Per-seat pricing', col: 1.5, row: 0, tone: 'primary' },
      { id: 'stripe', label: 'Stripe billing\nLambda', col: 0, row: 1 },
      { id: 'api', label: 'Core API', col: 1, row: 1 },
      { id: 'ui', label: 'Billing UI', col: 2, row: 1 },
      { id: 'repair', label: 'Repair scripts', col: 1, row: 2, tone: 'purple' },
      { id: 'live', label: 'Live subscriptions\nreconciled', col: 1, row: 3, tone: 'green' },
    ],
    edges: [
      { from: 'old', to: 'seat', label: 'migrate', tone: 'primary' },
      { from: 'seat', to: 'stripe' },
      { from: 'seat', to: 'api' },
      { from: 'seat', to: 'ui' },
      { from: 'api', to: 'repair', tone: 'purple' },
      { from: 'repair', to: 'live', tone: 'green' },
    ],
    caption: 'One pricing change rolled through three surfaces, then reconciled against live Stripe data.',
  },

  'Customer satisfaction (CSAT) analytics': {
    nodes: [
      { id: 'resolved', label: 'Conversation\nresolved', col: 0, row: 0 },
      { id: 'link', label: 'Encrypted\nsurvey link', col: 1, row: 0, tone: 'purple' },
      { id: 'rating', label: 'Customer rating', col: 2, row: 0, tone: 'primary' },
      { id: 'pg', label: 'PostgreSQL\naggregation', col: 2, row: 1 },
      { id: 'dash', label: 'Dashboard\n12+ queries', col: 1, row: 1, tone: 'primary' },
      { id: 'trend', label: 'Score trends', col: 0, row: 2, tone: 'green' },
      { id: 'board', label: 'Agent\nleaderboards', col: 1, row: 2, tone: 'green' },
      { id: 'time', label: 'Response &\nresolution time', col: 2, row: 2, tone: 'green' },
    ],
    edges: [
      { from: 'resolved', to: 'link' },
      { from: 'link', to: 'rating' },
      { from: 'rating', to: 'pg' },
      { from: 'pg', to: 'dash', tone: 'primary' },
      { from: 'dash', to: 'trend' },
      { from: 'dash', to: 'board' },
      { from: 'dash', to: 'time' },
    ],
  },

  'RAG knowledge capture': {
    nodes: [
      { id: 'conv', label: 'Resolved\nconversations', col: 0, row: 0 },
      { id: 'extract', label: 'Gemini extract\nLangChain + Zod', col: 1, row: 0, tone: 'primary' },
      { id: 'know', label: 'PII-free\nknowledge', col: 2, row: 0 },
      { id: 'embed', label: 'pgvector\nembeddings', col: 2, row: 1, tone: 'purple' },
      { id: 'check', label: 'Contradiction\ncheck', col: 1, row: 1, tone: 'gold' },
      { id: 'bot', label: 'Chatbot answers', col: 0, row: 1, tone: 'green' },
      { id: 'human', label: 'Human review', col: 1, row: 2, tone: 'red' },
    ],
    edges: [
      { from: 'conv', to: 'extract' },
      { from: 'extract', to: 'know', tone: 'primary' },
      { from: 'know', to: 'embed' },
      { from: 'embed', to: 'check' },
      { from: 'check', to: 'bot', label: 'clean', tone: 'green' },
      { from: 'check', to: 'human', label: 'conflict', tone: 'red' },
    ],
  },

  'Website sources for AI answers': {
    nodes: [
      { id: 'site', label: 'Customer website', col: 0, row: 0 },
      { id: 'crawl', label: 'Crawl &\ndiscover pages', col: 1, row: 0, tone: 'primary' },
      { id: 'pages', label: 'Page list', col: 2, row: 0 },
      { id: 'pick', label: 'Include / exclude\n(optimistic)', col: 2, row: 1, tone: 'purple' },
      { id: 'ai', label: 'AI answer\nsources', col: 1, row: 1, tone: 'green' },
      { id: 'refresh', label: 'Refresh on\ndemand', col: 0, row: 1, tone: 'gold' },
    ],
    edges: [
      { from: 'site', to: 'crawl' },
      { from: 'crawl', to: 'pages' },
      { from: 'pages', to: 'pick' },
      { from: 'pick', to: 'ai', tone: 'green' },
      { from: 'refresh', to: 'crawl', label: 'reindex limit', tone: 'gold', dashed: true },
    ],
  },

  'AI-assisted engineering harness': {
    nodes: [
      { id: 'task', label: 'Task', col: 0, row: 0 },
      { id: 'plan', label: 'Planner', col: 1, row: 0, tone: 'primary' },
      { id: 'dev', label: 'Developer', col: 2, row: 0, tone: 'primary' },
      { id: 'qa', label: 'QA agent', col: 2, row: 1, tone: 'primary' },
      { id: 'review', label: 'Adversarial\nreviewer', col: 1, row: 1, tone: 'gold' },
      { id: 'pr', label: 'PR merged\n4+ a day', col: 0, row: 1, tone: 'green' },
      { id: 'pain', label: 'Recurring pain', col: 0, row: 2, tone: 'red' },
      { id: 'auto', label: 'Skill · hook ·\nMCP · CLI', col: 1.5, row: 2, tone: 'purple' },
    ],
    edges: [
      { from: 'task', to: 'plan' },
      { from: 'plan', to: 'dev' },
      { from: 'dev', to: 'qa' },
      { from: 'qa', to: 'review' },
      { from: 'review', to: 'pr', tone: 'green' },
      { from: 'pain', to: 'auto', label: 'becomes', tone: 'purple' },
    ],
    groups: [{ label: 'Agent pipeline', cols: [1, 2], rows: [0, 1], tone: 'primary' }],
  },

  'Custom domain rework': {
    nodes: [
      { id: 'host', label: 'Customer host', col: 0, row: 0 },
      { id: 'slot', label: 'Domain slot\ncheck', col: 1, row: 0, tone: 'gold' },
      { id: 'amplify', label: 'Amplify\nassociation', col: 2, row: 0, tone: 'primary' },
      { id: 'verify', label: 'Verify (queue)', col: 1, row: 1, tone: 'primary' },
      { id: 'ok', label: 'Verified', col: 0, row: 1, tone: 'green' },
      { id: 'retry', label: 'Backoff\n1m, then 15m', col: 2, row: 1, tone: 'gold' },
      { id: 'live', label: 'Live status\n(subscription)', col: 0, row: 2, tone: 'purple' },
      { id: 'stop', label: 'Stop at 48h', col: 2, row: 2, tone: 'red' },
    ],
    edges: [
      { from: 'host', to: 'slot' },
      { from: 'slot', to: 'amplify' },
      { from: 'amplify', to: 'verify' },
      { from: 'verify', to: 'ok', label: 'ok', tone: 'green' },
      { from: 'verify', to: 'retry', label: 'pending', tone: 'gold' },
      { from: 'retry', to: 'verify', tone: 'gold', dashed: true, back: true },
      { from: 'ok', to: 'live', tone: 'purple' },
      { from: 'retry', to: 'stop', tone: 'red' },
    ],
  },

  'Helpdesk import, made reliable': {
    nodes: [
      { id: 'src', label: 'Zendesk /\nHelp Scout', col: 0, row: 0 },
      { id: 'queue', label: 'Per-org queue', col: 1, row: 0, tone: 'primary' },
      { id: 'rows', label: 'Import rows', col: 2, row: 0 },
      { id: 'landed', label: 'Landed on the\nright records', col: 2, row: 1, tone: 'green' },
      { id: 'retry', label: 'Capped retries', col: 1, row: 1, tone: 'gold' },
      { id: 'report', label: 'Per-row loss\nreport', col: 0, row: 1, tone: 'purple' },
      { id: 'stale', label: 'Stale imports\ncleaned up', col: 1, row: 2, tone: 'red' },
    ],
    edges: [
      { from: 'src', to: 'queue' },
      { from: 'queue', to: 'rows' },
      { from: 'rows', to: 'landed', tone: 'green' },
      { from: 'rows', to: 'retry', label: 'error', tone: 'gold' },
      { from: 'retry', to: 'report', label: 'still fails', tone: 'purple' },
      { from: 'retry', to: 'stale', label: 'stuck', tone: 'red', dashed: true },
    ],
    caption: 'Covered by 15 test suites.',
  },

  'Google and Microsoft contact import': {
    nodes: [
      { id: 'onboard', label: 'Sales\nonboarding', col: 0, row: 0 },
      { id: 'step', label: 'Contacts step', col: 1, row: 0, tone: 'primary' },
      { id: 'connect', label: 'Connect Google\nor Microsoft', col: 2, row: 0, tone: 'purple' },
      { id: 'pull', label: 'Pull contacts', col: 2, row: 1 },
      { id: 'ws', label: 'Workspace with\nreal customers', col: 1, row: 1, tone: 'green' },
    ],
    edges: [
      { from: 'onboard', to: 'step' },
      { from: 'step', to: 'connect' },
      { from: 'connect', to: 'pull', label: 'OAuth', tone: 'purple' },
      { from: 'pull', to: 'ws', tone: 'green' },
    ],
  },

  'Localization platform with AI translation': {
    nodes: [
      { id: 'app', label: 'Application', col: 0, row: 0 },
      { id: 'env', label: 'Environments', col: 1, row: 0 },
      { id: 'lang', label: 'Languages\n& keys', col: 2, row: 0 },
      { id: 'bedrock', label: 'Bulk translate\nAWS Bedrock', col: 2, row: 1, tone: 'purple' },
      { id: 'check', label: 'Placeholder\nvalidation', col: 1, row: 1, tone: 'gold' },
      { id: 'deploy', label: 'One-click\nbundle deploy', col: 0, row: 1, tone: 'green' },
      { id: 'reject', label: 'Broken {var}\nrejected', col: 1, row: 2, tone: 'red' },
    ],
    edges: [
      { from: 'app', to: 'env' },
      { from: 'env', to: 'lang' },
      { from: 'lang', to: 'bedrock', tone: 'purple' },
      { from: 'bedrock', to: 'check' },
      { from: 'check', to: 'deploy', label: 'valid', tone: 'green' },
      { from: 'check', to: 'reject', label: 'invalid', tone: 'red' },
    ],
  },

  'Branches and schedules': {
    nodes: [
      { id: 'org', label: 'Organization', col: 1, row: 0 },
      { id: 'backfill', label: 'Backfill for\nexisting orgs', col: 2, row: 0, tone: 'gold' },
      { id: 'branch', label: 'Branch', col: 1, row: 1, tone: 'primary' },
      { id: 'hours', label: 'Business hours', col: 0, row: 2 },
      { id: 'sched', label: 'Schedules', col: 1, row: 2 },
      { id: 'mgr', label: 'Branch manager\nrole', col: 2, row: 2, tone: 'purple' },
    ],
    edges: [
      { from: 'org', to: 'branch', tone: 'primary' },
      { from: 'backfill', to: 'branch', tone: 'gold', dashed: true },
      { from: 'branch', to: 'hours' },
      { from: 'branch', to: 'sched' },
      { from: 'branch', to: 'mgr' },
    ],
  },

  'Trial and free-plan limits': {
    nodes: [
      { id: 'art', label: 'Articles · FAQs', col: 0, row: 0 },
      { id: 'cat', label: 'Categories ·\nsections', col: 1, row: 0 },
      { id: 'fb', label: 'Feedback', col: 2, row: 0 },
      { id: 'check', label: 'One shared\nlimit check', col: 1, row: 1, tone: 'primary' },
      { id: 'ok', label: 'Under limit:\nsave', col: 0, row: 2, tone: 'green' },
      { id: 'no', label: 'Monthly limit\nreached', col: 2, row: 2, tone: 'red' },
    ],
    edges: [
      { from: 'art', to: 'check' },
      { from: 'cat', to: 'check' },
      { from: 'fb', to: 'check' },
      { from: 'check', to: 'ok', tone: 'green' },
      { from: 'check', to: 'no', tone: 'red' },
    ],
  },

  'Reliable organization reset': {
    nodes: [
      { id: 'req', label: 'Reset request', col: 0, row: 0 },
      { id: 'clear', label: 'Clear data', col: 1, row: 0, tone: 'primary' },
      { id: 'seed', label: 'Re-seed', col: 1, row: 1, tone: 'primary' },
      { id: 'commit', label: 'Commit', col: 1, row: 2, tone: 'green' },
      { id: 'rollback', label: 'Roll back', col: 2, row: 0, tone: 'red' },
      { id: 'status', label: 'Status recorded\nas failed', col: 2, row: 1, tone: 'gold' },
    ],
    edges: [
      { from: 'req', to: 'clear' },
      { from: 'clear', to: 'seed' },
      { from: 'seed', to: 'commit', tone: 'green' },
      { from: 'clear', to: 'rollback', label: 'error', tone: 'red' },
      { from: 'rollback', to: 'status', label: 'outside tx', tone: 'gold' },
    ],
    groups: [{ label: 'One transaction', cols: [1, 1], rows: [0, 1], tone: 'primary' }],
  },

  'Email event attribution': {
    nodes: [
      { id: 'ev', label: 'Bounce · open ·\ncomplaint', col: 0, row: 0 },
      { id: 'lambda', label: 'Email Lambda', col: 1, row: 0, tone: 'primary' },
      { id: 'match', label: 'Match recipient', col: 2, row: 0, tone: 'gold' },
      { id: 'contact', label: 'Right contact', col: 2, row: 1, tone: 'green' },
      { id: 'engage', label: 'Engagement', col: 1, row: 2 },
      { id: 'supp', label: 'Suppression', col: 2, row: 2, tone: 'red' },
    ],
    edges: [
      { from: 'ev', to: 'lambda' },
      { from: 'lambda', to: 'match' },
      { from: 'match', to: 'contact', tone: 'green' },
      { from: 'contact', to: 'engage' },
      { from: 'contact', to: 'supp', tone: 'red' },
    ],
  },

  // ── Decisions taken ────────────────────────────────────────────
  'Raw SQL and JSON aggregation for heavy reads': {
    nodes: [
      { id: 'orm', label: 'Chained ORM\nincludes', col: 0, row: 0 },
      { id: 'loop', label: 'Loop in Node', col: 0, row: 1 },
      { id: 'trips', label: 'Many round\ntrips', col: 0, row: 2, tone: 'red' },
      { id: 'sql', label: 'Parameterized\nraw SQL', col: 2, row: 0, tone: 'primary' },
      { id: 'agg', label: 'json_agg +\njson_build_object', col: 2, row: 1, tone: 'purple' },
      { id: 'one', label: 'One round trip', col: 2, row: 2, tone: 'green' },
    ],
    edges: [
      { from: 'orm', to: 'loop' },
      { from: 'loop', to: 'trips', tone: 'red' },
      { from: 'sql', to: 'agg', tone: 'purple' },
      { from: 'agg', to: 'one', tone: 'green' },
    ],
    groups: [
      { label: 'Avoid', cols: [0, 0], rows: [0, 2] },
      { label: 'Prefer', cols: [2, 2], rows: [0, 2], tone: 'primary' },
    ],
    caption: 'Kept inside well-named helpers, only where the load justifies it.',
  },

  'Investing in the harness': {
    nodes: [
      { id: 'pain', label: 'Pain hit twice', col: 0, row: 0, tone: 'gold' },
      { id: 'auto', label: 'Automate it', col: 1, row: 0, tone: 'purple' },
      { id: 'next', label: 'Next task starts\nwith context', col: 2, row: 0, tone: 'green' },
      { id: 'hypo', label: 'Hypothetical\npain', col: 0, row: 1 },
      { id: 'skip', label: 'Skip', col: 1, row: 1 },
    ],
    edges: [
      { from: 'pain', to: 'auto', tone: 'purple' },
      { from: 'auto', to: 'next', tone: 'green' },
      { from: 'next', to: 'auto', label: 'compounds', tone: 'green', dashed: true, back: true },
      { from: 'hypo', to: 'skip' },
    ],
  },

  'Idempotency everywhere': {
    nodes: [
      { id: 'run', label: 'Runs again', col: 0, row: 0 },
      { id: 'done', label: 'Already done?', col: 1, row: 0, tone: 'gold' },
      { id: 'skip', label: 'Skip finished\nwork', col: 2, row: 0, tone: 'green' },
      { id: 'work', label: 'Do the work', col: 1, row: 1, tone: 'primary' },
      { id: 'newer', label: 'Newer check\nqueued?', col: 0, row: 1, tone: 'gold' },
      { id: 'stand', label: 'Stand down', col: 0, row: 2 },
      { id: 'stale', label: 'Stale job:\nfailed for good', col: 2, row: 1, tone: 'red' },
    ],
    edges: [
      { from: 'run', to: 'done' },
      { from: 'done', to: 'skip', label: 'yes', tone: 'green' },
      { from: 'done', to: 'work', label: 'no', tone: 'primary' },
      { from: 'newer', to: 'stand', label: 'yes' },
    ],
  },

  'Optimistic UI': {
    nodes: [
      { id: 'edit', label: 'User edit', col: 0, row: 0 },
      { id: 'ui', label: 'UI updates now', col: 1, row: 0, tone: 'green' },
      { id: 'server', label: 'Server write', col: 2, row: 0, tone: 'primary' },
      { id: 'roll', label: 'Roll back to\nprevious state', col: 1, row: 1, tone: 'red' },
      { id: 'kept', label: 'Kept', col: 2, row: 1, tone: 'green' },
      { id: 'slow', label: 'Slow / uncertain\noperation', col: 0, row: 2, tone: 'gold' },
      { id: 'stream', label: 'Stream real\nstatus', col: 1.5, row: 2, tone: 'purple' },
    ],
    edges: [
      { from: 'edit', to: 'ui', tone: 'green' },
      { from: 'ui', to: 'server' },
      { from: 'server', to: 'kept', label: 'accepted', tone: 'green' },
      { from: 'server', to: 'roll', label: 'rejected', tone: 'red' },
      { from: 'slow', to: 'stream', label: 'subscription', tone: 'purple' },
    ],
  },

  'Contained, visible failures': {
    nodes: [
      { id: 'job', label: 'Job / page', col: 1, row: 0, tone: 'primary' },
      { id: 'a', label: 'Row 1', col: 0, row: 1, tone: 'green' },
      { id: 'b', label: 'Row 2 fails', col: 1, row: 1, tone: 'red' },
      { id: 'c', label: 'Row 3', col: 2, row: 1, tone: 'green' },
      { id: 'log', label: 'Logged &\nreported', col: 1, row: 2, tone: 'gold' },
    ],
    edges: [
      { from: 'job', to: 'a', tone: 'green' },
      { from: 'job', to: 'b', tone: 'red' },
      { from: 'job', to: 'c', tone: 'green' },
      { from: 'b', to: 'log', tone: 'gold' },
    ],
    caption: 'The failure stays in its smallest unit; everything else carries on.',
  },

  'Single-pass loops': {
    nodes: [
      { id: 'f', label: 'filter()', col: 0, row: 0 },
      { id: 'm', label: 'map()', col: 0, row: 1 },
      { id: 'r', label: 'reduce()', col: 0, row: 2, tone: 'red' },
      { id: 'for', label: 'for loop', col: 2, row: 0, tone: 'primary' },
      { id: 'exit', label: 'Early exit', col: 2, row: 1, tone: 'gold' },
      { id: 'res', label: 'Result', col: 2, row: 2, tone: 'green' },
    ],
    edges: [
      { from: 'f', to: 'm', label: 'temp array' },
      { from: 'm', to: 'r', label: 'temp array' },
      { from: 'for', to: 'exit', tone: 'gold' },
      { from: 'exit', to: 'res', tone: 'green' },
    ],
    groups: [
      { label: '3 passes', cols: [0, 0], rows: [0, 2] },
      { label: '1 pass', cols: [2, 2], rows: [0, 2], tone: 'primary' },
    ],
    caption: 'Simple transforms still get map.',
  },

  'Partial success over all-or-nothing': {
    nodes: [
      { id: 'imp', label: 'Large import', col: 1, row: 0, tone: 'primary' },
      { id: 'ok', label: 'Rows that fit', col: 0, row: 1, tone: 'green' },
      { id: 'cap', label: 'Past seat cap', col: 2, row: 1, tone: 'gold' },
      { id: 'done', label: 'Import finishes', col: 0, row: 2, tone: 'green' },
      { id: 'report', label: 'Grouped report\nof what was lost', col: 2, row: 2, tone: 'purple' },
    ],
    edges: [
      { from: 'imp', to: 'ok', tone: 'green' },
      { from: 'imp', to: 'cap', tone: 'gold' },
      { from: 'ok', to: 'done', tone: 'green' },
      { from: 'cap', to: 'report', label: 'skip + reason', tone: 'purple' },
    ],
  },

  'Grandfathering existing units': {
    nodes: [
      { id: 'switch', label: 'Move to\nper-seat', col: 1, row: 0, tone: 'primary' },
      { id: 'old', label: 'Existing units', col: 0, row: 1 },
      { id: 'new', label: 'New units', col: 2, row: 1 },
      { id: 'free', label: 'Kept at\nno extra cost', col: 0, row: 2, tone: 'green' },
      { id: 'bill', label: 'New seat price', col: 2, row: 2, tone: 'gold' },
    ],
    edges: [
      { from: 'switch', to: 'old' },
      { from: 'switch', to: 'new' },
      { from: 'old', to: 'free', tone: 'green' },
      { from: 'new', to: 'bill', tone: 'gold' },
    ],
    caption: 'Nobody pays more for something included yesterday.',
  },

  'Downgrades at renewal, preview first': {
    nodes: [
      { id: 'change', label: 'Plan change', col: 1, row: 0, tone: 'primary' },
      { id: 'up', label: 'Upgrade', col: 0, row: 1 },
      { id: 'now', label: 'Applies now', col: 0, row: 2, tone: 'green' },
      { id: 'down', label: 'Downgrade /\nremoval', col: 2, row: 1 },
      { id: 'preview', label: 'Preview what\nis removed', col: 2, row: 2, tone: 'gold' },
      { id: 'renew', label: 'Applies at\nrenewal', col: 1, row: 2, tone: 'purple' },
    ],
    edges: [
      { from: 'change', to: 'up' },
      { from: 'change', to: 'down' },
      { from: 'up', to: 'now', tone: 'green' },
      { from: 'down', to: 'preview', tone: 'gold' },
      { from: 'preview', to: 'renew', label: 'confirm', tone: 'purple' },
    ],
  },

  'External side effects after commit': {
    nodes: [
      { id: 'update', label: 'DB update', col: 1, row: 0, tone: 'primary' },
      { id: 'commit', label: 'Commit', col: 1, row: 1, tone: 'green' },
      { id: 'delete', label: 'Delete Amplify\ndomain', col: 1, row: 2, tone: 'purple' },
      { id: 'rollback', label: 'Rolled back', col: 2, row: 1, tone: 'red' },
      { id: 'orphan', label: 'Orphan, cleaned\nup later', col: 2, row: 2, tone: 'gold' },
    ],
    edges: [
      { from: 'update', to: 'commit', tone: 'green' },
      { from: 'commit', to: 'delete', label: 'only now', tone: 'purple' },
      { from: 'update', to: 'rollback', label: 'error', tone: 'red' },
      { from: 'rollback', to: 'orphan', tone: 'gold' },
    ],
    groups: [{ label: 'Transaction', cols: [1, 1], rows: [0, 1], tone: 'primary' }],
    caption: 'A live domain can never be taken down by a rolled-back update.',
  },

  'Serialize work on shared resources': {
    nodes: [
      { id: 'pa', label: 'Delete A', col: 0, row: 0 },
      { id: 'pb', label: 'Delete B', col: 1, row: 0 },
      { id: 'clash', label: 'Overwrote\neach other', col: 0.5, row: 1, tone: 'red' },
      { id: 'sa', label: 'Delete A', col: 2, row: 0, tone: 'primary' },
      { id: 'sb', label: 'Delete B', col: 2, row: 1, tone: 'primary' },
      { id: 'ok', label: 'Parent intact', col: 2, row: 2, tone: 'green' },
    ],
    edges: [
      { from: 'pa', to: 'clash', tone: 'red' },
      { from: 'pb', to: 'clash', tone: 'red' },
      { from: 'sa', to: 'sb', label: 'then', tone: 'primary' },
      { from: 'sb', to: 'ok', tone: 'green' },
    ],
    groups: [
      { label: 'Parallel', cols: [0, 1], rows: [0, 1], tone: 'red' },
      { label: 'One at a time', cols: [2, 2], rows: [0, 2], tone: 'primary' },
    ],
    caption: 'Parallel by default; sequential when operations share a parent.',
  },

  'One strong main model over many subagents': {
    nodes: [
      { id: 'feature', label: 'Feature work', col: 0, row: 0, tone: 'green' },
      { id: 'main', label: 'Main session\nfull context', col: 1, row: 0, tone: 'primary' },
      { id: 'search', label: 'Wide read-only\nsearch', col: 2, row: 0 },
      { id: 'subs', label: 'Subagents\nstart cold', col: 2, row: 1 },
      { id: 'meter', label: 'Token meter\nmeasures cost', col: 0, row: 1, tone: 'purple' },
    ],
    edges: [
      { from: 'main', to: 'feature', tone: 'green' },
      { from: 'main', to: 'search' },
      { from: 'search', to: 'subs' },
      { from: 'subs', to: 'main', label: 'lossy summary', tone: 'gold', dashed: true },
      { from: 'meter', to: 'main', tone: 'purple', dashed: true },
    ],
  },

  'Suppression blocks sending, not data': {
    nodes: [
      { id: 'contact', label: 'Suppressed\ncontact', col: 1, row: 0, tone: 'gold' },
      { id: 'data', label: 'Tickets &\nreplies imported', col: 0, row: 1, tone: 'green' },
      { id: 'mail', label: 'Outbound email\nblocked', col: 2, row: 1, tone: 'red' },
    ],
    edges: [
      { from: 'contact', to: 'data', label: 'still', tone: 'green' },
      { from: 'contact', to: 'mail', label: 'never', tone: 'red' },
    ],
  },

  'Secure by default': {
    nodes: [
      { id: 'tokens', label: 'Short-lived\ntokens', col: 0, row: 0, tone: 'primary' },
      { id: 'creds', label: 'Hidden provider\ncredentials', col: 2, row: 0, tone: 'purple' },
      { id: 'core', label: 'Small blast\nradius', col: 1, row: 1, tone: 'green' },
      { id: 'sql', label: 'Parameterized\nqueries', col: 0, row: 2, tone: 'primary' },
      { id: 'hosts', label: 'Own-domain hosts\nstaff only', col: 2, row: 2, tone: 'purple' },
    ],
    edges: [
      { from: 'tokens', to: 'core', tone: 'green' },
      { from: 'creds', to: 'core', tone: 'green' },
      { from: 'sql', to: 'core', tone: 'green' },
      { from: 'hosts', to: 'core', tone: 'green' },
    ],
  },
}
