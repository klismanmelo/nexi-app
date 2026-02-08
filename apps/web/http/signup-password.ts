import { apiClient } from './api-client'

interface SignInRequest {
    username: string
    email: string,
    password: string
}

interface SignUpResponse {
    message: string
}

export async function signUpWithPasswordApi({
    username,
    email,
    password
}: SignInRequest) {
    const result = await apiClient.post('user', {
        json: {
            username,
            email,
            password
        }
    }).json<SignUpResponse>()

    return result
}