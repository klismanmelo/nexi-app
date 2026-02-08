"use server"

import { updateUserProfileApi } from "@/http/update-user-profile"
import z from "zod"

const schemaLink = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    biography: z.string().optional()
})

export async function updateUserPRofile(formData: FormData) {
    const parsed = schemaLink.safeParse(
        Object.fromEntries(formData)
    )

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    const { name, phoneNumber, biography } = parsed.data

    try {
        await updateUserProfileApi({
            name,
            phoneNumber,
            biography
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