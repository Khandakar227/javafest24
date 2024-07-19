import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

export default function BloodBank() {
  return (
    <>
    <Head>
        <title>Blood Bank - Cerena</title>
    </Head>
    <Layout>
        <div className={`shadow rounded-md px-4 py-12 m-4 bg-white`}>
            <h1 className="text-center font-bold text-2xl">Need Urgent Blood?</h1>
            <p className="text-center font-semibold text-lg mx-auto pb-2">Let us help you find people of required blood type around you</p>
            <p className="text-center font-semibold text-lg mx-auto">Anyone willing to be a donor? 
                <Link className="text-green-700 font-semibold underline mx-2" href={"/blood-bank/add"}>Click here </Link>
            </p>
        </div>
    </Layout>
    </>
  )
}
