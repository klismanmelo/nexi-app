import { redirect } from "next/navigation"
import { isAuthenticated } from "../auth/auth"
import { Button } from "@/components/ui/button"
import { signOut } from "./signout"

export default async function Dashboard() {

    const auth = await isAuthenticated()

    if (!auth) {
        redirect("/auth/signin")
    }
    return (
        <div>
            <h1>Welcome in Your Dashboard Mr. John Doen</h1>
            <form action={signOut}>
                <Button type="submit" variant="destructive">
                    SignOut
                </Button>
            </form>
        </div>
    )
}
