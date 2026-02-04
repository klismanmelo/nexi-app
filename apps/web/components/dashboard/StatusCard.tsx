import { Card } from "@/components/ui/card"
import { ReactNode } from "react"

interface StatsCardProps {
    title: string
    icon: ReactNode
    total: string
    status: string
}

export function StatsCard({
    title,
    icon,
    total,
    status,
}: StatsCardProps) {
    return (
        <Card
            className="
        group relative overflow-hidden
        rounded-2xl border border-white/10
        bg-zinc-900/60 backdrop-blur-xl
        p-6 transition-all
        hover:border-indigo-500/40
      "
        >
            {/* Top */}
            <div className="flex items-center justify-between">
                <div
                    className="
            flex h-10 w-10 items-center justify-center
            rounded-full bg-white/5
            text-white transition-colors
            group-hover:text-indigo-400
          "
                >
                    {icon}
                </div>

                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-400">
                    {status}
                </span>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-1">
                <p className="text-xs uppercase tracking-wide text-zinc-400">
                    {title}
                </p>

                <p className="text-3xl font-semibold text-white">
                    {total}
                </p>
            </div>
        </Card>
    )
}
