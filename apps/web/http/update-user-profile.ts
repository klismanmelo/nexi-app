"use server"

import { cookies } from "next/headers"
import { apiClient } from "./api-client"

interface UpdateUserProfile {
    name?: string,
    phoneNumber?: string,
    biography?: string
}

interface LinkResponse {
    message: string
}

export async function updateUserProfileApi({ name, phoneNumber, biography }: UpdateUserProfile) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }

    const result = await apiClient.patch('profile', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        json: {
            name,
            phoneNumber,
            biography
        }
    }).json<LinkResponse>()

    return result
}