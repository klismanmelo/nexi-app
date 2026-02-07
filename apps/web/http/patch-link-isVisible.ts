"use server"

import { cookies } from "next/headers"
import { apiClient } from "./api-client"

interface UpdateLinkVisible {
    linkId: string,
    isVisible: boolean
}

interface LinkResponse {
    message: string
}

export async function updateLinkVisibleApi({ linkId, isVisible }: UpdateLinkVisible) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    const result = await apiClient.patch(`link/${linkId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        json: {
            linkId,
            isVisible
        }
    }).json<LinkResponse>()

    return result
}