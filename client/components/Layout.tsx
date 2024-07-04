import { PropsWithChildren, useState } from "react";
import { Variants, motion } from "framer-motion"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const variants: Variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%", width: 0, display: "none" },
}

export default function Layout({ children }: PropsWithChildren) {
  const [showSidebar, setShowSidebar] = useState(true);

  function onMenuClicked() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className="min-h-screen">
      <Navbar onMenuClicked={onMenuClicked} />
      <div className="flex">
        <div className={`md:block hidden`}>
          <motion.nav
            animate={showSidebar ? "open" : "closed"}
            variants={variants}
            className="py-4 shadow h-screen overflow-auto bg-white"
          >
            <Sidebar />
          </motion.nav>
        </div>
        <div className="flex-auto bg-slate-100 h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}
