import Link from 'next/link'
import {motion} from 'framer-motion'
import React, { useState } from 'react'
import { useUser } from '@/hooks/user';

export default function Avatar() {
    const [show, setShow] = useState(false);
    const [user, _] = useUser();
  return (
    <div className='relative'>
        <button onClick={() => setShow(!show)} className="bg-green-950 rounded-full p-4"><span className="h-4 w-4" /></button>
        <motion.div animate={show ? "open" : "closed"} variants={{
            open: {opacity: 1, y: 0},
            closed: {opacity: 0, y: "-100%", width: 0, display: "none"}
        }} className='min-w-40 right-0 p-2 rounded bg-white shadow-md absolute'>
            <ul>
                {
                    user?.role == 'ADMIN' && (<li className='border-b'><Link className='py-2 block font-semibold' href="/admin">Admin</Link></li>)
                }
                <li className='border-b'><Link className='py-2 block font-semibold' href="/profile">Profile</Link></li>
                <li className='border-b'><Link className='py-2 block font-semibold' href="/logout">Logout</Link></li>
            </ul>
        </motion.div>
    </div>
  )
}
