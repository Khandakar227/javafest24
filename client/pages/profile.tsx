import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner";
import { useUser } from "@/hooks/user";
import { getDonorsAddedByMe } from "@/lib/api-client";
import { Donor } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useUser();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalDonors, setTotalDonors] = useState(0);
    const [donors, setDonors] = useState([] as Donor[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDonorsAddedByMe(page)
        .then((res) => {
            console.log(res)
            setDonors(res.content);
            setTotalPages(res.totalPages);
            setTotalDonors(res.totalElements);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, [page])

  return (
    <>
      <Head>
        <title>Profile - Cerena</title>
      </Head>
      <Layout>
        <div className="px-4">
            <div className='bg-white rounded shadow p-4 my-4'>
            <h1 className='text-xl md:text-3xl font-semibold my-2'>Profile</h1>
                {
                    user && (
                        <div className="py-6 max-w-2xl">
                            <p className="py-1 border w-full px-4">Name: <b>{user.name}</b></p>
                            <p className="py-1 border w-full px-4">Email: <b>{user.email}</b></p>
                            <p className="py-1 border w-full px-4">Account status: <b className={`${user.verified ? "text-green-500" : "text-red-500"}`}>{user.verified ? "Verified" : "Not Verified"}</b></p> 
                        </div>
                    )
                }
            </div>
            <div className="bg-white rounded shadow p-4 my-4">
                <h1 className='text-xl md:text-2xl font-semibold my-2'>Donors added</h1>
                {
                    loading && <Spinner />
                }
                <div className="overflow-x-hidden mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">No. </th>
                            <th scope="col" className="px-6 py-3">Name </th>
                            <th scope="col" className="px-6 py-3">Verified</th>
                            <th scope="col" className="px-6 py-3">Blood Group </th>
                            <th scope="col" className="px-6 py-3">Gender </th>
                            <th scope="col" className="px-6 py-3">Age </th>
                            <th scope="col" className="px-6 py-3">Contact No. </th>
                            <th scope="col" className="px-6 py-3">Addresses </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donors.map((donor, i) => 
                            <tr key={donor.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4"> {i+1} </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {donor.fullName}
                                </th>
                                <td className="px-6 py-4 text-xs text-center"> {donor.verified ? "✅" : "❌"} </td>
                                <td className="px-6 py-4 text-center"> {donor.bloodGroup} </td>
                                <td className="px-6 py-4 text-center"> {donor.gender} </td>
                                <td className="px-6 py-4 text-center"> {donor.age} </td>
                                <td className="px-6 py-4 text-center"> {donor.mobileNo} </td>
                                <td className="px-6 py-4 text-xs">
                                    {
                                        donor.addresses.map((address, j) => <p key={j + address.name} className="text-nowrap pb-2 px-1 border-b">{j+1}. {address.name}</p>)
                                    }
                                </td>
                            </tr>    
                            )
                        }
                    </tbody>
                </table>
            </div>
                </div>
            </div>
        </div>
      </Layout>
      </>
  )
}

export default Profile