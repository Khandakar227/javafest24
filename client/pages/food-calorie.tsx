import Layout from "@/components/Layout";
import UploadPhoto from "@/components/UploadPhoto";
import Head from "next/head";

export default function CalorieTracking() {
  return (
    <>
      <Head>
        <title>Predict Food Calorie - Cerena</title>
      </Head>
      <Layout>
        <div className={`shadow rounded-md px-4 py-12 m-4 bg-white text-center`}>
          <h1 className="font-bold md:text-3xl text-2xl">Estimate Food Calorie</h1>
          <p>Track your daily calorie intake from the foods you eat</p>
        </div>
        <div className={`shadow rounded-md px-4 py-8 m-4 bg-white`}>
            <UploadPhoto />
        </div>
      </Layout>
    </>
  )
}
