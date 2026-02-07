'use server'

import { cookies } from "next/headers"
import { apiClient } from "./api-client"

interface ListLinkUserResponse {
    id: string,
    title: string,
    url: string,
    position: number,
    icon: string | null
}

export async function listLinkUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    try {
        const result = await apiClient.get("links", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).json<ListLinkUserResponse[]>()

        return result

    } catch (error: any) {
        console.error("❌ Erro na API:", error)

        if (error.response) {
            const text = await error.response.text()
            console.error("Response body:", text)
        }

        throw error
    }
}