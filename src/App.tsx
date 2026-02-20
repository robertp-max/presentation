import { Layout } from './components/Layout'
import { ScenarioProvider } from './hooks/useScenario'
import { ArchitectureOptions } from './sections/ArchitectureOptions'
import { CostModel } from './sections/CostModel'
import { ExecutiveSummary } from './sections/ExecutiveSummary'
import { Recommendations } from './sections/Recommendations'
import { RiskReadiness } from './sections/RiskReadiness'
import { Roadmap } from './sections/Roadmap'

function App() {
  return (
    <ScenarioProvider>
      <Layout>
        <ExecutiveSummary />
        <ArchitectureOptions />
        <CostModel />
        <RiskReadiness />
        <Roadmap />
        <Recommendations />
      </Layout>
    </ScenarioProvider>
  )
}

export default App
