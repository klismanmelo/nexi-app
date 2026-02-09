'use client'

interface TrackableLinkProps {
    linkId: string
    userId: string
    url: string
    children: React.ReactNode
}

export function TrackableLink({
    linkId,
    userId,
    url,
    children,
}: TrackableLinkProps) {
    async function handleClick() {
        let sessionId = localStorage.getItem('session_id')

        console.log("Tetando json: ", sessionId, linkId, userId)

        // dispara analytics
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${linkId}/click`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                sessionId,
            }),
        }).catch(console.error)

        // redireciona
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3 text-center font-medium hover:bg-zinc-800 transition"
        >
            {children}
        </button>
    )
}