import { navsmenu } from "@/lib/utils";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="grid gap-4">
        {
            navsmenu.map(n => <Link href={n.href} className="w-full min-w-60 px-6 py-2 block hover:bg-primary hover:text-white" key={n.href}>{n.label}</Link>)
        }
    </div>
  )
}
