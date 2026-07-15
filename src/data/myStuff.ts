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
          "`Promise.all` runs async calls in parallel — great for two or three independent queries. But `ids.map(id => db.query(...))` over 500 ids grabs 500 pool connections at once. It's like sending 500 shoppers into a store with 10 tills: everything queues, then the pool exhausts and the app falls over. For bulk writes, make it one round trip instead: `bulkCreate(rows)` beats 500 parallel `create()` calls.",
      },
      {
        term: 'INNER vs LEFT JOIN',
        detail:
          "Joining `users` to `orders`: an INNER JOIN returns only users who actually have orders — no match, no row. A LEFT JOIN keeps every user and fills the missing order side with `null`. Party analogy: INNER is the list of guests who showed up, LEFT is the full invite list with blanks next to the no-shows. In Sequelize an `include` with `required: true` is the INNER JOIN; `required: false` is the LEFT.",
      },
      {
        term: 'Push work to the database',
        detail:
          "Pulling 100k rows into Node just to sum or group them burns RAM and time — the database was built for exactly that job. `SELECT user_id, SUM(total) FROM orders GROUP BY user_id` hands back 50 finished rows instead of 100k raw ones to loop over. Rule of thumb: ship the question to the data, not the data to the question. JSON aggregation (`json_agg`) goes further — one query can return a parent with its children already nested.",
      },
      {
        term: 'Sequelize dataValues',
        detail:
          "A Sequelize query returns model instances — objects wrapped in methods and hidden state, not plain data. Serialisers like GraphQL can't see into the nested `dataValues`, so fields silently come back empty. `const plain = instance.toJSON()` flattens it to a plain object — safe as long as nothing downstream calls `.update()`, `.reload()` or `.destroy()` on the result, because those only exist on the live instance.",
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
          "DNS is the internet's phone book — it turns a name into an address. An `A` record maps to an IPv4 address (`example.com → 93.184.216.34`), `AAAA` to IPv6, and `CNAME` aliases one name to another name. CloudFront — AWS's CDN — is hundreds of edge servers with no fixed IP, so you point a domain at it with a `CNAME` like `d123.cloudfront.net`, never a hard-coded `A` record that breaks the moment the IPs rotate.",
      },
      {
        term: 'Custom domain flow (Amplify)',
        detail:
          'Everything between "customer types their domain" and "site loads with a padlock": `CreateDomainAssociationCommand` registers the domain, then `GetDomainAssociationCommand` returns two CNAME records — one proves domain ownership, one routes the subdomain. The customer adds both at their registrar (GoDaddy/Cloudflare), DNS propagates, ACM spots the verification record and issues the SSL certificate, and CloudFront starts serving the app on that domain.',
      },
      {
        term: 'ACM vs CloudFront',
        detail:
          "Two AWS services that are easy to blur together. ACM (Certificate Manager) issues and renews the SSL certificate — the padlock, the proof the site is who it claims to be. CloudFront is the delivery network — it serves the actual app from the edge server closest to each visitor. Analogy: ACM is the ID card, CloudFront is the courier fleet.",
      },
      {
        term: 'Background jobs',
        detail:
          'A user clicking "export report" shouldn\'t stare at a spinner while the server crunches for two minutes. Long work moves off the request path: the API drops a message onto an SQS queue and responds instantly; an independently-deployed Lambda worker picks it up and does the heavy lifting. Restaurant model — the waiter takes the order and moves on, the kitchen cooks. Bonus: a failed job retries from the queue instead of making the user resubmit.',
      },
      {
        term: 'Multi-tenant SaaS',
        detail:
          "One codebase, one deployment, many customers — each seeing only their own data. Apartment building: shared walls and plumbing (servers, code), private locked units (data isolation, typically a `tenant_id` scoping every query). The alternative — one deployment per customer — is easier to isolate but brutal to maintain once you have hundreds of them.",
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
          'Three ways of saying "don\'t keep asking — I\'ll tell you when something happens." Webhook: an external server calls your URL when an event fires (Stripe hitting `/payment-succeeded`). GraphQL subscription: the client holds a socket open and the server pushes updates through it (live chat, dashboards). Pub/sub: an internal post office — services publish events to a channel, every subscriber gets a copy. Scope is the gotcha: an organisation-wide channel fans out to every member; a per-user channel touches one socket.',
      },
      {
        term: 'Publish plain objects only',
        detail:
          "`pubSub.publish()` serialises the payload to push it over the wire, and Sequelize model instances don't survive the trip — subscribers receive empty or broken fields. Convert everything first, nested associations included: `pubSub.publish(TASK_UPDATED, { task: task.toJSON() })`.",
      },
      {
        term: 'Null associations on live events',
        detail:
          "A live event arrives with `task.assignee` as `null` even though the task clearly has one. Two usual causes: the query that produced the instance never `include`d the association, so it was never loaded — or the association changed after loading and the instance is stale. `await task.reload({ include: [User] })` before publishing attaches the fresh data.",
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
          "Render a 10,000-row table naively and the browser chokes on 10,000 DOM nodes. Virtualization renders only what's on screen — maybe 20 rows — and swaps content in as you scroll, a window sliding over the list. The scrollbar still behaves like all 10,000 rows exist; the DOM never holds more than a screenful. Worth ~150ms on the heaviest data screens I worked on.",
      },
      {
        term: 'Throttling vs rate limiting',
        detail:
          'Both tame request floods, differently. Throttling smooths the flow — requests slow down or queue, like a metered motorway on-ramp: everyone gets on, gradually. Rate limiting hard-caps a window and rejects the overflow — 100 requests/min, then `HTTP 429`, a bouncer with a headcount. Throttle to protect a downstream you still want fully served; rate-limit to shut down abuse outright.',
      },
      {
        term: 'Fire-and-forget analytics',
        detail:
          "Three delivery guarantees, three price tags. Fire-and-forget — `posthog.capture(event)` with no `await` — adds zero latency, but a lost event stays lost: perfect for analytics. Awaited — delivery guaranteed, but now a tracking outage can block your core flow: avoid. Queued — guaranteed and non-blocking, but you're running extra infrastructure. Match the guarantee to how much the data actually matters.",
      },
      {
        term: 'Bloom filters',
        detail:
          'A probabilistic "have I seen this before?" set that squeezes huge datasets into tiny memory. Its answers are "definitely not" or "probably yes" — false positives possible, false negatives impossible. Caching layers use one to skip pointless lookups: if the filter says a key was never stored, don\'t even hit the cache or database. A guest list that is 100% certain only about who is NOT invited.',
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
          "A save-game system for agent conversations. Every step of state — messages, tool results, position in the graph — is written to a database checkpoint. If the server crashes mid-conversation, it reloads the last checkpoint and resumes: no re-running expensive tool calls, no lost context. Same mechanism enables time-travel debugging — replay any conversation from any step.",
      },
      {
        term: 'Temperature',
        detail:
          "The randomness dial on how the model picks its next token. Low (~0): always take the most likely token — deterministic and repeatable, right for extraction, classification and code. High (~1): long-shot tokens get real odds — creative but loose, right for brainstorming and copy. ~0.5 sits balanced. Rule of thumb: if a \"wrong but interesting\" answer is useless to you, keep it low.",
      },
      {
        term: 'Context scoping',
        detail:
          'Both cost and answer quality degrade when you dump whole file trees into a prompt. Better: compress the prompt and pair it with a knowledge graph of the codebase, so the model reasons over just the relevant nodes — `auth.service` plus its three dependents, not 400 files. Markedly better token efficiency and less "lost in the middle."',
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
          'Multipurpose Internet Mail Extensions — the standard that lets an email carry more than plain ASCII text. A MIME message is a set of labelled parts: `multipart/alternative` holds a plain-text and an HTML version of the same body (the client picks one), `image/png` marks an inline image or attachment. Without MIME there are no attachments, no formatting, no non-Latin characters — email as it was in the 1970s.',
      },
      {
        term: 'Links vs file attachments',
        detail:
          "Attach a 10MB report and it bloats every recipient's copy, trips spam filters, and can never be recalled once sent. A download link — e.g. a pre-signed S3 URL — keeps the mail light, can expire or require auth, lets you revoke or replace the file after sending, and makes every download trackable.",
      },
      {
        term: 'Reputation & bounces',
        detail:
          "Mailbox providers score every sender like a credit rating, and that score decides inbox vs spam for all your future mail. Bounces damage it most. Soft bounce — temporary (mailbox full, server down): safe to retry. Hard bounce — permanent (address doesn't exist): suppress immediately. Repeatedly mailing dead addresses is exactly what spammers do, and providers grade you accordingly.",
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
          "Client-side validation is UX, not security — anyone can open devtools, edit the request, and send `price: 0` or someone else's `userId`. Every rule the frontend checks must be re-checked server-side, e.g. a Zod schema at the API boundary: `schema.parse(req.body)` rejects anything malformed before business logic ever runs. Trust the server, never the client.",
      },
      {
        term: 'Least privilege',
        detail:
          "When something gets denied, the lazy fix is granting broad access; the right fix is the narrowest one. Deny by default, then allow exactly the one event or action that's needed. Hotel keycards, not master keys: housekeeping opens floors 2–4, not the vault. A leaked narrow credential is an incident; a leaked master key is a breach.",
      },
      {
        term: 'WAF token',
        detail:
          'A Web Application Firewall inspects traffic before it reaches the app — filtering injection attempts, bots and floods. In our setup the frontend and services attach a WAF token to each request; the firewall sitting at the backend API layer verifies it, so untokened junk traffic is dropped before it ever touches business logic. A wristband checked at the door, not at the bar.',
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
        section: 'Core Habits',
        detail:
          "A raw `'active'` typed in 14 places is 14 chances for a typo the compiler can't catch — `'actve'` fails silently in production. Centralise once: `const STATUS = { ACTIVE: 'active', BANNED: 'banned' } as const`. Now `STATUS.ACTVE` is a compile error, a rename is a one-line change, and autocomplete lists every valid value.",
      },
      {
        term: 'Sensible default return types',
        section: 'Core Habits',
        detail:
          "Callers should never have to guess a function's empty shape. Stay consistent: object → `null`, number → `0`, boolean → an explicit `true`/`false`, array → `[]`. Returning `[]` instead of `null` for the empty case means `getUsers().map(...)` never explodes — predictable shapes delete whole classes of defensive `if` checks downstream.",
      },
      {
        term: 'null vs undefined vs falsy',
        section: 'Core Habits',
        detail:
          "`undefined` — the value was never set. `null` — someone deliberately set \"nothing\". Falsy — the whole crowd that fails an `if`: `0`, `''`, `false`, `null`, `undefined`, `NaN`. The trap: `if (obj.count)` treats a real `0` as missing. When the actual question is \"does the key exist\", ask exactly that — `obj.hasOwnProperty('count')` is `true` even when the value is `0` or `''`.",
      },
      {
        term: 'var vs let vs const',
        section: 'Core Habits',
        detail:
          "`var` — function-scoped: it leaks out of `if`/`for` blocks into the whole enclosing function. `if (true) { var x = 1 } console.log(x)` → `1`\n`let` — block-scoped and mutable: exists only inside the nearest `{ }`, value can be reassigned. `if (true) { let y = 1 } console.log(y)` → `ReferenceError`\n`const` — block-scoped like `let`, but the binding can't be reassigned — though a `const` object/array's contents can still mutate: `const arr = [1]; arr.push(2)` is legal, `arr = []` is not.",
      },
      {
        term: 'ES6 destructuring',
        section: 'Destructuring & Spread',
        detail:
          "Unpack values out of objects and arrays into variables in one line, instead of repeating `user.name`, `user.age` everywhere.\nPull object properties into named variables. `const { name, age } = user`\nRename while destructuring. `const { name: userName } = user`\nDefault values for missing keys. `const { role = 'guest' } = user`\nPositional array unpacking. `const [first, second] = [1, 2]`\nSkip array entries you don't need. `const [, second] = [1, 2]`\nNested destructuring. `const { address: { city } } = user`\nUnpack function arguments directly in the signature. `function greet({ name }) { return name }`",
      },
      {
        term: 'Spread operator (...)',
        section: 'Destructuring & Spread',
        detail:
          "Expands an iterable or object in place — the Swiss-army knife for copying and merging without mutating the original.\nCopy an array (shallow). `const b = [...a]`\nMerge arrays. `[...arr1, ...arr2]` → combined array, later duplicates win\nCopy an object (shallow). `const clone = { ...obj }`\nMerge objects, later keys override earlier ones. `{ ...defaults, ...overrides }`\nPass array elements as individual function args. `Math.max(...[3,1,4])` → `4`\nBuild a new array/string from an iterable. `[...'abc']` → `['a','b','c']`\nCollect the rest of an array/object into one var. `const [first, ...rest] = [1,2,3]` → `rest = [2,3]`",
      },
      {
        term: 'Conditional fields via spread',
        section: 'Destructuring & Spread',
        detail:
          "`{ ...(condition && { field: value }) }` adds a key only when it's needed — cleaner than building the object and mutating it afterwards. `{ ...(isAdmin && { role: 'admin' }) }` → `{ role: 'admin' }` when `isAdmin` is true, `{}` when false: the `&&` short-circuits to `false`, and spreading `false` contributes nothing.",
      },
      {
        term: 'ES6 rest parameters',
        section: 'Destructuring & Spread',
        detail:
          "Collect the remaining arguments into a real array. `function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }`\nMix named params with a trailing rest. `function log(level, ...args) {}`\nReplaces the old `arguments` object with an actual `Array` — has `.map`/`.reduce`, and works in arrow functions where `arguments` doesn't exist. `const sum = (...nums) => nums.reduce((a, b) => a + b, 0)`",
      },
      {
        term: 'ES6 arrow functions — common uses',
        section: 'Functions',
        detail:
          "Short one-line callbacks — implicit return, no `{ }`/`return`. `arr.map(n => n * 2)`\nArray/object transforms in `.filter`/`.reduce` chains. `users.filter(u => u.active).reduce((sum, u) => sum + u.age, 0)`\nPromise chains and async handlers. `fetch(url).then(res => res.json())`\nPreserving `this` inside a class method or setTimeout — arrow functions don't rebind it, unlike `function`. `class Timer { start() { setTimeout(() => this.tick(), 1000) } }`\nDefault export of a small component/handler. `export const Button = () => <button />`\nCurrying / returning a function from a function. `const add = a => b => a + b`\nSorting comparators. `arr.sort((a, b) => a - b)`",
      },
      {
        term: 'When NOT to use arrow functions',
        section: 'Functions',
        detail:
          "Named/hoisted functions — arrow functions are anonymous and not hoisted, so skip them when you need the function callable before its declaration or named in stack traces.\nObject methods — `this` isn't bound to the object, it's inherited from the enclosing scope. `{ b: 7, func: () => { this.b-- } }` — `this.b` isn't the object's `b`, so it silently does nothing.\nDOM event handlers needing the element as `this`. `btn.addEventListener('click', () => this.classList.toggle('on'))` → `TypeError`, since `this` is the parent scope, not `btn`.\nAny function relying on its own `this` or `arguments` — arrow functions have neither; both resolve to the enclosing function's.",
      },
      {
        term: 'ES6 default parameters',
        section: 'Functions',
        detail:
          "Fallback value used only when the arg is `undefined`. `function greet(name = 'Guest') { return name }` → `greet()` → `'Guest'`\nUnlike the old `arg = arg || fallback` trick, a falsy-but-valid value like `0` or `''` is kept, not overridden. `function f(x = 5) {}; f(0)` → `0`\nLater defaults can reference earlier params. `function make(a, b = a * 2) {}`",
      },
      {
        term: 'for..of vs for..in',
        section: 'Iteration & Built-ins',
        detail:
          "`for..in` gives you keys, `for..of` gives you values. `for (i in [3,4,5])` → `0,1,2`; `for (v of [3,4,5])` → `3,4,5`.\nOnly `for..of` works with `await` inside the loop, letting you build entries one by one before a single bulk insert — `.forEach` and `for..in` can't pause per item: \n`for (const id of ids) { const row = await fetchUser(id); rows.push(row); } await db.insertMany(rows);`",
      },
      {
        term: 'ES6 array methods',
        section: 'Iteration & Built-ins',
        detail:
          "`Array.from()` — iterables/array-likes → array. `Array.from('abc')` → `['a','b','c']`\n`Array.of()` — new array from args, no type/count quirks. `Array.of(7)` → `[7]` (vs `Array(7)` → empty length-7 array)\n`.copyWithin()` — copy a slice within same array. `[1,2,3,4,5].copyWithin(0,3)` → `[4,5,3,4,5]`\n`.find()` — first element matching predicate. `[1,5,10].find(n => n > 4)` → `5`\n`.findIndex()` — index of first match. `[1,5,10].findIndex(n => n > 4)` → `1`\n`.entries()` — iterator of `[index, value]` pairs. `[...['a','b'].entries()]` → `[[0,'a'],[1,'b']]`\n`.keys()` — iterator of indices. `[...['a','b'].keys()]` → `[0,1]`\n`.values()` — iterator of values. `[...['a','b'].values()]` → `['a','b']`\n`.fill()` — overwrite elements with a static value. `[1,2,3].fill(0,1)` → `[1,0,0]`",
      },
      {
        term: 'ES6 string methods',
        section: 'Iteration & Built-ins',
        detail:
          "`.startsWith()` — true if string begins with given chars. `'hello'.startsWith('he')` → `true`\n`.endsWith()` — true if string ends with given chars. `'hello'.endsWith('lo')` → `true`\n`.includes()` — true if given substring appears anywhere. `'hello'.includes('ell')` → `true`\n`.repeat()` — new string with the original repeated n times. `'ab'.repeat(3)` → `'ababab'`",
      },
      {
        term: 'ES6 collections — Map/Set/WeakMap/WeakSet',
        section: 'Iteration & Built-ins',
        detail:
          "`Map` — key/value pairs like an object, but any type can be a key and insertion order is preserved. `new Map([['a', 1]])`\n`Set` — unique values only; the one-liner way to dedupe an array. `[...new Set([1, 1, 2])]` → `[1, 2]`\n`WeakMap`/`WeakSet` — same idea, but keys must be objects and are held weakly, so an entry doesn't stop its key from being garbage-collected. Good for attaching private metadata to an object without leaking memory.",
      },
      {
        term: 'ES6 classes',
        section: 'Classes, Modules & Async',
        detail:
          "Syntactic sugar over prototype-based inheritance. `class User { constructor(name) { this.name = name } }`\nInheritance via `extends`/`super`. `class Admin extends User { constructor(name) { super(name) } }`\nInstance methods live on the shared prototype, not copied per-instance — cheaper than attaching functions in the constructor.\nGetters/setters read like properties but run code. `class Circle { get area() { return Math.PI * this.r ** 2 } }`\nStatic members belong to the class itself, not instances. `class Util { static parse(x) { return Number(x) } }`",
      },
      {
        term: 'ES6 modules',
        section: 'Classes, Modules & Async',
        detail:
          "Named exports — export as many as you like per file; the import name must match. `export function perimeter(x, y) { return 2 * (x + y) }` → `import { perimeter } from './rectangle'`\nDefault export — one per file, and the import side can name it anything. `export default function Component() {}` → `import AnyName from './file'`\nBatch-export a list at the bottom instead of tagging each declaration. `export { perimeter, area }`\nMix named and default in one file — one export renamed to default alongside the rest. `export { show as default, a, b }` → `import show, { a, b } from './index'`\nImport both styles from the same module at once. `import Component, { helper } from './file'`\nStatic import/export structure (resolved at parse time, not runtime) is what lets bundlers tree-shake unused exports out of the final build.",
      },
      {
        term: 'ES6 Promises',
        section: 'Classes, Modules & Async',
        detail:
          "A promise is an IOU for a value that isn't ready yet.\nThree states: `pending` (initial, no result yet) → `fulfilled` (resolved with a value) or `rejected` (failed with a reason) — and once settled either way, a promise is immutable, it can't flip states again. `new Promise((resolve, reject) => task ? resolve(value) : reject(error))`\nChain steps without nesting. `fetchUser(id).then(u => fetchOrders(u.id)).then(orders => render(orders))`\nHandle failure in one place instead of an error-first callback per step. `promise.catch(err => log(err))`\nRun cleanup regardless of outcome. `promise.finally(() => setLoading(false))`\nRun independent async calls in parallel and wait for all. `Promise.all([fetchA(), fetchB()])`\nTake whichever settles first (timeouts, races). `Promise.race([fetchData(), timeout(5000)])`\nWait for all to settle, success or failure, without short-circuiting. `Promise.allSettled([...])`\nasync/await is sugar over promises — same mechanism, sequential-looking syntax. `const user = await fetchUser(id)`\nSolves callback hell — deeply nested `fn(a, (err, b) => fn2(b, (err, c) => ...))` becomes a flat `.then()` chain or linear `await` sequence.",
      },
      {
        term: 'ES6 template literals',
        section: 'Templates & Tooling',
        detail:
          "Basic interpolation — swap `+` concatenation for a placeholder. `${s1} ${s2}` → `'Good Day'`\nEmbed any expression, not just variables — math, ternaries, function calls. `Total: ${price * qty}`\nTrue multi-line strings without `\\n` concatenation — a literal newline in the source becomes one in the string.\nBuild dynamic class names / URLs / query strings inline. `/users/${id}?active=${isActive}`\nTagged templates let a function intercept and process the pieces before they're joined — used for escaping, i18n, styled-components.\nNesting works fine for conditional strings. `${a ? 'yes' : 'no'}`",
      },
      {
        term: 'ES6 Symbol()',
        section: 'Templates & Tooling',
        detail:
          "`Symbol()` mints a unique, immutable value every call — `Symbol('id') !== Symbol('id')`. Solves naming collisions and lets you attach \"invisible,\" collision-proof metadata to objects: symbol keys are skipped by `for..in`, `Object.keys` and `JSON.stringify`, so `obj[mySym] = 'meta'` won't clash with other libs or leak into serialisation.",
      },
      {
        term: 'Meta-programming & Intl',
        section: 'Templates & Tooling',
        detail:
          "`Proxy` — intercept fundamental operations (get/set/has) on an object. `new Proxy(target, { get: (t, prop) => (prop in t ? t[prop] : 'missing') })`\n`Reflect` — companion API for those same operations, used inside proxy traps to forward the default behaviour correctly. `Reflect.get(target, prop)`\n`Intl` — locale-aware number/date/currency formatting without a library. `new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(1234.5)` → `'£1,234.50'`",
      },
      {
        term: 'Babel transpiling',
        section: 'Templates & Tooling',
        detail:
          "Babel compiles modern JS/TS down to a version older engines understand, so you write today's syntax without dropping support for older browsers. Arrow functions, optional chaining and the rest get rewritten:\n`const f = (a) => a?.x` → `var f = function (a) { return a == null ? undefined : a.x; };`",
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
          'Automated checklists wired into git itself. Husky runs scripts at lifecycle points — `pre-commit` lints and type-checks the staged code, `post-checkout` reinstalls deps or regenerates code — so a broken commit is stopped on the laptop before CI ever sees it. Gotcha from service repos: the pre-push checks needed the AWS SAM CLI and Docker running locally, or the push failed.',
      },
      {
        term: 'CI/CD build states',
        detail:
          "Every GitHub Actions run walks pending → running → success or failed — read it like a traffic light. Green: merge and move on. Red: open the failed step's log first; the last summary line usually names the exact test or command that broke. One job spinning while siblings pass usually means a job dependency, not a failure. The skill is knowing when to dig into logs and when to move on.",
      },
    ],
  },
]

export default myStuff
