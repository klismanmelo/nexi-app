'use client'

import { useCallback, useEffect, useState } from "react"
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
import { getDataAnalyticsAction } from "./actions/getAnalyticsDataaCards"
import { UserProfileType } from "@/@types/User"
import { getDataShare } from "./actions/get-share"

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
    user: UserProfileType
    links: Link[]
}

interface DataAnalyticsCards {
    total_views: number
    total_visitors: number
    total_clicks: number
    ctr: number
}

interface DataShare {
    share_link: number
    share_profile: number
}

interface ShareResponse {
    dataShare: DataShare
}

export function DashboardPage({ user, links: initialLinks }: DashboardPageProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks)
    const [loading, setLoading] = useState(true)
    const [analytics, setAnalytics] = useState<DataAnalyticsCards | null>(null)
    const [share, setShare] = useState<ShareResponse | null>(null)

    const trafficData = [
        { label: 'Mon', visitors: 400, clicks: 220 },
        { label: 'Tue', visitors: 300, clicks: 140 },
        { label: 'Wed', visitors: 220, clicks: 980 },
        { label: 'Thu', visitors: 280, clicks: 400 },
        { label: 'Fri', visitors: 200, clicks: 480 },
        { label: 'Sat', visitors: 240, clicks: 380 },
        { label: 'Sun', visitors: 320, clicks: 430 },
    ]

    const loadAnalytics = useCallback(async () => {
        const data = await getDataAnalyticsAction({ user })
        setAnalytics(data)
    }, [user])

    const loadShare = useCallback(async () => {
        const data = await getDataShare({ user })
        setShare(data)
    }, [user])

    const totalVisits =
        (share?.dataShare.share_link ?? 0) +
        (share?.dataShare.share_profile ?? 0)

    useEffect(() => {
        loadAnalytics(),
            loadShare()
    }, [loadAnalytics, loadShare])

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
                    <StatsCard title="Total Views" total={analytics?.total_views ?? 0} status="+12%" icon={<Eye className="h-5 w-5" />} />
                    <StatsCard title="Total Clicks" total={analytics?.total_clicks ?? 0} status="+8%" icon={<MousePointerClick className="h-5 w-5" />} />
                    <StatsCard title="CTR" total={analytics?.ctr ?? 0} status="+2.4%" icon={<Percent className="h-5 w-5" />} />
                    <StatsCard title="Shares" total={totalVisits} status="+15%" icon={<Share2 className="h-5 w-5" />} />
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
                        id: user.id ?? "",
                        username: user.username ?? "Unnamed",
                        role: user.biography ?? "",
                        avatarUrl: user.avatarUrl ?? "",
                    }}
                    links={links.map(link => ({
                        id: link.id,
                        title: link.title,
                        url: link.url,
                        isVisible: link.isVisible,
                        icon: <Globe size={16} />,
                    }))}
                />
            </aside>
        </main>
    )
}