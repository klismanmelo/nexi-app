'use server'

import { signWithPassword } from '@/http/signin-password'
import z from 'zod'
import { cookies } from 'next/headers'

const schemaSignIn = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export async function signPasswordForm(formData: FormData) {
    const parsed = schemaSignIn.safeParse(
        Object.fromEntries(formData)
    )

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    const { email, password } = parsed.data

    try {
        const { token } = await signWithPassword({ email, password })
        const setCookie = await cookies()

        setCookie.set({
            name: "token_nexi",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 dias
        })

        return { success: true };
    } catch {
        return { success: false, errors: "Invalid credentials" };
    }

}
