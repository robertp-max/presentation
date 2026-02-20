import { ROADMAP_ITEMS } from '../data/reportData'
import { Card } from '../components/ui/Card'

export const Roadmap = () => {
  return (
    <section id="roadmap" className="scroll-mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-brand-navy">90-Day Implementation Roadmap</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {ROADMAP_ITEMS.map((entry) => (
          <Card key={entry.phase} className="no-break">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-goldDark">{entry.phase}</div>
            <h3 className="mb-4 text-lg font-semibold text-brand-charcoal">{entry.focus}</h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-brand-darkGray">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}