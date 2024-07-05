import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";
import { useUser, userUserLoaded } from "../hooks/user";
import Avatar from "./Avatar";

type NavbarProps = {
    onMenuClicked: () => void
}

export default function Navbar(props:NavbarProps) {
  const [user, _] = useUser();
  const [loaded, __] = userUserLoaded();

  const [show, setShow] = useState(false);
  return (
    <div className="flex justify-between items-center py-2 px-8 bg-primary">
        <Link href="/"><Image src={'/cerena-logo.png'} alt="Cerena" width={45} height={45} /></Link>
        <div className="flex gap-4 justify-center items-center">
          {
            !loaded ? <span className="text-sm font-semibold">Loading...</span> : user ? <Avatar/>
            :
            <Link href={"/login"} className="rounded-md px-4 py-1 bg-green-900 text-white block">Login</Link>
          }
            <button className="hidden md:block" onClick={props.onMenuClicked}><GiHamburgerMenu size={26}/></button>
            <button className="md:hidden" onClick={() => setShow(!show)}><GiHamburgerMenu size={26}/></button>
        </div>
        <MobileSidebar show={show} setShow={() => setShow(!show)}/>
    </div>
  )
}

