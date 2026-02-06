import { Zap, BarChart3, Shield, Globe } from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: 'Fast Setup',
        description:
            'Create your professional link profile in under 60 seconds.',
    },
    {
        icon: BarChart3,
        title: 'Real-time Analytics',
        description:
            'Track every click and view with precise visitor insights.',
    },
    {
        icon: Shield,
        title: 'Secure & Private',
        description:
            'Your data is encrypted and protected by enterprise-grade security.',
    },
    {
        icon: Globe,
        title: 'Custom Domains',
        description:
            'Use your own domain to keep your brand consistent.',
    },
]

export function FeaturesSection() {
    return (
        <section className="relative bg-black py-24">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-white">
                        Built for performance
                    </h2>
                    <p className="mt-4 text-lg text-zinc-400">
                        Everything you need to manage your online presence and understand
                        your audience.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900/80 to-black p-8 transition hover:border-indigo-500/30"
                        >
                            {/* Icon */}
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-indigo-400 group-hover:bg-indigo-500/10">
                                <feature.icon className="h-6 w-6" />
                            </div>

                            {/* Text */}
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                {feature.description}
                            </p>

                            {/* Glow hover */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
                                <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 blur-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-full h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        </section>
    )
}