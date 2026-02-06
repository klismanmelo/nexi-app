import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-black">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2">
                {/* Left content */}
                <div className="flex flex-col justify-center">
                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1 text-xs font-medium text-indigo-400">
                        ⚡ THE FUTURE OF LINK MANAGEMENT
                    </span>

                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                        Connect. <br />
                        <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            Showcase.
                        </span>{' '}
                        Grow.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-zinc-400">
                        The only link-in-bio platform designed for professional creators.
                        Beautiful designs, powerful analytics, and total control.
                    </p>

                    <div className="mt-10 flex items-center gap-6">
                        <Button className="rounded-full bg-linear-to-r from-indigo-500 to-violet-500 px-8 py-6 text-base">
                            Create your NEXI →
                        </Button>

                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <div className="flex -space-x-2">
                                <div className="h-8 w-8 rounded-full bg-zinc-700" />
                                <div className="h-8 w-8 rounded-full bg-zinc-600" />
                                <div className="h-8 w-8 rounded-full bg-zinc-500" />
                            </div>
                            <span>Joined by 10k+ creators</span>
                        </div>
                    </div>
                </div>

                {/* Right placeholder (Phone component later) */}
                <div className="relative flex items-center justify-center">
                    <div className="h-130 w-70 rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900 to-black opacity-40">
                        {/* Phone component will live here */}
                    </div>
                </div>
            </div>

            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        </section>
    )
}