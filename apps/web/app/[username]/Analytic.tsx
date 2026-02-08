'use client'

import { useEffect, useRef } from 'react'

export function AnalyticsTracker({ userId }: { userId: string }) {
    const hasTracked = useRef(false)

    useEffect(() => {
        if (hasTracked.current) return
        hasTracked.current = true

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/page-view`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
    }, [userId])

    return null
}