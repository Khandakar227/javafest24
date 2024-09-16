import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { MdOutlineQrCodeScanner } from "react-icons/md";

export default function Scanner() {
    return (
        <>
            <Head>
                <title>Document Scanner - Cerena</title>
            </Head>
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-gray-100 py-8">
                    <MdOutlineQrCodeScanner size={78} className="md-4 text-green-600" />
                    <h1 className="text-4xl font-bold text-green-800 mb-6">
                        Scanner
                    </h1>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
                        Stay healthy by tracking your fitness and medical records.
                        <br />
                        Select
                        any option below to scan a prescription or medical report and get
                        detailed information instantly.
                    </p>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-5xl transition-shadow">
                            <img
                                src="/Scanner/prescriptionicons.png"
                                alt="Scan Medicine"
                                className="w-24 h-24 mb-4"
                            />
                            <h2 className="text-xl font-semibold text-green-800 mb-2">
                                Scan Prescription
                            </h2>
                            <p className="text-sm text-gray-500 text-center">
                                Scan the prescription to get detailed information including usage,
                                dosage & side effects.
                            </p>
                            <Link href={'/scanner/prescription'} passHref>
                                <button className="mt-6  bg-gradient-to-r from-green-400 to-indigo-100 text-black-900 px-4 py-2 rounded-lg hover:from-green-500 hover:to-green-800 hover:text-white">
                                    Start Scanning
                                </button>
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-5xl transition-shadow">
                            <img
                                src="/Scanner/medicalreport.png"
                                alt="Scan Medical Report"
                                className="w-24 h-24 mb-4"
                            />
                            <h2 className="text-xl font-semibold text-green-800 mb-2">
                                Scan Medical Report
                            </h2>
                            <p className="text-sm text-gray-500 text-center">
                                Scan your medical report to analyze key health indicators and
                                receive personalized health insights.
                            </p>
                            <Link href={'/scanner/report'} passHref>
                                <button className="mt-6  bg-gradient-to-r from-green-400 to-indigo-100 text-black-900 px-4 py-2 rounded-lg hover:from-green-500 hover:to-green-800 hover:text-white">
                                    Start Scanning
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
