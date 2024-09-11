import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import UploadPrescription from "@/components/UploadPrescription";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type MedicineDetails = {
  medicineName: string;
  dosage: string;
  duration: string;
};

type PrescriptionData = {
  medicine: string;
  details: MedicineDetails[];
  giveMedicineFeedback: string;
  doctorFeedback: string;
  error?: string;
};
type PrescriptionDetailsProps = {
  prescriptionData: PrescriptionData;
};
export default function Scanner() {
  const [prescriptionData, setPrescriptionData] =
    useState<PrescriptionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleFeedback, setVisibleFeedback] = useState<number | null>(null);
  const toggleFeedback = (index: number) => {
    setVisibleFeedback(visibleFeedback === index ? null : index);
  };
  return (
    <>
      <Head>
        <title>Medicines - Cerena</title>
      </Head>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-lime-100 to-green-100 py-8">
          <h1 className="text-4xl font-bold text-green-800 mb-6">
            Scan Prescription
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
            Upload your prescription to get detailed information on your
            medicines, including dosage, instructions, and feedback from the
            doctor.
          </p>

          <div className="bg-primary bg-opacity-50 rounded-lg shadow-lg p-6 flex flex-col items-center w-full max-w-2xl">
            <UploadPrescription
              setPrescriptionData={setPrescriptionData}
              setError={setError}
              setLoading={setLoading}
            />
          </div>
          <div className="my-4  rounded px-4 py-1 hover:text-white">
            {loading && (
              <div className="flex justify-center items-center mx-auto ">
                <Spinner size={4} />
              </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>

          {prescriptionData && !error && (
            <div className="mt-10 bg-green-100 rounded-lg shadow-lg p-8 w-full max-w-2xl">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex justify-center items-center">
                Prescription Details
              </h2>

              <table className="w-full table-auto border-collapse mb-6">
                <thead>
                  <tr className="">
                    <th className="border-b-2 border-green-700 py-2 text-left text-lg font-semibold text-green-700">
                      Medicine
                    </th>
                    <th className="border-b-2 border-green-700 py-2 text-left text-lg font-semibold text-green-700">
                      Dosage
                    </th>
                    <th className="border-b-2 border-green-700 py-2 text-left text-lg font-semibold text-green-700">
                      Duration
                    </th>
                    <th className="border-b-2 border-green-700 py-2 text-left text-lg font-semibold text-green-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionData.details.map((detail, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 text-sm text-gray-700">
                          {detail.medicineName}
                        </td>
                        <td className="py-4 text-sm text-gray-700">
                          {detail.dosage}
                        </td>
                        <td className="py-4 text-sm text-gray-700">
                          {detail.duration}
                        </td>
                        <td className="py-4 text-sm text-gray-700 text-center">
                          <button
                            onClick={() => toggleFeedback(index)}
                            className="flex items-center text-gray-700 hover:text-green-800 transition-all duration-1000"
                          >
                            {visibleFeedback === index ? (
                              <>
                                Hide Feedback <IoIosArrowUp className="ml-2" />
                              </>
                            ) : (
                              <>
                                Show Feedback{" "}
                                <IoIosArrowDown className="ml-2" />
                              </>
                            )}
                          </button>
                        </td>
                      </tr>

                      {visibleFeedback === index && (
                        <tr>
                          <td
                            colSpan={7}
                            className="transition-all duration-1000"
                          >
                            <div
                              className={`${
                                visibleFeedback === index
                                  ? "max-h-full"
                                  : "max-h-0"
                              } overflow-hidden transition-all duration-1000 ease-in-out`}
                            >
                              {visibleFeedback === index && (
                                <div className="bg-gray-100 p-4 rounded-lg border-2 border-green-700">
                                  <p className="text-sm font-medium mb-2">
                                    Medicine Feedback:
                                  </p>
                                  <p className="text-gray-700 mb-4">
                                    {prescriptionData.giveMedicineFeedback}
                                  </p>
                                  <p className="text-sm font-medium mb-2">
                                    Doctor Feedback:
                                  </p>
                                  <p className="text-gray-700">
                                    {prescriptionData.doctorFeedback}
                                  </p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
