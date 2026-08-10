import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import PageAnalytics from '@/components/PageAnalytics';

/**
 * Reference: AI agents against FHIR data.
 *
 * This is the site's technical wedge. Dogwood competes on standards
 * authority and Point-of-Care Partners on regulatory intelligence; neither
 * publishes implementation-level reference material, and neither covers the
 * agent case. It is also the one area where the claims here are backed by
 * shipped code (HealthClaw), so it can be written from practice rather than
 * from opinion.
 *
 * Server component. The only client islands are Reveal and PageAnalytics.
 *
 * Every standards detail is checked against the specification rather than
 * recalled: SMART App Launch 2.0 scope syntax (the cruds letters and their
 * ordering, the v1 -> v2 mapping, the query-parameter form) comes from
 * build.fhir.org/ig/HL7/smart-app-launch/scopes-and-launch-context.html.
 * Do not "tidy" a scope string here without rechecking it — `.rs` and
 * `.read` are not interchangeable, and the letters are order-sensitive.
 */

export const metadata: Metadata = {
  title: 'Putting AI agents on FHIR data',
  description:
    'The access patterns, SMART scopes, redaction boundaries, audit records and failure modes that matter when the client reading FHIR data is a language model rather than a fixed application.',
};

const SHELL = 'mx-auto max-w-[84rem] px-4 sm:px-6';

