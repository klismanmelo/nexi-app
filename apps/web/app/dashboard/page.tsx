import { redirect } from "next/navigation"
import { isAuthenticated } from "../auth/auth"
import { getCurrentUser } from "./get-current-user"
import { DashboardPage } from "./dashboard"

export default async function Page() {
    const auth = await isAuthenticated()

    if (!auth) {
        redirect("/auth/signin")
    }

    const { success, user } = await getCurrentUser()

    if (!success || !user) {
        redirect("/auth/signin")
    }

    return <DashboardPage user={user} />
}
