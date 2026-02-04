interface DashboardHeaderProps {
    title?: string
    subtitle?: string
    period?: string
}

export function DashboardHeader({
    title,
    subtitle,
    period
}: DashboardHeaderProps) {
    return (
        <header className="w-full border-b border-zinc-800 bg-linear-to-b from-zinc-950 to-zinc-900">
            <div className="flex items-center justify-between px-6 py-5">
                {/* Left */}
                <div>
                    <h1 className="font-outfit text-2xl font-semibold text-white">
                        {title}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        {subtitle}
                    </p>
                </div>

                {/* Right */}
                <button className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800">
                    {period}
                </button>
            </div>
        </header>
    )
}
