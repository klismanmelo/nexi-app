'use client'

import Image from 'next/image'
import { Share2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CopyButton } from '../buttons/CopyButtonText'
import { shareProfile } from '../buttons/SharePage'

interface LinkItem {
    id: string
    title: string
    url: string
    isVisible: boolean
    icon?: React.ReactNode
}

interface LivePreviewPhoneProps {
    user: {
        id: string
        username: string
        role: string
        avatarUrl: string
    }
    links: LinkItem[]
}

export function LivePreviewPhone({ user, links }: LivePreviewPhoneProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Live Preview</h3>
                <Link href={`/${user.username}`} className="text-sm text-indigo-400 hover:text-indigo-300">
                    {user.username}
                </Link>
            </div>

            <div className="relative mx-auto rounded-[3rem] bg-black p-2 shadow-2xl">
                {/* Phone body */}
                <div className="w-72 min-h-140 rounded-[2.5rem] bg-linear-to-b from-indigo-950 via-indigo-900 to-indigo-950 px-5 pt-6 pb-8">
                    {/* Notch */}
                    <div className="mx-auto mb-6 h-1.5 w-20 rounded-full bg-black/60" />

                    {/* Profile */}
                    <div className="flex flex-col items-center text-center">
                        {user.avatarUrl ? (
                            <Image
                                src={user.avatarUrl}
                                alt={user.username}
                                width={80}
                                height={80}
                                className="rounded-full border-2 border-white/30 shadow-lg"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10">
                                <User className="h-9 w-9 text-white/70" />
                            </div>
                        )}

                        <h4 className="mt-4 text-lg font-semibold text-white">
                            @{user.username}
                        </h4>
                        <span className="text-[11px] uppercase tracking-widest text-white/60">
                            {user.role}
                        </span>
                    </div>

                    {/* Links */}
                    <div className="mt-8 space-y-3">
                        {links
                            .filter(link => link.isVisible)
                            .map((link) => (
                                <a key={link.id} href={link.url} className="block">
                                    <div
                                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur-md transition hover:bg-white/15"
                                    >
                                        <span className="flex items-center justify-center rounded-full bg-white/10 opacity-80">
                                            {link.icon}
                                        </span>
                                        <span className="leading-tight">{link.title}</span>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>


            {/* Footer Action */}
            <div className="mt-6 flex items-center gap-3">
                <button
                    onClick={() =>
                        shareProfile({
                            username: user.username!,
                            userId: user.id,
                            type: "PROFILE"
                        })
                    }
                    className="rounded-full bg-white/5 p-3 text-white hover:bg-white/10"
                >
                    <Share2 size={18} />
                </button>


                <CopyButton text={`http://localhost:3000/${user.username}`} />

            </div>
        </div>
    )
}