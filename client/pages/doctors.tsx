import Filters from "@/components/Filters";
import Layout from "@/components/Layout";
import { getDoctors } from "@/lib/api-client";
import { Doctor } from "@/types";
import { useRouter } from "next/router";
import Paginate from 'react-paginate';
import { FormEvent, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import Head from "next/head";


export default function Doctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([] as Doctor[]);
  const [query, setQuery] = useState('' as string);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [speciality, setSpeciality] = useState('');
  const [district, setDistrict] = useState('');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [sortField, setSortField] = useState('name');

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.page) setPage(+(router.query.page as string) - 1);
    else setPage(0);
    if (router.query.speciality) setSpeciality(router.query.speciality as string)
    else setSpeciality('');
    if (router.query.district) setDistrict(router.query.district as string)
    else setDistrict('');
    if (router.query.direction) setDirection(router.query.direction as 'ASC' | 'DESC')
    else setDirection('ASC');
    if (router.query.sortField) setSortField(router.query.sortField as string);
    else setSortField('name');
    if (router.query.query) setQuery(router.query.query as string);
    else setQuery('');
     
    console.log(router.query)

  }, [router.query])

  useEffect(() => {
    getDoctors(page, speciality, district, sortField, direction, query)
      .then(res => {
        setTotalPages(res.totalPages);
        setDoctors(res.content || []);
        setLoading(false);
        console.log(res);
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      })
  }, [page, speciality, district, sortField, direction, query])

  function search(e: FormEvent) {
    e.preventDefault();
    const keyword = (e.target as HTMLFormElement).keyword.value;
    console.log(keyword);
    setQuery(keyword);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, query:keyword, page: 1 }
    })
  }

  function onPageChange(selectedItem: { selected: number; }) {
    console.log("selectedItem ", selectedItem)
    setPage(selectedItem.selected);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: selectedItem.selected + 1 }
    })
  }
  return (
    <>
      <Head>
        <title>Doctors - Cerena</title>
        <meta name="description" content="Find doctors near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={`shadow rounded-md p-4 m-4 bg-white`}>
          <h1 className="text-center font-bold text-2xl">Find Doctors Near You</h1>
          <form className="py-4 flex justify-center items-center" onSubmit={search}>
            <input type="search" name="keyword" id="search" placeholder="Look for doctors..." className="max-w-md w-full px-4 py-2 rounded shadow outline-none" />
            <button className="bg-primary text-white p-2 rounded-md ml-4">Search</button>
          </form>
          <Filters />
        </div>

        {
          loading ?
            (<div className="flex justify-center items-center">
              <Spinner />
            </div>)
            :
            <>
              <div className="m-4 p-4 bg-white bg-opacity-5 shadow rounded">
                {
                  doctors.map(d => (
                    <div key={d.id} className="flex gap-4 items-center p-4 shadow rounded-md m-4 bg-white">
                      <img src={d.photo} alt={d.name} className="w-20 h-20 rounded-full" />
                      <div>
                        <h2 className="text-lg font-semibold">{d.name}</h2>
                        <p className="text-sm">{d.speciality}</p>
                        <p className="text-sm text-gray-500">{d.district}</p>
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
                  activeLinkClassName="!bg-green-700 !text-white"
                  initialPage={page}
                  onPageChange={onPageChange}
                />
              </div>
            </>
        }
      </Layout>
    </>
  )
}
