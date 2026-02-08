'use server'

import { signWithPassword } from '@/http/signin-password'
import z from 'zod'
import { cookies } from 'next/headers'
import { signUpWithPasswordApi } from '@/http/signup-password'

const schemaSignIn = z.object({
    username: z.string('Unique Username validit'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export async function signUpPasswordForm(formData: FormData) {
    const parsed = schemaSignIn.safeParse(
        Object.fromEntries(formData)
    )

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    const { username, email, password } = parsed.data

    try {
        await signUpWithPasswordApi({ username, email, password })

        return { success: true };
    } catch {
        return { success: false, errors: "Invalid credentials" };
    }

}
