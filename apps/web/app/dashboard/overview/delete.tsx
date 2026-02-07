"use server"

import { deleteLinkApi } from '@/http/delete-link'

interface DeleteLinkRequest {
    linkId: string
}

export async function deleteLinkAction({ linkId }: DeleteLinkRequest) {

    try {
        const response = await deleteLinkApi({
            linkId
        })

        return { success: true };
    } catch (error) {
        console.error("ERRO createLinkAction:", error)
        return {
            success: false,
            errors: "Erro ao criar link"
        }
    }
}