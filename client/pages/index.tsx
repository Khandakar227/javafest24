import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";

const poppins = Poppins({weight: '800', subsets: ['latin']})

export default function Home() {
  return (
    <>
      <Head>
        <title>Cerena</title>
        <meta name="description" content="Your all in one Personal Healthcare Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={`px-4 py-16 bg-white shadow m-4 rounded-md ${poppins.className}`}>
          <h1 className="text-center font-bold text-2xl">Your all in one </h1>
          <h1 className="text-center font-bold text-3xl">Personal Healthcare Assistant</h1>
        </div>
      </Layout>
    </>
  );
}
