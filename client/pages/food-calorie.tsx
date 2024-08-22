import Layout from "@/components/Layout";
import UploadFoodPhoto from "@/components/UploadFoodPhoto";
import Head from "next/head";

export default function CalorieTracking() {
  return (
    <>
      <Head>
        <title>Predict Food Calorie - Cerena</title>
      </Head>
      <Layout>
        <div className={`shadow rounded-md px-4 py-12 m-4 bg-[#D6EFD8] text-center`}>
          <h1 className="font-bold md:text-3xl text-2xl ">Estimate Food Calorie</h1>
          <p>Track your daily calorie intake from the foods you eat</p>
        </div>
        <div className={`shadow rounded-md px-4 py-8 m-4 bg-[#D6EFD8]
          `}>
            <UploadFoodPhoto />
        </div>
      </Layout>
    </>
  )
}
