"use server"

import { createLinkApi } from '@/http/create-link'
import z from 'zod'

const schemaLink = z.object({
    title: z.string(),
    url: z.string(),
    icon: z.string(),
    position: z.coerce.number(),
})

export async function createLinkAction(formData: FormData) {
    const parsed = schemaLink.safeParse(
        Object.fromEntries(formData)
    )

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    const { title, url, icon, position } = parsed.data

    try {
        const response = await createLinkApi({
            title,
            url,
            icon,
            position
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