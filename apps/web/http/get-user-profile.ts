import { cookies } from 'next/headers'
import { apiClient } from './api-client'
import { UserProfileType } from '@/@types/User'

interface SessionPasswordResponse {
    user: {
        id: string
        name: string | null
        username: string
        biography: string
        email: string
        avatarUrl: string | null
    }
}


export async function getUserProfile(): Promise<UserProfileType> {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    try {
        const result = await apiClient
            .get("profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<SessionPasswordResponse>()

        return result.user
    } catch (error: any) {
        console.error("❌ Erro na API:", error)

        if (error.response) {
            const text = await error.response.text()
            console.error("Response body:", text)
        }

        throw error
    }
}