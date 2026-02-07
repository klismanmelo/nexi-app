"use server"

import { cookies } from "next/headers"
import { apiClient } from "./api-client"

interface LinkParms {
    linkId: string
}
export async function deleteLinkApi({ linkId }: LinkParms) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    const result = await apiClient.delete(`link/${linkId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    return result
}