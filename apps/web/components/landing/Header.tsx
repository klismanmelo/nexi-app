'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="w-full overflow-hidden bg-black">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-white">
                    <div className="h-8 w-8 rounded-md bg-linear-to-br from-indigo-400 to-purple-500" />
                    <span className="text-lg font-semibold tracking-wide text-white">
                        NEXI
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="#features"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Features
                    </Link>
                    <Link
                        href="#showcase"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Showcase
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm text-zinc-400 transition hover:text-white"
                    >
                        Pricing
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/auth/signin"
                        className="text-sm text-zinc-300 transition hover:text-white"
                    >
                        Login
                    </Link>
                    <Button className="rounded-full bg-linear-to-r from-indigo-500 to-violet-500 px-5 hover:cursor-pointer">
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    )
}