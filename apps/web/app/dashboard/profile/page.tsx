import { isAuthenticated } from "@/app/auth/auth"
import { CardProfile } from "@/components/profile/CardProfile"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../overview/actions/get-current-user"

export default async function ProfilePage() {
    const auth = await isAuthenticated()

    if (!auth) {
        redirect("/auth/signin")
    }

    const { success, user } = await getCurrentUser()

    if (!success || !user) {
        redirect("/auth/signin")
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-white">Edit Profile</h1>
                <p className="text-sm text-zinc-400">
                    Manage your public identity and account details.
                </p>
            </div>
            <CardProfile user={user} />

        </div>
    )
}