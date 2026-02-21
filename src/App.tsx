import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CardFlowLayout } from './components/CardFlowLayout'
import { ScenarioProvider } from './hooks/useScenario'
import { ArchitectureOptions } from './sections/ArchitectureOptions'
import { CostModel } from './sections/CostModel'
import { ExecutiveSummary } from './sections/ExecutiveSummary'
import { HowItWorks } from './sections/HowItWorks'
import { Recommendations } from './sections/Recommendations'
import { RiskReadiness } from './sections/RiskReadiness'
import { Roadmap } from './sections/Roadmap'
import { WhyThisMatters } from './sections/WhyThisMatters'
import titleLogo from './assets/logos/logo_dark_bg.png'
import { Button } from './components/ui/Button'

const ANIMATION_MS = 320
const COVER_ZOOM_MS = 180
const FULL_REPORT_URL = (import.meta.env.VITE_FULL_REPORT_URL as string | undefined) ?? 'http://127.0.0.1:4173/'

type CardItem = {
  title: string
  content: JSX.Element | null
}

const TitleCard = ({ onView, className }: { onView: () => void; className?: string }) => {
  return (
    <div className={`hero-gradient relative flex min-h-[640px] items-center justify-center overflow-hidden rounded-2xl ${className ?? ''}`}>
      <span className="particle-float left-[15%] top-[18%]" />
      <span className="particle-float right-[18%] top-[24%]" style={{ animationDelay: '700ms' }} />
      <span className="particle-float bottom-[24%] right-[30%]" style={{ animationDelay: '1200ms' }} />

      <div className="relative z-10 w-full max-w-3xl px-8 py-14 text-center text-white">
        <img
          src={titleLogo}
          alt="FindAHomeCare logo"
          className="mx-auto mb-6 h-12 w-auto object-contain"
        />
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">Google Cloud MVP Architecture</h1>
        <div className="mx-auto mt-5 max-w-xl">
          <div className="hero-divider" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-navyLight md:text-base">
          Decision-ready architecture and cost flow for a low-usage, provider onboarding MVP.
        </p>
        <Button onClick={onView} className="mt-10">
          View
        </Button>
      </div>
    </div>
  )
}

