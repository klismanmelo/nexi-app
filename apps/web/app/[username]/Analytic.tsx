'use client'

import { useEffect } from 'react'
import { trackPageView } from './action'

interface AnalyticsTrackerProps {
    userId: string
}

export function AnalyticsTracker({ userId }: AnalyticsTrackerProps) {
    useEffect(() => {
        trackPageView({ userId })
    }, [userId])

    return null
}