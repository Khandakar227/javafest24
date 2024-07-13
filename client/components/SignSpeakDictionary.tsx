import { getWords } from "@/lib/api-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function SignSpeakDictionary() {
    const [words, setWords] = useState([] as {word:string}[]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [alphabet, setAlphabet] = useState('');

    useEffect(() => {
        getWords(page, alphabet)
            .then(res => {
                setWords(res.content);
                setTotalPages(res.totalPages);
                console.log(res)
            })
            .catch(err => console.log(err));
    }, [page, alphabet])

    function onPageChange(selectedItem: { selected: number; }) {
        console.log("selectedItem ", selectedItem)
        setPage(selectedItem.selected);
    
    }    
    return (
        <>
            <div className='max-w-4xl mx-auto flex gap-4 justify-center items-center py-5'>
                <input type="search" name="prefix" id="prefix" className='px-2 py-1 rounded shadow border w-full outline-none focus:outline-primary' placeholder='Type a word...' />
                <button className='bg-primary p-2 rounded'><FiSearch size={20} /></button>
            </div>
            <div className='flex flex-wrap gap-1 items-center justify-center'>
                <button onClick={() => setAlphabet('')} key={'All'} className={`${alphabet == '' ? "bg-green-900 text-white" : "bg-primary"} text-sm py-1 px-3 rounded shadow`}>All</button>
                {
                    alphabets.map(letter => (
                        <button onClick={() => setAlphabet(letter)} key={letter} className={`${alphabet == letter ? "bg-green-900 text-white" : "bg-primary"} text-sm py-1 px-3 rounded shadow`}>{letter}</button>
                    ))
                }
            </div>

            <div className="py-12">
                <div className="grid justify-between items-center gap-4 lg:grid-cols-3 md:grid-cols-2">
                {
                    words.map((word, i) => (
                        <Link href={`/signspeak/word/${word.word}`} className={`block p-2 m-2 text-sm`} key={"word " + i}>{word.word?.split(',')[0]}</Link>
                    ))
                }
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
        </>
    )
}

export default SignSpeakDictionary