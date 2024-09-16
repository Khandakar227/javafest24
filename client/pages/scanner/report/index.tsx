import { useEffect, useMemo, useState } from "react";
import UploadReport from "@/components/UploadReport";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Accordion from "@/components/Accordion";

type ReportData = {
  data: {
    Investigation: string;
    Result: string | number;
    ReferenceValue: string;
    Unit: string;
  }[];
  remark: string;
  summary: string;
  recommendations: string;
};

const getMaxReferenceValue = (referenceValue: string): number => {
  const values = referenceValue.split("-").map(Number);
  return Math.max(...values);
};

export default function Home() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  
  const chartData = useMemo(() => {
    return reportData?.data.map((item) => ({
      name: item.Investigation,
      Result: Number(item.Result),
      ReferenceValue: getMaxReferenceValue(item.ReferenceValue),
    })) || [];
  }, [reportData?.data]);

  return (
    <>
      <Head>
        <title>Report Scanner - Cerena</title>
      </Head>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-lime-100 to-green-100 py-8 relative p-4">
          <img
            src="/Scanner/medicalreport.png"
            alt="Scan Medicine"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-4xl font-bold text-green-800 mb-8">
            Scan Report
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
            Upload your medical report to get detailed information about
            yourself.
          </p>

          <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
            <div className="bg-green-300 bg-opacity-50 rounded-lg shadow-lg p-6 flex flex-col items-center w-full max-w-lg">
              <UploadReport
                setReportData={setReportData}
                setError={setError}
                setLoading={setLoading}
              />
            </div>

            <div
              className={`relative w-full max-w-2xl p-6 rounded-lg shadow-lg transition-all duration-500"
                bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage:
                  "url('/Scanner/timespinner.png')",
              }}
            >
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center">
                  <Spinner size={10} />
                </div>
              ) : (
                <>
                  {reportData && !error && (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-4 flex justify-center items-center bg-transparent">
                        Report Analysis
                      </h2>
                      <div className="w-full h-64 mb-6 bg-yellow-50">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e0e0e0"
                            />
                            <XAxis dataKey="name" />
                            <YAxis tickLine={false} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#f4f4f4",
                                borderRadius: "8px",
                                border: "none",
                              }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="Result"
                              stroke="red"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="ReferenceValue"
                              stroke="#8884d8"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-6">
                        <Accordion title="Summary">
                          <p className="mt-2">
                            {reportData.summary || "No summary available."}
                          </p>
                          </Accordion>
                      </div>

                      <div className="mt-6">
                        <Accordion title="Remarks">
                          <p className="mt-2">
                            {reportData.remark || "No remarks available."}
                          </p>
                          </Accordion>
                      </div>

                      <div className="mt-6">
                        <Accordion title="Suggestion">
                        {reportData.recommendations ? (
                              <ul className="list-decimal pl-6">
                                {reportData.recommendations.split(/\d\.\s+/).filter(Boolean).map((suggestion, index) =>
                                      suggestion.trim() && (
                                        <li key={index} className="mt-2">{suggestion.trim()}</li>
                                      )
                                  )}
                              </ul>
                            ) : (
                              <p className="mt-2">
                                No suggestions available.
                              </p>
                            )}
                        </Accordion>
                      </div>
                    </>
                  )}

                  {error && <div className="text-red-500 mt-4">{error}</div>}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
