import Filters from "@/components/Filters";
import Layout from "@/components/Layout";
import { getDoctors } from "@/lib/api-client";
import { Doctor } from "@/types";
import { useRouter } from "next/router";
import Paginate from 'react-paginate';
import { FormEvent, useEffect, useState } from "react";


export default function Doctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([] as Doctor[]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(router.query);
  }, [router.query])

  useEffect(() => {
    getDoctors(page)
      .then(res => {
        setTotalPages(res.totalPages);
        setDoctors(res.content);
        console.log(res)
      })
      .catch(err => console.log(err))
  }, [page])

  function search(e: FormEvent) {
    e.preventDefault();
    const keyword = (e.target as HTMLFormElement).keyword.value;
    console.log(keyword);
  }

  function onPageChange(selectedItem: { selected: number; }) {
    console.log(selectedItem)
    setPage(selectedItem.selected);
  }
  return (
    <Layout>
      <div className={`shadow rounded-md p-4 m-4 bg-white`}>
        <h1 className="text-center font-bold text-2xl">Find Doctors Near You</h1>
        <form className="py-4 flex justify-center items-center" onSubmit={search}>
          <input type="search" name="keyword" id="search" placeholder="Look for doctors..." className="max-w-md w-full px-4 py-2 rounded shadow outline-none" />
          <button className="bg-primary text-white p-2 rounded-md ml-4">Search</button>
        </form>
        <Filters />
      </div>

      <div className="m-4 p-4 bg-white bg-opacity-5 shadow rounded">
        {
          doctors.map(d => (
            <div key={d._id} className="flex gap-4 items-center p-4 shadow rounded-md m-4 bg-white">
              <img src={d.photo} alt={d.name} className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="text-lg font-semibold">{d.name}</h2>
                <p className="text-sm">{d.speciality}</p>
                <p className="text-sm">{d.district}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="m-4 p-4 bg-white shadow rounded">
        <Paginate
          className="flex justify-center items-center gap-4 flex-wrap"
          pageLinkClassName={'px-4 py-2 rounded-md shadow outline-none bg-primary text-white text-sm hover:bg-green-700 hover:text-white'}
          pageCount={totalPages}
          breakLabel="..."
          nextLabel=">"
          previousLinkClassName="px-4 py-2 rounded-md outline-none hover:bg-green-700 hover:text-white"
          nextLinkClassName="px-4 py-2 rounded-md outline-none hover:bg-green-700 hover:text-white"
          pageRangeDisplayed={5}
          previousLabel="<"
          renderOnZeroPageCount={null}
          activeLinkClassName="bg-green-700 text-white"
          initialPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </Layout>
  )
}
