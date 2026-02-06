import { Sidebar } from "@/components/sidebar/Sidebar"
import { isAuthenticated } from "../auth/auth";
import { redirect } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
