import { RevealSection } from '../components/RevealSection'
import { Card } from '../components/ui/Card'

const FLOW_STEPS = [
  {
    label: 'Intake',
    detail: 'Provider logs in monthly, submits onboarding and revenue summaries with no patient-level PHI in the browser.',
  },
  {
    label: 'Validation',
    detail: 'Backend enforces policy checks, audit logging, and role controls inside a BAA-covered boundary.',
  },
  {
    label: 'Routing',
    detail: 'Referrals arrive by email and are triaged to provider CRM workflows without broad platform complexity.',
  },
  {
    label: 'Reporting',
    detail: 'Leadership dashboards show adoption, margin, and compliance signals with decision-ready confidence.',
  },
]

export const HowItWorks = () => {
  return (
    <section id="flow" className="space-y-6">
      <RevealSection>
        <h2 className="text-2xl font-bold text-brand-navy">How It Works</h2>
      </RevealSection>

      <div className="grid gap-4 md:grid-cols-2">
        {FLOW_STEPS.map((step, index) => (
          <RevealSection key={step.label} delayMs={index * 90}>
            <Card className="relative">
              <div className="mb-3 flex items-center gap-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-navyDark">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-brand-navy">{step.label}</h3>
              </div>
              <p className="text-sm leading-relaxed text-brand-darkGray">{step.detail}</p>
            </Card>
          </RevealSection>
        ))}
      </div>
    </section>
  )
}