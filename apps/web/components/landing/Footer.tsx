import Link from 'next/link'
import { Instagram, Twitter, Github } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    {/* Brand */}
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-lg font-semibold tracking-tight">NEXI</span>
                        <span className="text-sm text-zinc-500">
                            © 2026 NEXI Design. All rights reserved.
                        </span>
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-5 text-zinc-400">
                        <Link href="#" className="hover:text-white">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-white">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-white">
                            <Github className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}