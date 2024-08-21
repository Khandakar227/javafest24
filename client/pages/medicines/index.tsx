import Layout from "@/components/Layout";
import { getMedicines } from "@/lib/api-client";
import { Medicine } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";

export default function Medicines() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);
  const [medicines, setMedicines] = useState([] as Medicine[]);

  useEffect(() => {
    getMedicines(keyword, page).then((res) => {
      console.log(res);
      setTotalPage(res.totalPages);
      setMedicines(res.content || []);
    });
  }, [keyword, page]);

  function onPageChange(selectedItem: { selected: number }) {
    console.log("selectedItem ", selectedItem);
    setPage(selectedItem.selected);
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();
  }

  function onSearchBarChange(e: ChangeEvent) {
    setKeyword((e.target as HTMLInputElement).value);
  }
  return (
    <>
      <Head>
        <title>Medicines - Cerena</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <div
          className={`shadow rounded-md px-4 py-12 m-4 bg-white text-center`}
        >
          <h1
            className="font-bold md:text-3xl text-2xl text-gray-700"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            What's in Your Prescription?
          </h1>
          <form
            onSubmit={onSearch}
            className="max-w-4xl mx-auto flex gap-4 justify-center items-center py-5"
          >
            <input
              value={keyword}
              onChange={onSearchBarChange}
              type="search"
              name="keyword"
              id="search-medicine"
              placeholder="Look for medicine..."
              className="px-2 py-1 rounded shadow border w-full outline-none focus:outline-primary"
            />
            <button className="bg-primary p-2 rounded">
              <FiSearch size={20} />
            </button>
          </form>

          <div className="py-4 px-10">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-stretch gap-4 ">
              {medicines.map((medicine) => (
                <div
                  className="shadow rounded text-left p-4 flex-col justify-between border border-primary hover:bg-green-50 hover:shadow-lg"
                  key={medicine.id}
                >
                  <Link href={`/medicines/${medicine.slug}`} className="block">
                    <h1
                      className="font-semibold text-2xl text-green-900"
                    >
                      {medicine.brandName}
                      <small
                        className="h1-subtitle font-normal text-sm text-gray-800 pl-2"
                      >
                        {medicine.dosageForm}
                      </small>
                    </h1>
                    <p className="text-xs text-gray-600">{medicine.generic}</p>
                    <p className="text-sm py-1">{medicine.manufacturer}</p>
                    <p className={`pt-2 text-gray-600`}>
                      {medicine.price.replace(/,/g, " ").replace(/:/g, " ")}
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <ReactPaginate
                className="flex justify-center items-center gap-4 flex-wrap"
                pageLinkClassName={
                  "px-4 py-2 rounded-md shadow outline-none bg-primary text-white text-sm hover:bg-green-700 hover:text-white"
                }
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
  );
}
