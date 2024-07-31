import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";

const poppins = Poppins({ weight: ['800', '400'], subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Cerena</title>
        <meta name="description" content="Your all in one Personal Healthcare Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={`px-4 py-16 bg-white shadow m-4 rounded-md ${poppins.className} home-bg`}>
          <h1 className="text-center font-bold text-2xl md:text-3xl">Your <span className="px-1 rounded bg-green-700 text-white">all in one</span> </h1>
          <h1 className="text-center font-bold text-3xl md:text-4xl">Personal Healthcare Assistant</h1>
          <p className="mx-auto text-center max-w-3xl pt-4">Our Personal Healthcare Assistant is designed to provide you with the information and tools you need to take control of your health and well-being.</p>
          <div className="pt-12">
            <Image src={"/home/bot.png"} alt="Cerena - bot" width={300} height={300} className="mx-auto rounded-[60px]"/>
          </div>
        </div>
      </Layout>
    </>
  );
}
