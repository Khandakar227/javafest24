import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchBloodGroups } from "@/lib/api-client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import { Paper, Typography, Container } from '@mui/material';

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
        {/* <div className="flex flex-wrap justify-center m-4"> */}
        <div
          className={`shadow rounded-md px-4 py-12 m-1 bg-white w='auto`}
          style={{
            backgroundImage: `url('/blood-bank/blood-cover.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "auto",
            height: "223px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex flex-row justify-center m-4 w-auto h-auto">

          {/* <Image
              src="/blood-bank/blood-donation.png"
              alt="Blood Bank"
              width={550}
              height={100}
            /> */}
          {/* <div className={`flex flex-row justify-center shadow rounded-md px-4 py-12 m-1 bg-white `} > */}
            {/* <Container maxWidth="sm" style={{ width: "auto", height: "auto" }}> */}
              <Paper elevation={5} sx={{ padding:2, textAlign: 'center'}}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Blood Group Distribution
                </Typography>
                <div className="flex flex-row justify-center m-4 w-auto h-auto" style={{ height: '300px',width:'400px'}}>
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </Paper>
            {/* </Container> */}
          {/* </div> */}


          <div>
            <div
              className={`shadow rounded-md px-4 py-12 m-4 bg-white  flex flex-col items-center justify-center`}
              style={{ width: "auto", height: "auto" }}
            >
              <h1 className="text-center font-bold text-2xl">
                Need Urgent Blood?
              </h1>
              <p className="text-center font-semibold text-lg mx-auto pb-2">
                Let us help you find people of required blood type around you
              </p>
              <p className="text-center font-semibold text-lg mx-auto">
                Anyone willing to be a donor?
                <Link
                  className="text-red-700 font-semibold underline mx-2"
                  href={"/blood-bank/add"}
                >
                  Click here{" "}
                </Link>
              </p>
            </div>
            <div
              className={`shadow rounded-md px-4 py-12 m-4 bg-white flex flex-col items-center justify-center`}
              style={{ width: "auto", height: "auto" }}
            >
              <h1 className="text-center font-bold text-2xl">Find donor</h1>
              {/* <p className="text-center font-semibold text-lg mx-auto pb-2">Find donors by blood type and location</p> */}
              <Link
                className="text-green-700 font-semibold underline mx-2"
                href={"/blood-bank/Search"}
              >
                Search Donor
              </Link>
            </div>


          </div>
        </div>
      </Layout>
    </>
  );
}
