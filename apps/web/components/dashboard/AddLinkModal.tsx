'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { createLinkAction } from "@/app/dashboard/overview/actions/createLinkAction"
import { Loader2 } from "lucide-react"

interface AddLinkModalProps {
    onLinkCreated: () => void
}

export function AddLinkModal({ onLinkCreated }: AddLinkModalProps) {
    const [error, setError] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    async function handleAddLink(formData: FormData) {
        setError(null)

        startTransition(async () => {
            const response = await createLinkAction(formData)

            if (!response.success) {
                setError("Erro ao criar link")
                return
            }

            // ✅ avisa a lista
            onLinkCreated()

            // ✅ fecha modal
            setIsOpen(false)
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <DialogTrigger asChild>
                <button className="rounded-full border-2 border-dashed border-white/10 px-4 py-2 text-sm text-white hover:border-indigo-500/40 transition">
                    + Add New Link
                </button>
            </DialogTrigger>

            {/* Modal */}
            <DialogContent className="bg-zinc-950 border border-white/10 text-amber-50">
                <DialogHeader>
                    <DialogTitle>Add new link</DialogTitle>
                    <DialogDescription>
                        Create a new link to show on your profile.
                    </DialogDescription>
                </DialogHeader>

                <form action={handleAddLink} className="space-y-4">
                    <Input name="title" placeholder="Title" required />
                    <Input name="url" placeholder="URL" required />

                    <div className="grid grid-cols-2 gap-4">
                        <Input name="icon" placeholder="Icon" />
                        <Input
                            name="position"
                            placeholder="Position"
                            type="number"
                            required
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="hover:bg-indigo-600"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isPending ? "Saving..." : "Save Link"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
