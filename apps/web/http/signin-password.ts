import { apiClient } from './api-client'

interface SignInRequest {
    email: string,
    password: string
}

interface SignInResponse {
    token: string
}

export async function signWithPassword({
    email,
    password
}: SignInRequest) {
    const result = await apiClient.post('session/password', {
        json: {
            email,
            password
        }
    }).json<SignInResponse>()

    return result
}