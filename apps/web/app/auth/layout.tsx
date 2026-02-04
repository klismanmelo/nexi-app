import { isAuthenticated } from "./auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const auth = await isAuthenticated();

    const headersList = await headers();

    if (auth) {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
