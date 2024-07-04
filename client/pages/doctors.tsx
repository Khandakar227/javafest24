import Filters from "@/components/Filters";
import Layout from "@/components/Layout";
import { getDoctors } from "@/lib/api-client";
import { Poppins } from "next/font/google";
import { FormEvent, useEffect } from "react";

const poppins = Poppins({weight: ['800', '400'], subsets: ['latin']})

export default function Doctors() {
  useEffect(() => {
    getDoctors()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [])

  function search(e:FormEvent) {
    e.preventDefault();
    const keyword = (e.target as HTMLFormElement).keyword.value;
    console.log(keyword);
  }
  return (
    <Layout>
        <div className={`${poppins.className} shadow rounded-md p-4 m-4 bg-white`}>
            <h1 className="text-center font-bold text-2xl">Find Doctors Near You</h1>
            <form className="py-4 flex justify-center items-center" onSubmit={search}>
                <input type="search" name="keyword" id="search" placeholder="Look for doctors..." className="max-w-md w-full px-4 py-2 rounded shadow outline-none" />
                <button className="bg-primary text-white p-2 rounded-md ml-4">Search</button>
            </form>
            <Filters/>
        </div>
    </Layout>
  )
}
