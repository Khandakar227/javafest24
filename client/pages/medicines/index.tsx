import Layout from "@/components/Layout";
import { getMedicines } from "@/lib/api-client";
import { Medicine } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";

export default function Medicines() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [medicines, setMedicines] = useState([] as Medicine[]);

  useEffect(() => {
    getMedicines(keyword, page)
      .then(res => {
        console.log(res);
        setTotalPage(res.totalPages);
        setMedicines(res.content || []);
      })
  }, [keyword, page])


  function onPageChange(selectedItem: { selected: number; }) {
    console.log("selectedItem ", selectedItem)
    setPage(selectedItem.selected);
  }

  function onSearch(e:FormEvent) {
    e.preventDefault();
  }

  function onSearchBarChange(e:ChangeEvent) {
    setKeyword((e.target as HTMLInputElement).value);
  }
  return (
    <>
      <Head>
        <title>Medicines - Cerena</title>
      </Head>
      <Layout>
        <div className={`shadow rounded-md px-4 py-12 m-4 bg-white text-center`}>
          <h1 className="font-bold md:text-3xl text-2xl">Know about what medicines your taking</h1>
          <form onSubmit={onSearch} className='max-w-4xl mx-auto flex gap-4 justify-center items-center py-5'>
            <input value={keyword} onChange={onSearchBarChange} type="search" name="keyword" id="search-medicine" placeholder="Look for medicine..." className='px-2 py-1 rounded shadow border w-full outline-none focus:outline-primary' />
            <button className='bg-primary p-2 rounded'><FiSearch size={20} /></button>
          </form>

          <div className="py-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-4">
              {
                medicines.map(medicine =>
                  <div className="shadow rounded text-left p-4" key={medicine.id}>
                    <Link href={`/medicines/${medicine.slug}`} className="block">
                      <h1 className="font-semibold text-xl">{medicine.brandName} {medicine.dosageForm}</h1>
                      <p className="text-xs text-gray-600">{medicine.generic}</p>
                      <p className="text-sm py-1">Manufacturer: {medicine.manufacturer}</p>
                      <p className="pt-2">{medicine.price}</p>
                    </Link>
                  </div>)
              }
            </div>
            
            <div className="pt-8">
                    <ReactPaginate
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
                    activeLinkClassName="!bg-green-700 !text-white"
                    initialPage={page}
                    onPageChange={onPageChange}
                    />
                </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
