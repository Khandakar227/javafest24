import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { deleteSign, getWord } from "@/lib/api-client";
import { MdDelete } from "react-icons/md";
import Head from "next/head";
import { useRouter } from "next/router"
import { MouseEvent, useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa";

function Word() {
    const router = useRouter();
    const [word, setWord] = useState([] as { id: string, word: string, videos: string[], images: string[] }[]);

    useEffect(() => {
        getWord(router.query.word as string)
            .then(res => {
                console.log(res);
                setWord(res);
            })
            .catch(err => console.log(err))
    }, [router.query.word])

    const deleteData = (e:MouseEvent) => {
        const confirmDelete = confirm("Are you sure you want to delete this word?");
        if (!confirmDelete) return;
        
        (e.target as HTMLButtonElement).disabled = true;
        const originalText = (e.target as HTMLButtonElement).innerHTML;
        (e.target as HTMLButtonElement).innerHTML = "Deleting...";

        deleteSign(word[0].id as string)
        .then(res => {
            if (res.error) return console.log(res.error);
            router.push("/signspeak");
        })
        .catch(err => console.log(err))
        .finally(() => {
            (e.target as HTMLButtonElement).innerHTML = originalText;
            (e.target as HTMLButtonElement).disabled = false
        })
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>SignSpeak - Cerena</title>
                </Head>
                {
                    word.length == 0 ? (
                        <div className="flex justify-center items-center h-screen">
                            <Spinner />
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
                            <div className="pt-6 flex justify-end items-center gap-4">
                                <button onClick={deleteData} className="bg-red-600 text-white px-4 py-2 rounded"><MdDelete /></button>
                                <button className="bg-orange-400 text-white px-4 py-2 rounded"><FaPencilAlt /></button>
                            </div>
                        </div>
                }
            </Layout>
        </>
    )
}

export default Word