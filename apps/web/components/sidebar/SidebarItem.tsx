import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
    icon: ReactNode
    label: string
    active?: boolean
}

export function SidebarItem({ icon, label, active }: SidebarItemProps) {
    return (
        <button
            className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition",
                active
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
        >
            <span
                className={cn(
                    "text-zinc-400 transition-colors",
                    active && "text-indigo-400"
                )}
            >
                {icon}
            </span>

            <span className="flex-1 text-left font-medium">
                {label}
            </span>

            {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            )}
        </button>
    )
}
