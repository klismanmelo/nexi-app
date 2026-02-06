import { redirect } from "next/navigation";
import { isAuthenticated } from "../auth/auth";

export default async function Dashboard() {
    const auth = await isAuthenticated();

    if (auth) {
        redirect("/dashboard/overview");
    }
    redirect("/auth/signin")
}