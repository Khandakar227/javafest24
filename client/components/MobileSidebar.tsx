import Link from "next/link";
import { navsmenu } from "@/lib/utils";
import { useRouter } from "next/router";

type MobileSidebarProps = {
    show: boolean;
    setShow: () => void;
};
const MobileSidebar = ({ show, setShow }: MobileSidebarProps) => {
    const router = useRouter();

    return (
        <div
            className={`fixed top-0 left-0 h-screen right-0 bottom-0 ${show ? "z-[1]" : "-z-10 visible"
                }`}
        >
            <div
                className="absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 z-0"
                onClick={setShow}
            />
            <div className="bg-white relative  h-screen overflow-auto max-w-60 py-4">
                <div className="grid gap-4">
                    {navsmenu.map(({ label, href, icon: Icon }) => (

                        <Link
                            href={href}
                            className={`flex gap-4 px-4 py-1 hover:bg-primary hover:text-white ${router.pathname == href ? "bg-green-700 text-white" : ""}`}
                            key={href}>
                            <Icon size={22} />
                            <span>{label}</span>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileSidebar;
