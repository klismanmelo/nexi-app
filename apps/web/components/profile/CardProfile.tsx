'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { User, AtSign, Mail, Phone, Camera, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserProfileType } from '@/@types/User'
import { useCallback, useState, useTransition } from 'react'
import { updateUserPRofile } from '@/app/dashboard/profile/action'
import { useRouter } from 'next/navigation'

interface CardProfileProps {
    user: UserProfileType
}
export function CardProfile({ user }: CardProfileProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()


    async function handleUpdateUserProfile(formData: FormData) {
        setError(null)

        startTransition(async () => {
            const response = await updateUserPRofile(formData)

            if (!response.success) {
                setError("Erro ao criar link")
                return
            }
            router.refresh()
        })
    }

    return (
        <div className="grid gap-6 pt-9 md:grid-cols-[320px_1fr]">
            {/* LEFT CARD */}
            <Card className="flex flex-col items-center gap-4 rounded-2xl border-white/10 bg-black/40 p-6">
                <Avatar className="h-30 w-30 mt-9">
                    <AvatarImage src={user.avatarUrl ?? ""} />
                    <AvatarFallback>AM</AvatarFallback>
                </Avatar>

                <div className="text-center">
                    <h2 className="text-lg font-medium text-white">{user.name}</h2>
                    <span className="text-sm text-zinc-400">@{user.username}</span>
                </div>

                <Button
                    className="w-full gap-2 border-white/10 text-white hover:border-indigo-500/40"
                >
                    <Camera className="h-4 w-4" />
                    Change Photo
                </Button>
            </Card>

            {/* RIGHT CARD */}
            <form action={handleUpdateUserProfile}>≈
                <Card className="rounded-2xl border-white/10 bg-black/40 p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-white">
                            General Information
                        </h3>
                        <p className="text-sm text-zinc-400">
                            Update your public profile details
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <Label className="text-zinc-300">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    name='name'
                                    className="pl-10 text-amber-50"
                                    defaultValue={user.name ?? ""}
                                    placeholder={user.name ?? ""}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label className="text-zinc-300">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    name='phoneNumber'
                                    className="pl-10 text-amber-50"
                                    defaultValue={user.phoneNumber}
                                    placeholder={user.phoneNumber ?? "+1 (555) 000-0000"}
                                />
                            </div>
                        </div>

                        {/* BIOGRAPHY (NOVO CAMPO) */}
                        <div className="space-y-1 md:col-span-2">
                            <Label className="text-zinc-300">Biography</Label>
                            <Textarea
                                name='biography'
                                placeholder={user.biography ?? ""}
                                className="min-h-30 text-amber-50"
                                defaultValue={user.biography}
                            />
                            <p className="text-xs text-zinc-500">
                                This bio will be visible on your public profile.
                            </p>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex items-center justify-end gap-4">
                        <Button className="text-zinc-400 hover:text-white">
                            Cancel
                        </Button>
                        {error && (
                            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                                {error}
                            </div>
                        )}
                        <Button type='submit' className="bg-indigo-600 hover:bg-indigo-500">
                            {isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isPending ? "Saving..." : "Save Change"}
                        </Button>
                    </div>
                </Card >
            </form>
        </div >
    )
}