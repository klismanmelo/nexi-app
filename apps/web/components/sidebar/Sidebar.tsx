'use client'

import {
    LayoutGrid,
    BarChart3,
    User,
    Settings,
    LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarItem } from "./SidebarItem"
import { signOut } from "@/app/dashboard/overview/signout"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserProfile {
    id: string
    name: string | null
    username: string
    email: string
    avatarUrl: string | null
}

interface DashboardPageProps {
    user: UserProfile
}

export function Sidebar({ user }: DashboardPageProps) {
    const pathname = usePathname()
    return (
        <aside className="flex h-screen w-65 flex-col border-r border-white/10 bg-zinc-950 px-4 py-6">
            {/* Logo */}
            <div className="mb-10 flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-md bg-linear-to-br from-indigo-400 to-purple-500" />
                <span className="text-lg font-semibold tracking-wide text-white">
                    NEXI
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                <Link href="/dashboard/overview">
                    <SidebarItem
                        icon={<LayoutGrid className="h-5 w-5" />}
                        label="Overview"
                        active={pathname === "/dashboard/overview"}
                    />
                </Link>

                <Link href="/dashboard/analise">
                    <SidebarItem
                        icon={<BarChart3 className="h-5 w-5" />}
                        label="Analytics"
                        active={pathname === "/dashboard/analise"}
                    />
                </Link>
                <SidebarItem
                    icon={<User className="h-5 w-5" />}
                    label="Profile"
                //active={pathname === ""}
                />
                <SidebarItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                //active={pathname === ""}
                />
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* User */}
            <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-3 px-2 py-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl ?? ""} />
                        <AvatarFallback>AM</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                            {user.username ?? "Fulano"}
                        </p>
                        <p className="text-xs text-zinc-400">
                            {user.email}
                        </p>
                    </div>
                </div>

                <form action={signOut}>
                    <button type="submit" className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </form>

            </div>
        </aside>
    )
}
