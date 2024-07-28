import Layout from "@/components/Layout";
import SearchDonor from "@/components/SearchDonor";
import Spinner from "@/components/Spinner";
import { findDonorNear } from "@/lib/api-client";
import { Donor } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [totalDonor, setTotalDonor] = useState(0);
  const [donors, setDonors] = useState([] as Donor[]);
  

  useEffect(() => {
    if (
      !router.query.bloodGroup ||
      !router.query.lng ||
      !router.query.lat ||
      !router.query.name
    )
      return;
    const { bloodGroup, lng, lat, name } = router.query;
    setBloodGroup(bloodGroup as string);
    setAddress(name as string);

    console.log(bloodGroup, lng, lat)
    findDonorNear(encodeURIComponent(bloodGroup as string), lng as string, lat as string)
    .then(res => {
        console.log(res);
        setTotalPages(res.totalPages);
        setTotalDonor(res.totalElements);
        setDonors(res.content);
    }).catch(err => console.log(err))
    .finally(() => setLoading(false))
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Blood Bank - Cerena</title>
      </Head>
      <Layout>
        <div className={`shadow rounded-md px-4 py-12 m-4 bg-white`}>
          <SearchDonor />
        </div>

        <div className="shadow rounded-md px-4 py-12 m-4 bg-white">
            <div className="pb-4">
                <h1 className="text-2xl font-bold">Search{loading ? "ing" : ""} Results</h1>
                <p className="font-semibold">Showing donors near {address}</p>
                <p className="font-semibold">Blood Group: {bloodGroup}</p>
                {
                    loading ? <Spinner />
                    :
                    <p className="pt-12 font-bold">Total {totalDonor} donor found.</p>
                }
            </div>
        </div>

        <div className="shadow rounded-md px-4 py-12 m-4 bg-white">
            <div className="">
                <table className="w-full">
                    <thead>
                    <tr>
                        <th className="px-2 py-1 border border-zinc-300 bg-slate-200">Name</th>
                        <th className="px-2 py-1 border border-zinc-300 bg-slate-200">Phone</th>
                        <th className="px-2 py-1 border border-zinc-300 bg-slate-200">Gender</th>
                        <th className="px-2 py-1 border border-zinc-300 bg-slate-200">Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        donors.map((donor, i) => (
                            <tr key={donor.id}>
                                <td className="text-center px-2 py-1 border border-zinc-300">{donor.fullName}</td>
                                <td className="text-center px-2 py-1 border border-zinc-300">{donor.mobileNo}</td>
                                <td className="text-center px-2 py-1 border border-zinc-300">{donor.gender}</td>
                                <td className="text-center px-2 py-1 border border-zinc-300">{donor.age}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
      </Layout>
    </>
  );
}
