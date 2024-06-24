import { Sheet } from "lucide-react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { navsmenu } from "@/lib/utils";

type MobileSidebarProps = {
    show: boolean;
    setShow:() => void;
}
const MobileSidebar = ({ show, setShow }:MobileSidebarProps) => {

    return (
        <div className={`fixed top-0 left-0 h-screen right-0 bottom-0 ${show ? "" : "-z-10 invisible"}`}>
            <div className="absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 z-0" onClick={setShow}/>
            <div className="bg-white relative z-10 h-screen overflow-auto max-w-60">
                <div className="grid gap-4">
                    {
                        navsmenu.map(n => <Link href={n.href} className="px-6 py-2 block hover:bg-primary hover:text-white" key={n.href}>{n.label}</Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MobileSidebar;