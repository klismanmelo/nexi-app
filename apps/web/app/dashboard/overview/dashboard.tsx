'use client'

import { useState } from "react"
import {
    Eye,
    Globe,
    MousePointerClick,
    Percent,
    Share2,
} from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ListLinks } from "@/components/dashboard/ListLinks"
import { StatsCard } from "@/components/dashboard/StatusCard"
import { LivePreviewPhone } from "@/components/live-preview-phone/live-preview-phone"
import { TrafficOverviewChart } from "@/components/dashboard/TrafficOverviewChart"

interface UserProfile {
    id: string
    name: string | null
    username: string
    biography: string
    email: string
    avatarUrl: string | null
}

interface Link {
    id: string
    title: string
    url: string
    position: number
    icon: string | null
    isVisible: boolean
    clicks?: number
}

interface DashboardPageProps {
    user: UserProfile
    links: Link[]
}

export function DashboardPage({ user, links: initialLinks }: DashboardPageProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks)

    const trafficData = [
        { label: 'Mon', visitors: 400, clicks: 220 },
        { label: 'Tue', visitors: 300, clicks: 140 },
        { label: 'Wed', visitors: 220, clicks: 980 },
        { label: 'Thu', visitors: 280, clicks: 400 },
        { label: 'Fri', visitors: 200, clicks: 480 },
        { label: 'Sat', visitors: 240, clicks: 380 },
        { label: 'Sun', visitors: 320, clicks: 430 },
    ]

    return (
        <main className="grid grid-cols-1 gap-8 p-8 xl:grid-cols-[1fr_360px]">
            {/* 🔹 Coluna principal */}
            <div className="space-y-10">
                <DashboardHeader
                    title="Link Insights"
                    subtitle={`Welcome back, ${user.name ?? "there"}. Here's what's happening today.`}
                    period="Last 7 Days"
                />

                {/* Stats */}
                <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Views" total="8.4K" status="+12%" icon={<Eye className="h-5 w-5" />} />
                    <StatsCard title="Total Clicks" total="4.2K" status="+8%" icon={<MousePointerClick className="h-5 w-5" />} />
                    <StatsCard title="CTR" total="52%" status="+2.4%" icon={<Percent className="h-5 w-5" />} />
                    <StatsCard title="Shares" total="892" status="+15%" icon={<Share2 className="h-5 w-5" />} />
                </section>

                {/* Gráfico */}
                <TrafficOverviewChart
                    data={trafficData}
                    growthLabel="+12.5% this week"
                />

                {/* Lista de links */}
                <ListLinks
                    links={links}
                    onLinksChange={setLinks}
                />
            </div>

            {/* 🔹 Live Preview */}
            <aside className="sticky top-8 h-fit">
                <LivePreviewPhone
                    user={{
                        name: user.name ?? "Unnamed",
                        role: user.biography ?? "",
                        avatarUrl: user.avatarUrl ?? "",
                    }}
                    links={links.map(link => ({
                        id: link.id,
                        title: link.title,
                        isVisible: link.isVisible,
                        icon: <Globe size={16} />,
                    }))}
                />
            </aside>
        </main>
    )
}