const ReportGridCard = ({
  items,
  onSelect,
  className,
}: {
  items: CardItem[]
  onSelect: (index: number) => void
  className?: string
}) => {
  return (
    <div className={`step-fade-slide flex min-h-[640px] items-center justify-center ${className ?? ''}`}>
      <div className="w-full max-w-4xl rounded-2xl bg-brand-navyDark px-8 py-10 text-white shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold">View Report</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item, index) => (
            <button
              key={`${index + 1}-${item.title}`}
              onClick={() => onSelect(index)}
              className="group rounded-lg border border-white/20 bg-white/10 p-4 text-left transition-all hover:-translate-y-1 hover:bg-white/20"
            >
              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-navyDark transition-transform group-hover:scale-110">
                {index + 1}
              </div>
              <div className="text-sm font-semibold leading-snug">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const EndCard = () => {
  return (
    <div className="flex min-h-[640px] items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl bg-brand-navyDark px-8 py-14 text-center text-white shadow-xl">
        <img src={titleLogo} alt="FindAHomeCare logo" className="mx-auto mb-6 h-12 w-auto object-contain" />
        <p className="mx-auto mt-5 max-w-2xl text-sm text-brand-navyLight md:text-base">
          Open the full report version with sidebar navigation and scrollable sections.
        </p>
        <Button className="mt-10" onClick={() => window.open(FULL_REPORT_URL, '_blank', 'noopener,noreferrer')}>
          View Report
        </Button>
      </div>
    </div>
  )
}

const FlowCards = ({ onIndexChange }: { onIndexChange: (index: number) => void }) => {
  const cards = useMemo(
    () => [
      { title: 'Title', content: null },
      {
        title: 'Executive Summary',
        content: (
          <div className="space-y-10">
            <ExecutiveSummary />
            <WhyThisMatters />
          </div>
        ),
      },
      { title: 'Architecture Options', content: <ArchitectureOptions /> },
      { title: 'Cost Model', content: <CostModel /> },
      { title: 'Risk & Readiness', content: <RiskReadiness /> },
      { title: 'How It Works', content: <HowItWorks /> },
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
  const [showReportGrid, setShowReportGrid] = useState(false)
  const [isCoverZoomingOut, setIsCoverZoomingOut] = useState(false)
  const touchStartXRef = useRef<number | null>(null)

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
    setShowReportGrid(false)
    setPreviousIndex(currentIndex)
    setCurrentIndex(nextIndex)
    setIsAnimating(true)
  }

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      goTo(currentIndex + 1, 'next')
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1, 'prev')
    }
  }

  const handleReportSelect = (nextIndex: number) => {
    if (nextIndex === currentIndex) {
      setShowReportGrid(false)
      return
    }

    goTo(nextIndex, nextIndex > currentIndex ? 'next' : 'prev')
  }

  const handleViewFromCover = () => {
    if (isCoverZoomingOut || showReportGrid) {
      return
    }

    setIsCoverZoomingOut(true)
    window.setTimeout(() => {
      setShowReportGrid(true)
      setIsCoverZoomingOut(false)
    }, COVER_ZOOM_MS)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        if (currentIndex === 0 && !showReportGrid) {
          handleViewFromCover()
          return
        }
        goNext()
      }

      if (event.key === 'ArrowLeft') {
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, showReportGrid])

  return (
    <section
      className={`mx-auto w-full max-w-5xl rounded-xl ${
        currentIndex === 0 || currentIndex === cards.length - 1 ? 'bg-transparent p-0 shadow-none' : 'bg-white p-4 shadow-sm md:p-6'
      }`}
    >
      {currentIndex > 0 && currentIndex < cards.length - 1 && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-brand-darkGray">
            {currentIndex + 1} / {cards.length} · {cards[currentIndex].title}
          </div>

          <div className="flex items-center gap-1">
            {cards.map((item, index) => {
              if (index === 0) {
                return null
              }
              const isActive = index === currentIndex
              return (
                <button
                  key={item.title}
                  onClick={() => goTo(index, index > currentIndex ? 'next' : 'prev')}
                  className={`h-2 rounded-full transition-all ${isActive ? 'nav-glow-active w-6 bg-brand-gold' : 'w-2 bg-brand-navyLight hover:w-4'}`}
                  aria-label={`Go to ${item.title}`}
                />
              )
            })}
          </div>
        </div>
      )}

      <div
        className="relative min-h-[640px] overflow-hidden"
        onTouchStart={(event) => {
          touchStartXRef.current = event.changedTouches[0].clientX
        }}
        onTouchEnd={(event) => {
          if (touchStartXRef.current === null) {
            return
          }
          const diff = event.changedTouches[0].clientX - touchStartXRef.current
          if (Math.abs(diff) < 40) {
            return
          }
          if (diff < 0) {
            goNext()
          } else {
            goPrev()
          }
          touchStartXRef.current = null
        }}
      >
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
          {currentIndex === 0 && showReportGrid ? (
            <ReportGridCard items={cards.slice(1)} onSelect={(index) => handleReportSelect(index + 1)} className="zoom-enter" />
          ) : currentIndex === 0 ? (
            <TitleCard onView={handleViewFromCover} className={isCoverZoomingOut ? 'zoom-exit' : ''} />
          ) : currentIndex === cards.length - 1 ? (
            <EndCard />
          ) : (
            cards[currentIndex].content
          )}
        </div>
      </div>

      {currentIndex > 0 && currentIndex < cards.length - 1 && (
        <div className="mt-6 grid grid-cols-3 items-center">
          <Button variant="ghost" onClick={goPrev} className="justify-self-start">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Back
          </Button>

          <div className="justify-self-center">
            <img
              src="https://demo.findahomecare.com/wp-content/uploads/2025/10/FIndaHomeCare-Logo.png"
              alt="FindAHomeCare logo"
              className="h-[120px] w-auto object-contain"
            />
          </div>

          {currentIndex < cards.length - 1 ? (
            <Button variant="secondary" onClick={goNext} className="justify-self-end">
              Next
              <ArrowRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </Button>
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
