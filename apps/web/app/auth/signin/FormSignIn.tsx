'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"

import { signPasswordForm } from "./action"
import { useState, useTransition } from "react"
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"

export function FormSignin() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const route = useRouter()

    async function action(formData: FormData) {

        startTransition(async () => {
            const response = await signPasswordForm(formData)
            if (!response.success) {
                setError("Email ou senha inválidos")
                return
            }

            route.replace('/dashboard')
        })

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold text-zinc-100">
                        Entrar
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Acesse sua conta usando email e senha
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={action} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-400">{error}</p>
                        )}

                        <Button type="submit" className="w-full">
                            {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : 'Enter'}
                        </Button>

                        <p className="text-center text-sm text-zinc-400">
                            Não tem uma conta?{" "}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4"
                            >
                                Criar conta
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
