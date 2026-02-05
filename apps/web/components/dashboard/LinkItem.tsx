import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ReactNode } from "react"
import { GripVertical, ExternalLink, Copy } from "lucide-react"

interface LinkItemProps {
    title: string
    icon: ReactNode
    url: string
    clicks: string
}

export function LinkItem({ title, icon, url, clicks }: LinkItemProps) {
    return (
        <Card className="group grid grid-cols-[1fr_auto] items-center gap-6 rounded-2xl border border-white/10  bg-zinc-900/60 backdrop-blur-xl 6 py-4 transition-all  hover:border-indigo-500/40" >
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <div className="opacity-0 group-hover:opacity-100 transition text-zinc-500">
                    <GripVertical className="h-5 w-5 cursor-grab" />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white group-hover:text-indigo-400 transition-colors">
                    {icon}
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{title}</h3>
                        <ExternalLink className="h-4 w-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-zinc-400">{url}</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-sm font-semibold text-white">{clicks}</p>
                    <p className="text-xs uppercase text-zinc-400">Clicks</p>
                </div>

                <div className="h-8 w-px bg-zinc-700" />

                <div className="flex items-center gap-3">
                    <button className="rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition">
                        <Copy className="h-4 w-4" />
                    </button>

                    <Switch />
                </div>
            </div>
        </Card>
    )
}

