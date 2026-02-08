import { FormSignUp } from "./FormSignUp";

export default function SignUpPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-175 bg-purple-500/20 rounded-full blur-[160px]" />
                <div className="absolute bottom-0 right-1/4 w-250 h-250 bg-blue-500/20 rounded-full blur-[160px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Logo */}
                <div className="mb-10 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-linear-to-br from-indigo-400 to-purple-500" />
                    <span className="text-xl font-semibold text-white tracking-wide">
                        NEXI
                    </span>
                </div>

                <FormSignUp />
            </div>
        </main>
    )
}
