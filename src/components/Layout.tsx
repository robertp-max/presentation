import { ReactNode } from 'react'
import { AlertTriangle, BarChart3, FileText, Layers, ShieldCheck } from 'lucide-react'
import { useScenario } from '../hooks/useScenario'
import { ScenarioType } from '../types'
import logo from '../assets/logos/logo_dark_bg.png'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { scenario, setScenario } = useScenario()

  return (
    <div className="flex min-h-screen flex-col bg-brand-ghost font-sans text-brand-charcoal md:flex-row">
      <aside className="fixed top-0 z-20 h-auto w-full flex-shrink-0 overflow-y-auto bg-brand-navyDark text-white print:hidden md:sticky md:h-screen md:w-64">
        <div className="border-b border-brand-navyDark p-6">
          <div className="flex items-center">
            <img
              src={logo}
              alt="FindAHomeCare logo"
              className="h-10 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[220px] md:h-14 md:max-w-full"
            />
          </div>
          <p className="mt-1 text-xs text-brand-navyLight">Architecture Brief</p>
        </div>

        <nav className="space-y-1 p-4">
          {[
            { id: 'exec', label: 'Executive Summary', icon: FileText },
            { id: 'arch', label: 'Architecture Options', icon: Layers },
            { id: 'cost', label: 'Cost Model', icon: BarChart3 },
            { id: 'risk', label: 'Risk & Readiness', icon: AlertTriangle },
            { id: 'roadmap', label: 'Roadmap', icon: FileText },
            { id: 'rec', label: 'Recommendation', icon: ShieldCheck },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-3 rounded px-3 py-2 text-sm text-brand-navyLight transition-colors hover:bg-brand-navyDark hover:text-white"
            >
              <item.icon size={16} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-brand-navyDark p-6">
          <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-brand-navyLight">Usage Scenario</label>
          <div className="flex rounded-lg bg-brand-navyDark p-1">
            {(['Low', 'Base', 'High'] as ScenarioType[]).map((entry) => (
              <button
                key={entry}
                onClick={() => setScenario(entry)}
                className={`flex-1 rounded-md py-1.5 text-xs transition-all ${
                  scenario === entry
                    ? 'bg-brand-gold font-medium text-brand-navy shadow-sm'
                    : 'text-brand-navyLight hover:text-white'
                }`}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 md:p-12">
        <div className="mx-auto max-w-5xl space-y-16">{children}</div>
      </main>
    </div>
  )
}