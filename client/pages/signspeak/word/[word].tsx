import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { getWord } from "@/lib/api-client";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function Word() {
    const router = useRouter();
    const [word, setWord] = useState([] as {word: string, videos: string[], images: string[]}[]);
  useEffect(() => {
    getWord(router.query.word as string)
    .then(res => {
        console.log(res);
        setWord(res);
    })
    .catch(err => console.log(err))
  }, [router.query.word])

  return (
    <>
        <Layout>
            <Head>
                <title>SignSpeak - Cerena</title>
            </Head>
            {
                word.length == 0 ? (
                    <div className="flex justify-center items-center h-screen">
                        <Spinner/>
                    </div>
                )
                :
                <div className="bg-white p-4 m-4 rounded">
                    <h2 className="text-2xl font-bold">{word[0].word.toUpperCase()}</h2>
                    <p className="pb-12">in ASL (American Sign Language)</p>

                    {
                        word[0].videos.length > 0 && (
                            <div className="grid justify-center items-center gap-4">
                                {
                                    word[0].videos.map((video, i) => (
                                        <div key={video + i}>
                                            <video className="shadow rounded-md" src={`/api/proxy-video?url=${video}`} width="640px" height="480px" controls controlsList="nodownload" onContextMenu={() => false}></video>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

            }
        </Layout>
    </>
  )
}

export default Word