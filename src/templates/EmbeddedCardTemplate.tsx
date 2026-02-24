import { ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'

type EmbeddedCardTemplateProps = {
  title: string
  subtitle: string
  body: string
  ctaLabel: string
  ctaHref: string
  badgeText: string
  previewUrl?: string
}

export const EmbeddedCardTemplate = ({
  title,
  subtitle,
  body,
  ctaLabel,
  ctaHref,
  badgeText,
  previewUrl,
}: EmbeddedCardTemplateProps) => {
  return (
    <div className="min-h-screen bg-brand-cream p-4 font-sans text-brand-charcoal">
      <div className="mx-auto flex min-h-[260px] max-w-3xl flex-col gap-6 py-6">
        <article className="interactive-card w-full rounded-2xl bg-white p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex rounded-full bg-brand-sky px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-navyDark">
              {badgeText}
            </span>
            <span className="text-xs text-brand-darkGray">Embedded Card</span>
          </div>

          <h1 className="text-2xl font-bold text-brand-navy md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm font-medium text-brand-garnet md:text-base">{subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-brand-darkGray md:text-base">{body}</p>

          <div className="mt-6">
            <Button
              onClick={() => window.open(ctaHref, '_blank', 'noopener,noreferrer')}
              icon={<ArrowRight className="h-4 w-4" />}
              aria-label={ctaLabel}
            >
              {ctaLabel}
            </Button>
          </div>
        </article>

        {previewUrl ? (
          <section className="w-full rounded-2xl border border-brand-navyLight/50 bg-white p-4 md:p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-darkGray">On-Screen LMS Preview</div>
            <div className="overflow-hidden rounded-xl border border-brand-navyLight/60">
              <iframe
                title="LMS embedded card preview"
                src={previewUrl}
                className="h-[360px] w-full border-0 bg-brand-cream"
                loading="lazy"
              />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
