import { PropsWithChildren, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


export default function Layout({children}:PropsWithChildren) {
  const [showSidebar, setShowSidebar] = useState(true);

  function onMenuClicked() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className="min-h-screen">
        <Navbar onMenuClicked={onMenuClicked}/>
        <div className="flex">
            <div className={`${showSidebar ? "md:block" : "md:hidden"} py-4 shadow h-screen overflow-auto hidden bg-white`}>
                <Sidebar />
            </div>
            <div className="flex-auto bg-slate-100 h-screen">
                {children}
            </div>
        </div>
    </div>
  )
}
