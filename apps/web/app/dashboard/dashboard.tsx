'use client'

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ListLinks } from "@/components/dashboard/ListLinks"
import { signOut } from "./signout"
import { Button } from "@/components/ui/button"
import { Eye, MousePointerClick, Percent, Share2 } from "lucide-react"
import { StatsCard } from "@/components/dashboard/StatusCard"

interface UserProfile {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
}

interface DashboardPageProps {
    user: UserProfile
}

export function DashboardPage({ user }: DashboardPageProps) {
    return (
        <div>
            <DashboardHeader
                title="Link Insights"
                subtitle={`Welcome back, ${user.name ?? "there"}. Here's what's happening today.`}
                period="Last 7 Days"
            />
            <form action={signOut}>
                <Button variant="destructive" size="sm">
                    Sign out
                </Button>
            </form>
            <main className="min-h-screen bg-zinc-950 p-8">
                <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Views"
                        total="8.4K"
                        status="+12%"
                        icon={<Eye className="h-5 w-5" />}
                    />

                    <StatsCard
                        title="Total Clicks"
                        total="4.2K"
                        status="+8%"
                        icon={<MousePointerClick className="h-5 w-5" />}
                    />

                    <StatsCard
                        title="CTR"
                        total="52%"
                        status="+2.4%"
                        icon={<Percent className="h-5 w-5" />}
                    />

                    <StatsCard
                        title="Shares"
                        total="892"
                        status="+15%"
                        icon={<Share2 className="h-5 w-5" />}
                    />
                </section>
            </main>
            <ListLinks />
        </div>
    )
}
