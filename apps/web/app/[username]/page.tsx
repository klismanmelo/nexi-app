import { AnalyticsTracker } from './Analytic'
import { notFound } from 'next/navigation'
import { TrackableLink } from './TrackbleLink'

interface PageProps {
    params: Promise<{
        username: string
    }>
}

interface Link {
    id: string,
    title: string
    url: string
    icon: string
    isVisible: boolean
}

interface UserProfile {
    id: string
    username: string | null
    biography: string
    avatarUrl: string | null
    links: Link[]
}

export default async function PageView({ params }: PageProps) {
    const { username } = await params

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${username}`,
        {
            cache: 'no-store',
        }
    )

    if (!response) {
        throw new Error('Usuário não encontrado')
    }

    const data: { user: UserProfile } = await response.json()
    const { user } = data

    if (!user) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center">
            <div className="w-full max-w-md px-4 py-10">

                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.username ?? 'Avatar'}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-xl">
                            {user.username?.[0]?.toUpperCase()}
                        </div>
                    )}

                    <h1 className="text-xl font-semibold">
                        @{user.username}
                    </h1>

                    <p className="text-sm text-zinc-400 text-center">
                        {user.biography}
                    </p>
                </div>
                <AnalyticsTracker userId={user.id} />
                {/* Links */}

                <div className="mt-8 flex flex-col gap-3">
                    {user.links
                        .filter(link => link.isVisible)
                        .map((link) => (
                            <TrackableLink
                                key={link.id}
                                linkId={link.id}
                                userId={user.id}
                                url={link.url}
                            >
                                {link.title}
                            </TrackableLink>
                        ))}
                </div>

            </div>
        </main>
    )
}