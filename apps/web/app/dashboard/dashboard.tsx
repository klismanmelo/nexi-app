'use client'

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ListLinks } from "@/components/dashboard/ListLinks"
import { signOut } from "./signout"
import { Button } from "@/components/ui/button"

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
            <ListLinks />
        </div>
    )
}
