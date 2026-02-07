import { Sidebar } from "@/components/sidebar/Sidebar"
import { isAuthenticated } from "../auth/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/http/get-user-profile";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserProfile()
    return (
        <div className="flex min-h-screen position bg-zinc-950">
            <aside className="sticky top-0 h-screen w-64">
                <Sidebar user={user} />
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
