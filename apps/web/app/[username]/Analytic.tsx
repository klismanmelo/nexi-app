'use client'

import { useEffect } from 'react'

export function AnalyticsTracker({ userId }: { userId: string }) {
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/page-view`, {
            method: 'POST',
            credentials: 'include', // 🔥 ESSENCIAL
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
    }, [userId])

    return null
}