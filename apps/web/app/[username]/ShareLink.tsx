'use client'

import { shareProfile } from "@/components/buttons/SharePage"
import { Share2 } from "lucide-react"

export function ButtonShareLink({
    username,
    userId,
    type
}: {
    username: string | null,
    userId: string,
    type: string
}) {
    return (
        <button
            onClick={() =>
                shareProfile({
                    username: username!,
                    userId,
                    type: "LINK"
                })
            }
            className="rounded-full bg-white/5 p-3 text-white hover:bg-white/10"
        >
            <Share2 size={18} />
        </button>
    )
}