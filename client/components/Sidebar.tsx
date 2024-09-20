import { getBasePath, navsmenu } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (

    <div className="grid gap-4 py-4 pr-3">
      {
        navsmenu.map(({ href, label, icon: Icon }) => <Link href={href}
          className={`flex gap-4 w-full min-w-60 px-5 py-2 border border-green-300 rounded-r-full  hover:bg-primary hover:text-white ${getBasePath(router.pathname) == href ? "bg-green-700 text-white" : ""}`}
          key={href}>
          <Icon size={22} />
          <span >{label}</span>
        </Link>)
      }
    </div>


  )
}
