import Layout from "@/components/Layout";
import { getWords } from "@/lib/api-client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";

export default function All() {
    const router = useRouter();
    const [words, setWords] = useState([] as { word: string }[]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [searchedWord, setSearchedWord] = useState("");

    useEffect(() => {
        getWords(page, router.query.prefix as string)
            .then(res => {
                setWords(res.content);
                setTotalPages(res.totalPages);
                setTotalElements(res.totalElements);
            })
            .catch(err => console.log(err));
    }, [router.query.prefix, page]);

    function onPageChange(selectedItem: { selected: number; }) {
        setPage(selectedItem.selected);
    }

    function onSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchedWord(e.target.value);
    }

    function searchWord() {
        router.push(`/signspeak/all?prefix=${searchedWord}`);
    }

    return (
        <>
            <Head>
                <title>SignSpeak - Cerena</title>
            </Head>
            <Layout>
                <div className='bg-white rounded shadow p-4 m-4 min-h-screen'>
                    <div className='max-w-4xl mx-auto flex gap-4 justify-center items-center py-5'>
                        <input onChange={onSearch} type="search" name="prefix" id="prefix" className='px-2 py-1 rounded shadow border w-full outline-none focus:outline-primary' placeholder='Type a word...' />
                        <button className='bg-primary p-2 rounded' onClick={searchWord}><FiSearch size={20} /></button>
                    </div>
                    <div className="text-lg py-8 px-4">
                        <p className="pb-1">Showing results for words starting with <span className="font-semibold">'{router.query.prefix}'</span></p>
                        <p>Total <span className="font-semibold">{totalElements}</span> words found.</p>
                    </div>
                    <div className="py-12">
                        <div className="grid justify-between items-center gap-4 lg:grid-cols-3 md:grid-cols-2">
                            {
                                words.map((word, i) => (
                                    <Link href={`/signspeak/word/${word.word}`} className={`block p-2 m-2 text-sm hover:bg-green-50`} key={"word " + i}>{word.word?.split(',')[0]}</Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="pt-8">
                        <ReactPaginate
                            className="flex justify-center items-center gap-4 flex-wrap"
                            pageLinkClassName={'px-4 py-2 rounded-md shadow outline-none bg-primary text-white text-sm hover:bg-green-700 hover:text-white'}
                            pageCount={totalPages}
                            breakLabel="..."
                            nextLabel=">"
                            previousLinkClassName="px-4 py-2 rounded-md outline-none hover:bg-green-700 hover:text-white"
                            nextLinkClassName="px-4 py-2 rounded-md outline-none hover:bg-green-700 hover:text-white"
                            pageRangeDisplayed={5}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            activeLinkClassName="!bg-green-700 !text-white"
                            initialPage={page}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}
