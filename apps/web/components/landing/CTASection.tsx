import { Button } from '@/components/ui/button'

export function CtaSection() {
    return (
        <section className="relative bg-black py-32">
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-r from-indigo-500 via-purple-500 to-violet-500 px-8 py-20 text-center md:px-16">
                    {/* Content */}
                    <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                        Ready to transform your bio?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
                        Join the elite creators who trust NEXI for their professional
                        presence. <br />
                        Start for free today.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            className="rounded-full bg-white px-8 text-indigo-600 hover:bg-white/90"
                        >
                            Claim your URL
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-white/30 text-white hover:bg-white/10"
                        >
                            View Examples
                        </Button>
                    </div>

                    {/* Subtle glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-white/10 blur-3xl" />
                </div>
            </div>
        </section>
    )
}