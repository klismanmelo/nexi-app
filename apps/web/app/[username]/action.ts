'use server'

import { headers } from 'next/headers'
import crypto from 'crypto'

interface TrackPageViewInput {
    userId: string
}

export async function trackPageView({ userId }: TrackPageViewInput) {
    const headersList = await headers()

    const userAgent = headersList.get('user-agent')
    const referrer = headersList.get('referer')
    const ip =
        headersList.get('x-forwarded-for') ??
        headersList.get('x-real-ip')

    const sessionId = crypto.randomUUID()

    console.log('📊 PAGE VIEW TRACKED')
    console.log({
        userId,
        sessionId,
        ip,
        userAgent,
        referrer,
        createdAt: new Date(),
    })

    return { ok: true }
}