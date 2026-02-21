import { AnimatedCounter } from '../components/AnimatedCounter'
import { RevealSection } from '../components/RevealSection'
import { Card } from '../components/ui/Card'

export const WhyThisMatters = () => {
  return (
    <section id="why" className="space-y-6">
      <RevealSection>
        <h2 className="text-2xl font-bold text-brand-navy">Why This Matters Now</h2>
        <p className="max-w-3xl text-sm text-brand-darkGray md:text-base">
          The MVP decision is not only about infrastructure cost. It determines launch confidence, compliance readiness, and how
          quickly leadership can prove repeatable referral outcomes.
        </p>
      </RevealSection>

      <div className="grid gap-4 md:grid-cols-3">
        <RevealSection delayMs={80}>
          <Card className="bg-brand-cream">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-garnet">Launch speed</div>
            <div className="mt-2 text-3xl font-black text-brand-navy">
              <AnimatedCounter value={30} suffix=" days" />
            </div>
            <p className="mt-2 text-sm text-brand-darkGray">To production-ready provider onboarding with bounded scope.</p>
          </Card>
        </RevealSection>

        <RevealSection delayMs={140}>
          <Card className="bg-brand-cream">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-garnet">Compliance confidence</div>
            <div className="mt-2 text-3xl font-black text-brand-navy">
              <AnimatedCounter value={99} suffix="%" />
            </div>
            <p className="mt-2 text-sm text-brand-darkGray">Of PHI exposure vectors removed by keeping the frontend static.</p>
          </Card>
        </RevealSection>

        <RevealSection delayMs={200}>
          <Card className="bg-brand-cream">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-garnet">Operational focus</div>
            <div className="mt-2 text-3xl font-black text-brand-navy">
              <AnimatedCounter value={1} />
              <span className="ml-1 text-base font-semibold">BAA perimeter</span>
            </div>
            <p className="mt-2 text-sm text-brand-darkGray">Single cloud boundary simplifies governance and audit evidence.</p>
          </Card>
        </RevealSection>
      </div>

      <RevealSection delayMs={260}>
        <div className="flex flex-wrap items-center gap-2">
          {['HIPAA-oriented', 'Provider-first workflow', 'Enterprise-ready controls'].map((item) => (
            <span key={item} className="group relative rounded-full border border-brand-gold bg-white px-3 py-1.5 text-xs font-medium text-brand-navy">
              {item}
              <span className="tooltip-fade pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-brand-navy px-2 py-1 text-[10px] text-white">
                Verified strategy
              </span>
            </span>
          ))}
        </div>
      </RevealSection>
    </section>
  )
}