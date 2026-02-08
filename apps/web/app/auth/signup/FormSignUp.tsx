'use client'

import { signUpPasswordForm } from "./action"
import { useState, useTransition } from "react"
import { useRouter } from 'next/navigation'
import { Loader2, Mail, Lock, Github, AtSign } from "lucide-react"

export function FormSignUp() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const route = useRouter()

    async function action(formData: FormData) {

        startTransition(async () => {
            const response = await signUpPasswordForm(formData)
            if (!response.success) {
                setError("Email ou senha inválidos")
                return
            }

            route.replace('/auth/signin')
        })

    }

    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white">
                    Welcome
                </h1>
                <p className="text-sm text-zinc-400 mt-2">
                    Enter your credentials to create account in NEXI Project
                </p>
            </div>

            {/* Form */}
            <form action={action} className="space-y-5">
                {/* Username */}
                <div className="space-y-2">
                    <label className="text-sm text-zinc-300">Username</label>
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 focus-within:border-indigo-500">
                        <AtSign className="h-4 w-4 text-zinc-400" />
                        <input
                            type="username"
                            name="username"
                            placeholder="usernameUnique"
                            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                        />
                    </div>
                </div>
                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm text-zinc-300">Email</label>
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 focus-within:border-indigo-500">
                        <Mail className="h-4 w-4 text-zinc-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="alex@nexi.design"
                            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-zinc-300">Password</label>
                        <button
                            type="button"
                            className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 focus-within:border-indigo-500">
                        <Lock className="h-4 w-4 text-zinc-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                        />
                    </div>
                </div>

                {/* Submit */}
                {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                >
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In →'}
                </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3 text-xs text-zinc-500">
                <div className="h-px w-full bg-zinc-700" />
                OR CONTINUE WITH
                <div className="h-px w-full bg-zinc-700" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 py-2 text-sm text-white hover:bg-zinc-900 transition"
                >
                    <Github className="h-4 w-4" />
                    Github
                </button>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 py-2 text-sm text-white hover:bg-zinc-900 transition"
                >
                    <span className="h-4 w-4 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                        G
                    </span>
                    Google
                </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-zinc-400">
                Do you have an account?{" "}
                <a
                    href="/auth/signin"
                    className="text-indigo-400 hover:text-indigo-300 transition"
                >
                    SignIn one now
                </a>
            </p>
        </div>
    )
}
