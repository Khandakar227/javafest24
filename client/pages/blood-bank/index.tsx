import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { PiNetworkLight } from "react-icons/pi";
import { Black_And_White_Picture } from "next/font/google";



export default function BloodBank() {
  return (
    <>
    <Head>
        <title>Blood Bank - Cerena</title>
    </Head>
    <Layout>
      {/* <div className="flex flex-wrap justify-center m-4"> */}
        <div className={`shadow rounded-md px-4 py-12 m-1 bg-white w='auto`} 
        style={{
              backgroundImage: `url('/blood-bank/blood-cover.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: 'auto',
              height: '223px',
              backgroundRepeat: 'no-repeat',
            }}>
        
        
           
        {/* </div> */}
        </div>
        <div className="flex flex-row justify-center m-4 w-auto h-200">
        <div className={`shadow rounded-md px-4 py-12 m-4 bg-white`}style={{ width: 'auto', height: '330', }}>
            <Image
              src="/blood-bank/blood-donation.png"
              alt="Blood Bank"
              width={550}
              height={100}
            />
          </div>
          <div className={`shadow rounded-md px-4 py-12 m-4 bg-white  flex flex-col items-center justify-center`} style={{ width: 'auto', height: 'auto' }}>
             <h1 className="text-center font-bold text-2xl">Need Urgent Blood?</h1>
            <p className="text-center font-semibold text-lg mx-auto pb-2">Let us help you find people of required blood type around you</p>
            <p className="text-center font-semibold text-lg mx-auto">Anyone willing to be a donor? 
                <Link className="text-green-700 font-semibold underline mx-2" href={"/blood-bank/add"}>Click here </Link>
            </p>
          </div>
        </div>
              
    </Layout>
    </>
  )
}
