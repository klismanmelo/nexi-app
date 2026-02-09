'use client'

import { useEffect, useRef } from 'react'

export function AnalyticsTracker({ userId }: { userId: string }) {
    const hasTracked = useRef(false)

    useEffect(() => {
        if (hasTracked.current) return
        hasTracked.current = true

        let sessionId = localStorage.getItem('session_id')

        if (!sessionId) {
            sessionId = crypto.randomUUID()
            localStorage.setItem('session_id', sessionId)
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/page-view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                sessionId,
            }),
        })
    }, [userId])

    return null
}