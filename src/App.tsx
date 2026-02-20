import { useEffect, useMemo, useState } from 'react'
import { CardFlowLayout } from './components/CardFlowLayout'
import { ScenarioProvider } from './hooks/useScenario'
import { ArchitectureOptions } from './sections/ArchitectureOptions'
import { CostModel } from './sections/CostModel'
import { ExecutiveSummary } from './sections/ExecutiveSummary'
import { Recommendations } from './sections/Recommendations'
import { RiskReadiness } from './sections/RiskReadiness'
import { Roadmap } from './sections/Roadmap'
import titleLogo from './assets/logos/logo_dark_bg.png'

const ANIMATION_MS = 320
const FULL_REPORT_URL = (import.meta.env.VITE_FULL_REPORT_URL as string | undefined) ?? 'http://127.0.0.1:4173/'

const TitleCard = ({ onView }: { onView: () => void }) => {
  return (
    <div className="flex min-h-[640px] items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl bg-brand-navyDark px-8 py-14 text-center text-white shadow-xl">
        <img
          src={titleLogo}
          alt="FindAHomeCare logo"
          className="mx-auto mb-6 h-10 w-auto object-contain"
        />
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">Google Cloud MVP Architecture</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-navyLight md:text-base">
          Decision-ready architecture and cost flow for a low-usage, provider onboarding MVP.
        </p>
        <button
          onClick={onView}
          className="mt-10 rounded-md bg-brand-gold px-8 py-3 text-sm font-semibold uppercase tracking-wide text-brand-navyDark transition-colors hover:bg-brand-goldLight"
        >
          View
        </button>
      </div>
    </div>
  )
}

const EndCard = () => {
  return (
    <div className="flex min-h-[640px] items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl bg-brand-navyDark px-8 py-14 text-center text-white shadow-xl">
        <img src={titleLogo} alt="FindAHomeCare logo" className="mx-auto mb-6 h-10 w-auto object-contain" />
        <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-navyLight md:text-base">
          Open the full report version with sidebar navigation and scrollable sections.
        </p>
        <a
          href={FULL_REPORT_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block rounded-md bg-brand-gold px-8 py-3 text-sm font-semibold uppercase tracking-wide text-brand-navyDark transition-colors hover:bg-brand-goldLight"
        >
          View Report
        </a>
      </div>
    </div>
  )
}

const FlowCards = ({ onIndexChange }: { onIndexChange: (index: number) => void }) => {
  const cards = useMemo(
    () => [
      { title: 'Title', content: null },
      { title: 'Executive Summary', content: <ExecutiveSummary /> },
      { title: 'Architecture Options', content: <ArchitectureOptions /> },
      { title: 'Cost Model', content: <CostModel /> },
      { title: 'Risk & Readiness', content: <RiskReadiness /> },
      { title: 'Roadmap', content: <Roadmap /> },
      { title: 'Recommendations', content: <Recommendations /> },
      { title: 'View Report', content: null },
    ],
    [],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  useEffect(() => {
    onIndexChange(currentIndex)
  }, [currentIndex, onIndexChange])

  useEffect(() => {
    if (!isAnimating) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setPreviousIndex(null)
      setIsAnimating(false)
    }, ANIMATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [isAnimating])

  const goTo = (nextIndex: number, nextDirection: 'next' | 'prev') => {
    if (isAnimating || nextIndex < 0 || nextIndex >= cards.length || nextIndex === currentIndex) {
      return
    }

    setDirection(nextDirection)
    setPreviousIndex(currentIndex)
    setCurrentIndex(nextIndex)
    setIsAnimating(true)
  }

  return (
    <section
      className={`mx-auto w-full max-w-5xl rounded-xl ${
        currentIndex === 0 || currentIndex === cards.length - 1 ? 'bg-transparent p-0 shadow-none' : 'bg-white p-4 shadow-sm md:p-6'
      }`}
    >
      {currentIndex > 0 && currentIndex < cards.length - 1 && (
        <div className="mb-4 text-sm font-semibold text-brand-darkGray">
          {currentIndex + 1} / {cards.length} · {cards[currentIndex].title}
        </div>
      )}

      <div className="relative min-h-[640px] overflow-hidden">
        {previousIndex !== null && (
          <div
            className={`absolute inset-0 swipe-card ${
              direction === 'next' ? 'swipe-out-left' : 'swipe-out-right'
            }`}
          >
            {cards[previousIndex].content}
          </div>
        )}

        <div
          className={`relative swipe-card ${
            isAnimating ? (direction === 'next' ? 'swipe-in-right' : 'swipe-in-left') : ''
          }`}
        >
          {currentIndex === 0 ? (
            <TitleCard onView={() => goTo(1, 'next')} />
          ) : currentIndex === cards.length - 1 ? (
            <EndCard />
          ) : (
            cards[currentIndex].content
          )}
        </div>
      </div>

      {currentIndex > 0 && currentIndex < cards.length - 1 && (
        <div className="mt-6 grid grid-cols-3 items-center">
          <button
            onClick={() => goTo(currentIndex - 1, 'prev')}
            className="justify-self-start rounded-md border border-brand-navyLight px-4 py-2 text-sm font-medium text-brand-navyDark transition-colors hover:bg-brand-sky"
          >
            Back
          </button>

          <div className="justify-self-center">
            <img
              src="https://demo.findahomecare.com/wp-content/uploads/2025/10/FIndaHomeCare-Logo.png"
              alt="FindAHomeCare logo"
              className="h-[120px] w-auto object-contain"
            />
          </div>

          {currentIndex < cards.length - 1 ? (
            <button
              onClick={() => goTo(currentIndex + 1, 'next')}
              className="justify-self-end rounded-md bg-brand-navyDark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy"
            >
              Next
            </button>
          ) : (
            <span className="justify-self-end" />
          )}
        </div>
      )}
    </section>
  )
}

function App() {
  const [, setCurrentIndex] = useState(0)

  return (
    <ScenarioProvider>
      <CardFlowLayout>
        <FlowCards onIndexChange={setCurrentIndex} />
      </CardFlowLayout>
    </ScenarioProvider>
  )
}

export default App
