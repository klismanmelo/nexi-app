import { isAuthenticated } from "./auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const auth = await isAuthenticated();

    if (auth) {
        redirect("/dashboard/overview");
    }

    return <>{children}</>;
}
