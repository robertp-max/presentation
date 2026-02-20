export const Recommendations = () => {
  return (
    <section id="rec" className="mb-24 scroll-mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-brand-navy">Final Recommendations</h2>

      <div className="rounded-xl bg-brand-navy p-8 text-white shadow-xl">
        <h3 className="mb-6 text-xl font-bold">Strategy: “Fastest HIPAA-Capable MVP”</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="h-fit rounded-lg bg-brand-gold/20 p-2 text-brand-goldLight">
              <span className="font-bold">1</span>
            </div>
            <div>
              <h4 className="text-lg font-bold">Lock down PHI scope by design</h4>
              <p className="mt-1 text-sm text-brand-navyLight">
                Enforce “No PHI allowed” in MVP inputs. Remove free-text fields. Require aggregates only for reporting. This keeps
                HIPAA exposure bounded.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-fit rounded-lg bg-brand-gold/20 p-2 text-brand-goldLight">
              <span className="font-bold">2</span>
            </div>
            <div>
              <h4 className="text-lg font-bold">Single BAA-covered perimeter</h4>
              <p className="mt-1 text-sm text-brand-navyLight">
                Use Google Cloud (Cloud Run, SQL, Storage) for backend. It matches your existing Workspace BAA and provides the
                exact covered primitives needed.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-fit rounded-lg bg-brand-gold/20 p-2 text-brand-goldLight">
              <span className="font-bold">3</span>
            </div>
            <div>
              <h4 className="text-lg font-bold">Treat Logging as Regulated</h4>
              <p className="mt-1 text-sm text-brand-navyLight">
                Adopt strict structured logging. Explicitly ban PHI/PII in headers and monitoring metadata. This is your #1 leakage
                risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}