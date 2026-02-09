'use client'

const API_URL = "http://localhost:3332"

export async function shareProfile({
    username,
    userId,
    type,
}: {
    username: string
    userId: string
    type: string
}) {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3332'

    const url = `${baseUrl}/${username}`

    console.log(url, userId)

    // 1️⃣ registra o evento (não bloqueia a UI)
    fetch(`${API_URL}/share`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            userId,
            type,
        }),
    }).catch(() => {
        // falha silenciosa — analytics nunca deve quebrar UX
    })

    // 2️⃣ tenta compartilhar
    if (navigator.share) {
        try {
            await navigator.share({
                title: `@${username}`,
                text: 'Olha esse perfil 👀',
                url,
            })
        } catch {
            // usuário cancelou — tudo bem
        }
    } else {
        // 3️⃣ fallback
        await navigator.clipboard.writeText(url)
    }
}