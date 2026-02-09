"use server"

import { UserProfileType } from "@/@types/User"
import { getShareApi } from "@/http/get-share"

interface ShareRequest {
    user: UserProfileType
}

interface DataShare {
    share_link: number
    share_profile: number
}

interface ShareResponse {
    dataShare: DataShare
}

export async function getDataShare({ user }: ShareRequest) {
    if (!user?.id) {
        throw new Error("User not authenticated")
    }

    try {
        const dataShare = await getShareApi()
        return { dataShare }
    } catch (error) {
        console.error("getDataShare error:", error)
        throw error // ← ESSENCIAL
    }
}