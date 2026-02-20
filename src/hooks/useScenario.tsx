import { createContext, ReactNode, useContext, useState } from 'react'
import { ScenarioType } from '../types'

interface ScenarioContextType {
  scenario: ScenarioType
  setScenario: (scenario: ScenarioType) => void
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined)

export const ScenarioProvider = ({ children }: { children: ReactNode }) => {
  const [scenario, setScenario] = useState<ScenarioType>('Low')

  return <ScenarioContext.Provider value={{ scenario, setScenario }}>{children}</ScenarioContext.Provider>
}

export const useScenario = () => {
  const context = useContext(ScenarioContext)

  if (!context) {
    throw new Error('useScenario must be used within ScenarioProvider')
  }

  return context
}