'use client'

import { JSX, useCallback, useEffect, useState } from "react"
import { LinkItem } from "./LinkItem"
import { listLinkUser } from "@/http/list-links-user"
import {
    Globe,
    Users,
    Instagram,
    Send,
    Link as LinkIcon,
} from "lucide-react"

interface Link {
    title: string
    url: string
    position: number
    icon: string | null
    clicks?: number
}

const iconMap: Record<string, JSX.Element> = {
    globe: <Globe className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    send: <Send className="h-5 w-5" />,
}

export function ListLinks() {
    const [links, setLinks] = useState<Link[]>([])
    const [loading, setLoading] = useState(true)

    const loadLinks = useCallback(async () => {
        const data = await listLinkUser()
        setLinks(data)
    }, [])

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            await loadLinks()
            setLoading(false)
        }

        load()
    }, [loadLinks])

    if (loading) {
        return <div className="text-zinc-400">Loading links...</div>
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-white">
                    Your Links
                </h1>

                <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-indigo-500/40 transition">
                    + Add New Link
                </button>
            </div>

            <div className="space-y-4">
                {links.map((link) => (
                    <LinkItem
                        key={link.position}
                        title={link.title}
                        url={link.url}
                        clicks={(link.clicks ?? 0).toString()}
                        icon={
                            link.icon && iconMap[link.icon]
                                ? iconMap[link.icon]
                                : <LinkIcon className="h-5 w-5" />
                        }
                    />
                ))}
            </div>
        </section>
    )
}
