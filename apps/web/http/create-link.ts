import { cookies } from 'next/headers'
import { apiClient } from './api-client'

interface LinkRequest {
    title: string,
    url: string,
    icon: string,
    position: number,
}

interface LinkResponse {
    message: string
}
export async function createLinkApi({
    title,
    url,
    icon,
    position
}: LinkRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token_nexi")?.value

    if (!token) {
        throw new Error("Token não encontrado")
    }
    const result = await apiClient.post('link', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        json: {
            title,
            url,
            icon,
            position
        }
    }).json<LinkResponse>()

    return result
}