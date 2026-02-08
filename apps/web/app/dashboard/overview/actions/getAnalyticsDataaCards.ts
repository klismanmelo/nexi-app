"use server"

import { UserProfileType } from "@/@types/User"
import { getDataAnalyticsApi } from "@/http/get-data-analytics-cards"

interface DataAnalyticsCards {
    total_views: number
    total_visitors: number
    total_clicks: number
    ctr: number
}

interface AnalyticsRequest {
    user: UserProfileType
}

export async function getDataAnalyticsAction(
    { user }: AnalyticsRequest
): Promise<DataAnalyticsCards> {
    if (!user?.id) {
        throw new Error("User not authenticated")
    }

    try {
        const data = await getDataAnalyticsApi()
        return data
    } catch (error) {
        console.error("getDataAnalyticsAction error:", error)

        return {
            total_views: 0,
            total_visitors: 0,
            total_clicks: 0,
            ctr: 0,
        }
    }
}