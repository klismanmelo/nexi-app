'use server'

import { getUserProfile } from "@/http/get-user-profile"


export async function getCurrentUser() {
    try {
        const user = await getUserProfile()

        return {
            success: true,
            user,
        }
    } catch (error) {
        console.error("❌ Erro ao buscar usuário:", error)

        return {
            success: false,
            user: null,
        }
    }
}
