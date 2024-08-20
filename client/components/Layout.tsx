import { PropsWithChildren, useState } from "react";
import { Variants, motion } from "framer-motion"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const variants: Variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%", width: 0, display: "none" },
}

const poppins = Poppins({weight: ['800', '600', '500', '400'], subsets: ['latin']})

export default function Layout({ children }: PropsWithChildren) {
  const [showSidebar, setShowSidebar] = useState(true);

  function onMenuClicked() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className={`min-h-screen ${poppins.className}`}>
      <Navbar onMenuClicked={onMenuClicked} />
      <div className="flex">
        <div className={`md:block hidden`}>
          <motion.div
            animate={showSidebar ? "open" : "closed"}
            variants={variants}
            className="pb-4 shadow h-screen overflow-auto bg-white sticky top-0 left-0"
          >
            <Sidebar />
          </motion.div>
        </div>
        <div className="flex-auto bg-slate-100 min-h-screen">
          {children}
          <footer className="bg-[#71C171] text-gray-600 hover:text-white px-6 py-4 mt-8">
      
       
        <Link href="/"><Image src={'/cerena-logo.png'} alt="Cerena" width={45} height={45} /></Link>
        <p>&copy; {new Date().getFullYear()} Cerena. All rights reserved.</p>
    
    </footer>
        </div>
      </div>
    </div>
    
  )
}
