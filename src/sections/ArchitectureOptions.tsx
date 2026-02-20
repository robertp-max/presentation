import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

export const ArchitectureOptions = () => {
  return (
    <section id="arch" className="scroll-mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-brand-navy">Architecture Strategy</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-brand-gold" title="Recommended 'Now' Architecture">
          <div className="space-y-4">
            <Badge variant="success">Fastest MVP</Badge>
            <p className="text-sm text-brand-darkGray">Provider-only scope. Focuses on speed and risk isolation.</p>
            <ul className="list-inside list-disc space-y-2 text-sm text-brand-charcoal">
              <li>
                <strong>Frontend:</strong> Vercel Static (No server functions)
              </li>
              <li>
                <strong>Identity:</strong> Google Identity Platform
              </li>
              <li>
                <strong>Backend:</strong> Cloud Run (API Service)
              </li>
              <li>
                <strong>Database:</strong> Cloud SQL (Relational)
              </li>
              <li>
                <strong>Storage:</strong> Cloud Storage (Verification docs)
              </li>
            </ul>
          </div>
        </Card>

        <Card className="border-l-4 border-l-brand-navyLight opacity-75" title="Future 'Later' Architecture">
          <div className="space-y-4">
            <Badge variant="neutral">Trigger-Based</Badge>
            <p className="text-sm text-brand-darkGray">
              Trigger: When you need to ingest/store patient ePHI or connect to payers.
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-brand-charcoal">
              <li>
                <strong>FHIR Store:</strong> Google Healthcare API
              </li>
              <li>
                <strong>Platform:</strong> Medplum (Managed FHIR)
              </li>
              <li>
                <strong>AWS:</strong> HealthLake / Native Clinical Stack
              </li>
            </ul>
            <div className="mt-4 rounded bg-brand-softGray p-2 text-xs text-brand-darkGray">
              <strong>Note:</strong> Implementing FHIR before you have patients is often a “speed tax”.
            </div>
          </div>
        </Card>
      </div>

      <Card title="Vendor Comparison Matrix (Provider-Only MVP)">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-sky text-xs uppercase text-brand-darkGray">
              <tr>
                <th className="px-4 py-3">Attribute</th>
                <th className="px-4 py-3">Google Cloud (Rec)</th>
                <th className="px-4 py-3">Medplum</th>
                <th className="px-4 py-3">AWS Native</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-softGray">
              <tr>
                <td className="px-4 py-3 font-medium">Fit for MVP</td>
                <td className="px-4 py-3">Medium (Healthcare API is overkill now, but Cloud Run is perfect)</td>
                <td className="px-4 py-3">High (If you accept subscription cost)</td>
                <td className="px-4 py-3">Medium (You assemble everything)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Speed to MVP</td>
                <td className="px-4 py-3">Moderate (Uses existing Workspace BAA)</td>
                <td className="px-4 py-3">Fastest (Patterns provided)</td>
                <td className="px-4 py-3">Moderate (Config heavy)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">BAA Scope</td>
                <td className="px-4 py-3 text-brand-navy">Includes Cloud Run, SQL, Storage, Identity</td>
                <td className="px-4 py-3">Included in Production Plan ($2k/mo)</td>
                <td className="px-4 py-3">Shared Responsibility (Eligible Services)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}