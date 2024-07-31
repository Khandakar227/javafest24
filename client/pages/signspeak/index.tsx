import Layout from '@/components/Layout'
import SignSpeakDictionary from '@/components/SignSpeakDictionary';
import VideoCamButton from '@/components/VideoCamButton';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function SignSpeak() {
    return (
        <>
            <Head>
                <title>SignSpeak - Cerena</title>
            </Head>
            <Layout>
                <div className='bg-white rounded shadow p-4 m-4'>
                    <h1 className='text-xl md:text-3xl font-bold my-2'>SignSpeak</h1>
                    <p className='md:text-lg font-semibold mb-8'>Hand Sign Language to Text Converter</p>
                    <p className='text-sm md:text-base text-justify'>
                        SignSpeak is an essential feature of our healthcare assistant system designed
                        to enhance communication between a person with normal hearing and hearing impaired person.
                        By translating hand signs into text in real-time, SignSpeak ensures that all hearing impaired
                        people can effectively communicate their needs and concerns, ensuring
                        that everyone receives the care and attention they deserve. SignSpeak helps bridge the communication
                        gap.
                        <br />
                        <br />
                        Our SignSpeak dictionary helps people learn sign language and communicate with the hearing impaired. With large word banks (American Sign Language) and a user-friendly interface,
                        SignSpeak is also a perfect tool for anyone looking to learn sign language.
                    </p>
                </div>

                <div className='m-4 p-4 rounded bg-white shadow py-12 text-center'>
                    <VideoCamButton/>
                </div>

                <div className='m-4 p-4 rounded bg-white shadow'>
                    <SignSpeakDictionary />
                </div>

                <div className='m-4 px-4 py-12 rounded bg-white shadow text-center mb-12'>
                <h2 className='text-2xl pt-2 font-semibold'>
                    Test Your Knowledge of American Sign Language
                </h2>
                <Image src={"/signspeak/sign-language-alphabets.jpg"} alt='sign language alphabets' width={400} height={400} className='my-4 mx-auto rounded-md shadow' />
                <p className='py-6 text-lg mx-auto max-w-5xl'>
                    Ready to put your sign language skills to the test? Take our quiz to see how well you know the American Sign Language (ASL) alphabet.
                </p>
                <Link href={"/signspeak/quiz"} className='bg-primary rounded px-4 py-3 font-semibold'>Take a Quiz</Link>
                </div>
            </Layout>
        </>
    )
}

export default SignSpeak