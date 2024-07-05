import { navsmenu } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();

    return (
    <div className="grid gap-4">
        {
            navsmenu.map(n => <Link href={n.href}
              className={`w-full min-w-60 px-6 py-2 block hover:bg-primary hover:text-white ${router.pathname == n.href ? "bg-green-700 text-white" : ""}`}
              key={n.href}>{n.label}</Link>)
        }
    </div>
  )
}
