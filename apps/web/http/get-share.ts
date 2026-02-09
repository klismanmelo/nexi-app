import { cookies } from 'next/headers'
import { apiClient } from './api-client'

interface DataShare {
    share_link: number,
    share_profile: number,
}

interface ShareResponse {
    data_share: DataShare
}

export async function getShareApi(): Promise<DataShare> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    try {
        const result = await apiClient
            .get("share", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<ShareResponse>()
        return result.data_share
    } catch (error: any) {
        console.error("❌ Erro ao buscar analytics:", error)

        if (error?.response) {
            const text = await error.response.text()
            console.error("Response body:", text)
        }

        throw error
    }
}