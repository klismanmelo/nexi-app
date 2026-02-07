"use server"

import { deleteLinkApi } from '@/http/delete-link'
import z from 'zod'

const schemaDeleteLink = z.object({
    linkId: z.string(),
})

export async function deleteLinkAction(formData: FormData) {
    const parsed = schemaDeleteLink.safeParse(
        Object.fromEntries(formData)
    )

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    const { linkId } = parsed.data

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