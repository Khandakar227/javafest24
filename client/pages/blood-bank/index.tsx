import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchBloodGroups } from "@/lib/api-client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import SearchDonor from "@/components/SearchDonor";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BloodBank() {
  const [bloodGroupCounts, setBloodGroupCounts] = useState<{
    [key: string]: number;
  }>({});
  const chartData = {
    labels: Object.keys(bloodGroupCounts),
    datasets: [
      {
        label: "Donors by Blood Group",
        data: Object.values(bloodGroupCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    const loadBloodGroups = async () => {
      const data = await fetchBloodGroups();
      setBloodGroupCounts(data);
    };

    loadBloodGroups();
  }, []);

  const chartOptions: ChartOptions<'pie'> = {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    // maintainAspectRatio:false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            return `${label}: ${value} donors`;
          },
        },
      },
    },
  };

  return (
    <>
      <Head>
        <title>Blood Bank - Cerena</title>
      </Head>
      <Layout>
        <div
          className={`shadow rounded-md px-4 py-12 m-4 bg-white`}
          style={{
            backgroundImage: `url('/blood-bank/blood-bank-cover.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "auto",
            height: "223px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex flex-col md:flex-row justify-between items-stretch m-4 gap-4">
          <div className="shadow p-4 rounded bg-white">
            <h3 className="text-2xl font-semibold text-center">
            Blood Group Demographics
            </h3>
            <div className="flex flex-row justify-center m-4 mx-auto" style={{ height: '300px', width: '100%' }}>
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>


          <div className="w-full grid gap-4">
            <div className={`shadow rounded-md px-4 py-12 bg-white  flex flex-col items-center justify-center w-full`}
            >
              <h1 className="text-center font-bold text-2xl">Need Urgent Blood?</h1>
              <p className="text-center font-semibold text-lg mx-auto pb-2">Let us help you find people of required blood type around you</p>
              <div className="py-4 w-full">
                <SearchDonor/>
              </div>
            </div>
            <div className={`shadow rounded-md px-4 py-12 bg-white flex flex-col items-center justify-center`}
            >
              <p className="text-center font-semibold text-lg mx-auto">
                Anyone willing to be a donor?
                <Link className="text-red-700 font-semibold underline mx-2" href={"/blood-bank/add"}
                > Click here </Link>
              </p>
              <Image alt="Blood donation illustration" src={"/blood-bank/blood-donation.svg"} width={300} height={300} className="my-4"/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
