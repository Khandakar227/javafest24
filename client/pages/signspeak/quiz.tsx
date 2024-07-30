import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import QuizBox from "@/components/QuizBox";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Quiz() {
  const router = useRouter();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const stopQuiz = () => {
    setIsQuizStarted(false);
    router.push("/signspeak");
  };
  return (
    <>
      <Head>
        <title>Quiz - Silent Voice</title>
      </Head>
      <Layout>
        <div className={"bg-white rounded shadow p-4 m-4"}>
          <QuizBox stopQuiz={stopQuiz} />
        </div>
      </Layout>
    </>
  );
}
