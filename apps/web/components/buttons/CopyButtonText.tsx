'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
    text: string
}

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)

            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Erro ao copiar:', err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className="
        flex justify-center gap-2 w-60
        rounded-full bg-indigo-500
        px-4 py-2 text-sm text-white
        hover:border-indigo-500/40 transition
      "
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copiado!
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    Copy link
                </>
            )}
        </button>
    )
}