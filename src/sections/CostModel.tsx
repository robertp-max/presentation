import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ANNUAL_COSTS, SCENARIO_METRICS } from '../data/reportData'
import { useScenario } from '../hooks/useScenario'
import { Card } from '../components/ui/Card'

export const CostModel = () => {
  const { scenario } = useScenario()

  const currentMetrics = SCENARIO_METRICS[scenario]
  const costs = ANNUAL_COSTS[scenario]

  const chartData = [
    { name: 'Google Cloud', cost: costs.google, color: '#1B4F72' },
    { name: 'AWS Native', cost: costs.aws, color: '#FAD06E' },
    { name: 'Medplum', cost: costs.medplum, color: '#C7DCEB' },
  ]

  return (
    <section id="cost" className="scroll-mt-8 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">12-Month Cost Model</h2>
          <p className="text-brand-darkGray">
            Scenario: <span className="font-semibold text-brand-charcoal">{scenario}</span> ({currentMetrics.providerCount} Providers)
          </p>
        </div>
        <div className="hidden text-right text-xs text-brand-darkGray md:block">
          Excludes engineering labor.
          <br />
          Based on steady-state approximation.
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGoogle" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1B263B" />
                    <stop offset="100%" stopColor="#34415a" />
                  </linearGradient>
                  <linearGradient id="barAws" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C5A059" />
                    <stop offset="100%" stopColor="#e1c78f" />
                  </linearGradient>
                  <linearGradient id="barMedplum" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7B241C" />
                    <stop offset="100%" stopColor="#a6433a" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={40} animationDuration={1000} animationEasing="ease-in-out">
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? 'url(#barGoogle)' : index === 1 ? 'url(#barAws)' : 'url(#barMedplum)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Scenario Drivers">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b pb-2">
                <span className="text-brand-darkGray">MAU</span>
                <span className="font-mono">{currentMetrics.mau}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-brand-darkGray">API Calls/Prov</span>
                <span className="font-mono">{currentMetrics.apiCalls}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-brand-darkGray">Doc Storage</span>
                <span className="font-mono">{currentMetrics.storage}</span>
              </li>
            </ul>
          </Card>

          <div className="rounded-lg bg-brand-sky p-4 text-xs text-brand-darkGray">
            <strong>Analysis:</strong> Low usage is the most likely case because providers typically log in to report revenue once a
            month and receive referrals by email, then manage those referrals in their own CRM. At this level, Google Cloud remains
            the most cost-efficient, while Medplum's fixed $2,000/mo cost dominates.
          </div>
        </div>
      </div>
    </section>
  )
}