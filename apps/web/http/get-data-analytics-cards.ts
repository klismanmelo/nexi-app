import { cookies } from 'next/headers'
import { apiClient } from './api-client'

interface DataAnalyticsCards {
    total_views: number
    total_visitors: number
    total_clicks: number
    ctr: number
}

interface AnalyticsResponse {
    dataAnalytics: DataAnalyticsCards
}

export async function getDataAnalyticsApi(): Promise<DataAnalyticsCards> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    try {
        const result = await apiClient
            .get("analytics-data", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<AnalyticsResponse>()

        return result.dataAnalytics
    } catch (error: any) {
        console.error("❌ Erro ao buscar analytics:", error)

        if (error?.response) {
            const text = await error.response.text()
            console.error("Response body:", text)
        }

        throw error
    }
}