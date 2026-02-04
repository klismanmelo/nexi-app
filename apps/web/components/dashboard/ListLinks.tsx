import { Globe, Users, Instagram, Send } from "lucide-react"
import { LinkItem } from "./LinkItem"

export default function ListLinks() {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-white">
                    Your Links
                </h1>

                <button
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-indigo-500/40 transition"
                >
                    + Add New Link
                </button>
            </div>

            <div className="space-y-4">
                <LinkItem title="Portfolio" url="https://nexi.design/alex" clicks="1.240" icon={<Globe className="h-5 w-5" />} />
                <LinkItem title="Workshops" url="https://nexi.design/workshops" clicks="850" icon={<Users className="h-5 w-5" />} />
                <LinkItem title="Instagram" url="https://instagram.com/alex" clicks="3.400" icon={<Instagram className="h-5 w-5" />} />
                <LinkItem title="Contact" url="mailto:alex@nexi.design" clicks="120" icon={<Send className="h-5 w-5" />} />
            </div>
        </section>
    )
}
