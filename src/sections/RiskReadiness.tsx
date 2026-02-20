import { RISKS } from '../data/reportData'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

export const RiskReadiness = () => {
  return (
    <section id="risk" className="scroll-mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-brand-navy">HIPAA Risk & Readiness</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {RISKS.map((risk) => (
          <Card key={risk.id} className="flex flex-col">
            <div className="mb-3 flex items-start justify-between gap-2">
              <span className="text-sm font-semibold text-brand-charcoal">{risk.area}</span>
              <Badge variant={risk.risk === 'High' ? 'danger' : risk.risk === 'Medium' ? 'warning' : 'blue'}>{risk.risk} Risk</Badge>
            </div>
            <p className="mb-4 flex-grow text-sm text-brand-darkGray">{risk.detail}</p>
            <div className="rounded border border-brand-softGray bg-brand-ghost p-2 text-xs text-brand-darkGray">
              <strong>Mitigation:</strong> {risk.mitigation}
            </div>
          </Card>
        ))}
      </div>

      <Card title="Minimum Security Control Checklist (Launch)">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase text-brand-charcoal">Administrative Safeguards</h4>
            <ul className="list-inside list-disc space-y-2 text-sm text-brand-darkGray">
              <li>Document Risk Analysis (v1)</li>
              <li>Define approval permissions (Admin vs Support)</li>
              <li>Incident Response “starter” runbook</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase text-brand-charcoal">Technical Safeguards</h4>
            <ul className="list-inside list-disc space-y-2 text-sm text-brand-darkGray">
              <li>RBAC (Applicant → Review → Verified)</li>
              <li>MFA for Admins (Mandatory)</li>
              <li>Audit Logging (State transitions & Access)</li>
              <li>Encryption in transit (TLS) & at rest</li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  )
}