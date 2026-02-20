import { Card } from '../components/ui/Card'

export const ExecutiveSummary = () => {
  return (
    <section id="exec" className="scroll-mt-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-brand-navy">HIPAA-Ready Provider Onboarding MVP</h1>
        <p className="text-lg text-brand-darkGray">Decision-Grade Architecture & Cost Analysis</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-brand-navyLight bg-brand-sky">
          <div className="mb-1 text-sm font-semibold uppercase text-brand-navy">Current State</div>
          <div className="text-2xl font-bold text-brand-navyDark">0 Providers</div>
          <div className="text-sm text-brand-navy">0 Patients</div>
        </Card>
        <Card className="border-brand-goldLight bg-brand-cream">
          <div className="mb-1 text-sm font-semibold uppercase text-brand-goldDark">MVP Scope</div>
          <div className="text-2xl font-bold text-brand-navyDark">Onboarding Only</div>
          <div className="text-sm text-brand-darkGray">+ Revenue Reporting</div>
        </Card>
        <Card className="border-brand-goldLight bg-brand-goldLight/40">
          <div className="mb-1 text-sm font-semibold uppercase text-brand-goldDark">Primary Challenge</div>
          <div className="text-2xl font-bold text-brand-navyDark">"HIPAA-Ready"</div>
          <div className="text-sm text-brand-darkGray">Without over-engineering</div>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Executive Bottom Line</h3>
        <p className="mb-4 leading-relaxed text-brand-darkGray">
          The fastest path to a HIPAA-capable MVP (now) is a <strong>BAA-covered backend on Google Cloud</strong> paired with a
          <strong> static Vercel frontend</strong>.
        </p>
        <p className="leading-relaxed text-brand-darkGray">
          This recommendation utilizes your existing Google Workspace BAA posture and minimizes risk by isolating PHI from the
          frontend runtime. Wait to introduce FHIR-native complexity (Google Healthcare API or Medplum) until you have a concrete
          need to store patient-level data.
        </p>
      </Card>
    </section>
  )
}