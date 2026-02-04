'use client'

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

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
        </div>
    )
}