function Section({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line scroll-mt-20">
      <div className={`${SHELL} py-16 md:py-24`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">{label}</p>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-title tracking-tight text-fg">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-xl leading-snug tracking-tight text-fg">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="measure mt-4 text-lg leading-relaxed text-fg-2">{children}</p>
  );
}

/** Code figure. min-w-0 on every ancestor, so a long line scrolls in place. */
function Code({ children, caption }: { children: string; caption?: string }) {
  return (
    <figure className="mt-6 min-w-0">
      <div className="panel min-w-0 overflow-x-auto">
        <pre className="min-w-0 p-4 text-[13px] leading-relaxed text-fg-2">
          <code>{children}</code>
        </pre>
      </div>
      {caption && <figcaption className="caption mt-2">{caption}</figcaption>}
    </figure>
  );
}

const PATTERNS = [
  {
    name: 'Policy broker',
    shape: 'Agent → broker → FHIR server',
    control: 'Per call',
    audit: 'Central, complete',
    note: 'The broker holds the credentials, applies policy to every request and response, and is the only thing the model can reach. Costs you a service to operate and a hop of latency. This is what HealthClaw implements.',
    verdict: 'good',
  },
  {
    name: 'Scoped SMART app',
    shape: 'Agent → FHIR server, OAuth token',
    control: 'Per session',
    audit: 'Server-side, coarse',
    note: 'Standard, portable, and works against any conformant server. But the scope is fixed when the token is minted, so whatever you grant the agent may fully use for the life of that token. The server sees one client id, not which of the agent\u2019s steps made the call.',
    verdict: 'ok',
  },
  {
    name: 'MCP server over FHIR',
    shape: 'Agent → tools → FHIR server',
    control: 'Per tool call',
    audit: 'Per tool call',
    note: 'The tool boundary becomes the policy boundary, and tools are enumerable and testable in a way that free-form HTTP is not. Newer, and the tool descriptions are themselves model-visible text, so they are part of your injection surface.',
    verdict: 'ok',
  },
  {
    name: 'Direct database or warehouse',
    shape: 'Agent → SQL',
    control: 'None meaningful',
    audit: 'Query logs at best',
    note: 'Skips resource-level authorization, consent, and the compartment model entirely. Attractive because it is fast to build and the data is already flattened for analytics. Treat it as an anti-pattern for anything patient-identifiable.',
    verdict: 'bad',
  },
];

const FAILURES = [
  {
    title: 'Prompt injection carried in clinical content',
    body: 'Clinical free text is authored by many parties, and some of it is patient-supplied. A DocumentReference attachment, an Observation.note, or a Condition.note can contain text that reads as instruction to a model. The mitigation is architectural, not lexical: never let retrieved content reach the model in a position where it can be interpreted as instruction, and never give the model a tool whose blast radius you would not accept being triggered by a sentence in a scanned note.',
  },
  {
    title: 'Narrative that survives structured redaction',
    body: 'Almost every FHIR resource can carry a text.div narrative — an XHTML restatement of the resource intended for human display. Redacting Patient.name and Patient.identifier while passing the resource through untouched leaves the same identifiers sitting in the narrative block. Redaction has to run over narrative and structured fields both, or it is theatre.',
  },
  {
    title: 'Silent overfetch',
    body: 'Patient/$everything returns the entire patient compartment in one call, and _include / _revinclude quietly widen a search well past what the query appears to ask for. An agent optimising for "have enough context" will find these. Bound them at the broker, not in the prompt.',
  },
  {
    title: 'Context bleed between patients',
    body: 'A long-running session that touches two patients can carry the first one\u2019s data into reasoning about the second. Bind a session to a patient compartment and make crossing it require a new session rather than a new instruction.',
  },
  {
    title: 'Scope reuse across workflows',
    body: 'A token minted generously for one workflow gets reused for the next one because it is already there and it works. Mint narrowly, expire aggressively, and make issuing a new token cheaper than widening an old one.',
  },
];

export default function AgentGuide() {
  return (
    <div className="min-h-screen bg-bg">
      <PageAnalytics page="agentguide" />
      <Reveal />
      <Nav />

      {/* ------------------------------------------------------------- hero */}
      <section className={`${SHELL} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid min-w-0 gap-8 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-12">
          <p className="label label-bright md:pt-3">Reference</p>
          <div className="min-w-0">
            <h1 className="max-w-[52rem] text-display tracking-tight text-fg">
              Putting AI agents on FHIR data
            </h1>
            <p className="measure mt-6 text-lg leading-relaxed text-fg-2">
              SMART on FHIR was designed for applications whose behaviour is
              fixed before anyone grants them access. You can read an app&apos;s
              code, certify it, and know what it will ask for. An agent decides
              at runtime what to fetch, and that decision is shaped by the data
              it has just read.
            </p>
            <p className="measure mt-4 text-lg leading-relaxed text-fg-2">
              Two things follow, and most of this page is a consequence of them.
              The scope you grant is the scope the agent may fully use. And the
              data becomes an input to control flow, which means retrieved
              content is untrusted in a way a database row never was.
            </p>
            <p className="caption mt-8">
              Written from building{' '}
              <a
                href="https://healthclaw.io"
                className="border-b border-line-3 text-fg-2 transition-colors hover:text-fg"
              >
                HealthClaw
              </a>
              , an open-source guardrail layer for exactly this problem.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- patterns */}
      <Section label="01 / Patterns" id="patterns">
        <div className="reveal">
          <H2>Four ways to connect an agent</H2>
          <P>
            The choice here determines what every later control can do. Policy
            you cannot enforce at the connection point has to be enforced in a
            prompt, and a prompt is a request rather than a constraint.
          </P>
        </div>

        <div className="reveal mt-10 min-w-0 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-y border-line">
                <th className="label label-bright py-3 pr-4 font-normal">
                  Pattern
                </th>
                <th className="label label-bright py-3 pr-4 font-normal">
                  Shape
                </th>
                <th className="label label-bright py-3 pr-4 font-normal">
                  Policy granularity
                </th>
                <th className="label label-bright py-3 font-normal">Audit</th>
              </tr>
            </thead>
            <tbody>
              {PATTERNS.map((p) => (
                <tr key={p.name} className="border-b border-line align-top">
                  <td className="py-4 pr-4 text-fg">
                    {p.name}
                    {p.verdict === 'bad' && (
                      <span className="label mt-1 block text-fg-3">
                        anti-pattern
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-4 font-mono text-sm text-fg-2">
                    {p.shape}
                  </td>
                  <td className="py-4 pr-4 text-fg-2">{p.control}</td>
                  <td className="py-4 text-fg-2">{p.audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="reveal mt-10 grid gap-8 lg:grid-cols-2">
          {PATTERNS.map((p) => (
            <div key={p.name} className="min-w-0">
              <dt className="text-lg text-fg">{p.name}</dt>
              <dd className="measure mt-2 leading-relaxed text-fg-2">
                {p.note}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ----------------------------------------------------------- scopes */}
      <Section label="02 / Scopes" id="scopes">
        <div className="reveal">
          <H2>Grant read and search, not everything</H2>
          <P>
            SMART App Launch 2.0 replaced the coarse{' '}
            <code className="font-mono text-base text-fg">.read</code> and{' '}
            <code className="font-mono text-base text-fg">.write</code> with
            five letters — <strong className="text-fg">c</strong>reate,{' '}
            <strong className="text-fg">r</strong>ead,{' '}
            <strong className="text-fg">u</strong>pdate,{' '}
            <strong className="text-fg">d</strong>elete,{' '}
            <strong className="text-fg">s</strong>earch — which must appear in
            that order. The distinction matters for agents specifically: reading
            a known resource and searching across a type are different
            capabilities, and an agent exploring a record does far more of the
            second.
          </P>
        </div>

        <div className="reveal">
          <Code caption="v1 scopes still map onto v2: .read becomes .rs, .write becomes .cud, and .* becomes .cruds. A server advertising permission-v1 will accept the old form — which is why an agent asking for patient/*.read is asking for more than it looks like.">
{`# Too broad. The agent may read and search every resource type
# in the compartment, for the life of the token.
patient/*.read

# Better. Read and search, two resource types, nothing else.
patient/Observation.rs
patient/Condition.rs

# Better still. Constrain with search parameters, so the grant
# cannot be widened by changing the query.
patient/Observation.rs?category=http://terminology.hl7.org/CodeSystem/observation-category|laboratory

# A write path, granted separately and deliberately.
patient/ServiceRequest.c`}
          </Code>
        </div>

        <div className="reveal">
          <H3>Write scopes are a different decision</H3>
          <P>
            Read access to the wrong resource is a privacy incident. Write
            access to the wrong resource changes a clinical record. Grant{' '}
            <code className="font-mono text-base text-fg">c</code>,{' '}
            <code className="font-mono text-base text-fg">u</code> and{' '}
            <code className="font-mono text-base text-fg">d</code> in a separate
            token from the read path, so that widening the agent&apos;s reading
            never silently widens what it can change.
          </P>
        </div>
      </Section>

      {/* --------------------------------------------------------- redaction */}
      <Section label="03 / Redaction" id="redaction">
        <div className="reveal">
          <H2>Minimum necessary, applied to a context window</H2>
          <P>
            HIPAA&apos;s minimum necessary standard predates the idea that a
            request would be assembled by a statistical model, but it maps onto
            it cleanly: the agent should receive the least data that lets it do
            the job. The practical difficulty is that FHIR resources carry
            identity in more places than people expect.
          </P>
        </div>

        <div className="reveal">
          <H3>The narrative block is the one people miss</H3>
          <P>
            Nearly every resource may carry a{' '}
            <code className="font-mono text-base text-fg">text.div</code> — an
            XHTML restatement of its contents for human display. Strip{' '}
            <code className="font-mono text-base text-fg">Patient.name</code>{' '}
            and leave the narrative untouched and you have redacted nothing; the
            name is still there, in markup, one field over.
          </P>
          <Code caption="Structured redaction that ignores narrative is not redaction. Either drop text.div entirely for agent traffic, or regenerate it from the redacted resource.">
{`{
  "resourceType": "Patient",
  "id": "example",
  "text": {
    "status": "generated",
    "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">
              Jane Q. Doe, MRN 44xxxx19, born 1974-03-02
            </div>"
  },
  "name": [ { "_family": { "extension": [ /* redacted */ ] } } ],
  "identifier": [ /* redacted */ ]
}`}
          </Code>
          <P>
            The other reliable carriers are{' '}
            <code className="font-mono text-base text-fg">
              Patient.telecom
            </code>
            , <code className="font-mono text-base text-fg">Patient.address</code>{' '}
            and every free-text{' '}
            <code className="font-mono text-base text-fg">note</code> on a
            clinical resource. Dates of service are quasi-identifiers too: a
            handful of them plus a postcode re-identifies a person more often
            than teams assume.
          </P>
        </div>
      </Section>

      {/* ------------------------------------------------------------ audit */}
      <Section label="04 / Audit" id="audit">
        <div className="reveal">
          <H2>Record what a model did, not just what a client did</H2>
          <P>
            A conventional access log answers &ldquo;which client read this
            record.&rdquo; For an agent that is not enough to answer the
            question you will actually be asked, which is why it read the
            record and who was accountable for the result.
          </P>
          <P>
            FHIR gives you two resources for this and they do different jobs.{' '}
            <code className="font-mono text-base text-fg">AuditEvent</code>{' '}
            records that an access happened. <code className="font-mono text-base text-fg">Provenance</code>{' '}
            records where a piece of data came from, which is what you need when
            an agent contributes to the record rather than only reading it.
          </P>
        </div>

        <div className="reveal">
          <H3>Capture the model as a first-class actor</H3>
          <P>
            At minimum, an agent action should be reconstructable from the audit
            trail alone: which model and version, which system prompt revision,
            which tool was called with which parameters, which human approved it
            if a human did, and which patient compartment it ran in. If you
            cannot answer those from storage six months later, you do not have
            an audit trail — you have logs.
          </P>
        </div>
      </Section>

      {/* --------------------------------------------------------- approval */}
      <Section label="05 / Approval" id="approval">
        <div className="reveal">
          <H2>Writes go to a queue, not to the server</H2>
          <P>
            The safest agent write path does not write. It proposes: the agent
            produces a candidate resource, the broker holds it, and a human
            approves or rejects it before anything reaches the FHIR server. The
            approval is itself recorded, so the clinical record carries a
            human&apos;s accountability rather than a model&apos;s.
          </P>
          <P>
            This is unglamorous and it is the control that survives contact with
            a compliance review. It also degrades well: when the model is wrong,
            the failure is a rejected proposal rather than a corrected chart.
          </P>
        </div>
      </Section>

      {/* --------------------------------------------------------- failures */}
      <Section label="06 / Failure modes" id="failure-modes">
        <div className="reveal">
          <H2>What actually goes wrong</H2>
          <P>
            Ordered roughly by how often they appear in real implementations
            rather than by severity.
          </P>
        </div>

        <ol className="reveal mt-10 border-t border-line">
          {FAILURES.map((f, i) => (
            <li
              key={f.title}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-[3rem_minmax(0,1fr)]"
            >
              <span className="label label-bright md:pt-1.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg leading-snug text-fg">{f.title}</h3>
                <p className="measure mt-2 leading-relaxed text-fg-2">
                  {f.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------------- next */}
      <Section label="Next" id="next">
        <div className="reveal">
          <H2>Reference implementation</H2>
          <P>
            HealthClaw is the broker pattern described above, built in the open.
            Redaction, audit and human sign-off are enforced server-side rather
            than requested in a prompt, which is the whole argument of this
            page reduced to running code.
          </P>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://healthclaw.io"
              className="rounded-[6px] bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              healthclaw.io
            </a>
            <a
              href="https://github.com/aks129/HealthClawGuardrails"
              className="chip px-4 py-2.5 text-sm text-fg-2 transition-colors hover:text-fg"
            >
              Source on GitHub
            </a>
            <Link
              href="/reference"
              className="chip px-4 py-2.5 text-sm text-fg-2 transition-colors hover:text-fg"
            >
              All references
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
