import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import QuizBox from "@/components/QuizBox";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";


export default function Quiz() {
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const stopQuiz = () => setIsQuizStarted(false);
    return (
        <>
            <Head>
                <title>Quiz - Silent Voice</title>
            </Head>
            <Layout>
                <div className={'bg-white rounded shadow p-4 m-4'}>
                    <QuizBox stopQuiz={stopQuiz} />
                </div>
            </Layout>
        </>
    )
}
