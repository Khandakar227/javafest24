import Layout from "@/components/Layout";
import Head from "next/head";

export default function index() {
  return (
    <>
      <Head>
        <title>Diet - Cerena</title>
        <meta name="description" content="Find doctors near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="p-4">
            <div className="bg-diet-plan rounded-md shadow p-4 bg-cover bg-no-repeat min-h-screen">

            </div>
        </div>
      </Layout>
    </>
  )
}
