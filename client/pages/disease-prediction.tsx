import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner";
import { getDiseasePrediction } from "@/lib/api-client";
import { PredictedDisease, QnA } from "@/types";
import { on } from "events";
import Head from "next/head"
import { ChangeEvent, useEffect, useRef, useState } from "react";

function DiseasePrediction() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState([] as PredictedDisease[]);
    const [question, setQuestion] = useState('' as string);
    const [answer, setAnswer] = useState('' as string);
    const [previousResponse, setPreviousResponse] = useState([] as QnA[]);
    const [isPredicting, setIsPredicting] = useState(false);
    const [chats, setChats] = useState([] as {from: string, text: string}[]);

    const promptRef = useRef<HTMLTextAreaElement>(null);
    const answerRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        console.log(previousResponse);
    }, [previousResponse]);

    useEffect(() => {
        console.log("Chats:", chats);
    }, [chats.length]);

    
    function addChat (cht: {from: string, text: string}) {
        console.log(cht)
        setChats(c => ([...c, cht]));
    }

    function onPromptChange(e: ChangeEvent) {
        setPrompt((e.target as HTMLTextAreaElement).value);
    }
    function onAnswerChange(e: ChangeEvent) {
        setAnswer((e.target as HTMLTextAreaElement).value);
    }

    function onPredict() {
        if (prompt.trim().length == 0) return;
        setLoading(true);
        console.log("Prediciting...")
        addChat({from: 'user', text: prompt});

        if (promptRef.current) promptRef.current.value = '';
        if (answerRef.current) answerRef.current.value = '';
        
        getDiseasePrediction(prompt.trim(), []).then(res => {
            console.log(res);
            setLoading(false);
            if (res.possible_diseases) {
                setPrediction(res.possible_diseases || []);
                setPreviousResponse([]);
                setIsPredicting(false);
            } else if (res.question) {
                setIsPredicting(true);
                setQuestion(res.question);
                addChat({from: 'bot', text: res.question});
            }
        }).catch(err => {
            console.error(err)
            setLoading(false);
        });
    }

    function onRespond() {
        if (answer.trim().length == 0) return;
        setLoading(true);
        console.log("Answering...", prompt)
        addChat({from: 'user', text: answer});
        
        if (promptRef.current) promptRef.current.value = '';
        if (answerRef.current) answerRef.current.value = '';

        getDiseasePrediction(prompt.trim(), [...previousResponse, { question, answer }]).then(res => {
            console.log(res);
            setLoading(false);
            if (res.possible_diseases) {
                setPrediction(res.possible_diseases || []);
                setPreviousResponse([]);
                setIsPredicting(false);
            } else if (res.question) {
                setIsPredicting(true);
                setQuestion(res.question);
                setPreviousResponse([...previousResponse, { question, answer }]);
                addChat({from: 'bot', text: res.question});
            }
        }).catch(err => {
            console.error(err)
            setLoading(false);
        });
    }
  
    return (
        <>
            <Head>
                <title>Disease Prediction - Cerena</title>
            </Head>
            <Layout>
                <main className="grid md:grid-cols-2">
                    <div className="grid min-h-screen items-end">
                        <div className="py-8 p-4 m-4 rounded bg-white shadow">
                            <h1 className="text-xl font-bold">Enter your symptoms and receive an instant analysis. </h1>
                            <p>Our AI-powered prediction tool provides you with accurate insights to help you understand your health better.</p>
                        </div>

                        <div className="py-8 p-4 m-4 rounded bg-white shadow">
                            <ul>
                                <li className="pb-4 font-semibold text-lg">How it Works:</li>
                                <li>1. Enter your symptoms in the fields provided.</li>
                                <li>2. Click on 'Predict' to get an instant analysis.</li>
                                <li>3. Receive personalized health insights and recommended actions.</li>
                            </ul>
                            <p className="pt-6 font-semibold text-sm">Note: This tool is for informational purposes only and is not a substitute for professional medical advice.</p>
                        </div>

                        <div className="py-12">
                            {
                                chats.map((chat, i) => (
                                    <div className={`flex ${chat.from == 'user' ? 'justify-end pl-4' : 'justify-start pr-4'}`} key={"chat " + i}>
                                        <div className={`p-2 m-2 rounded ${chat.from == 'user' ? 'bg-green-200 text-end' : 'bg-gray-200'}`}>{chat.text}</div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            isPredicting ?
                                <div className="flex gap-4 justify-center items-center px-2 py-3 w-full max-w-lg sticky bottom-0 mx-auto glass">
                                    <textarea name="response" id="response"
                                        ref={answerRef}
                                        placeholder="Please describe your symptoms as accurately as possible."
                                        className="text-sm outline-none p-2 rounded shadow border flex-1 h-14 resize-none"
                                        onChange={onAnswerChange}
                                    ></textarea>
                                    <button disabled={loading} className="bg-primary rounded px-4 py-2" onClick={onRespond}>{loading ? <Spinner size={1} /> : 'Respond'}</button>
                                </div>
                                :
                                <div className="flex gap-4 justify-center items-center px-2 py-3 w-full max-w-lg sticky bottom-0 mx-auto glass">
                                    <textarea name="prompt" id="prompt"
                                        ref={promptRef}
                                        placeholder="Please describe your symptoms as accurately as possible."
                                        className="text-sm outline-none p-2 rounded shadow border flex-1 h-14 resize-none"
                                        onChange={onPromptChange}
                                    ></textarea>
                                    <button disabled={loading} className="bg-primary rounded px-4 py-2" onClick={onPredict}>{loading ? <Spinner size={1} /> : 'Predict'}</button>
                                </div>
                        }
                    </div>
                    <div>
                        {
                            prediction.length > 0 ?
                                <div className="py-4 px-2 m-4 rounded bg-white shadow md:sticky top-0">
                                    <h1 className="text-xl font-bold px-4">Possible Diseases</h1>
                                    <ul>
                                        {
                                            prediction.map((disease, i) => (
                                                <li key={"disease " + i} style={{backgroundColor: `rgba(113, 193, 113, ${disease.possibility})`}} className={`p-4 text-sm rounded shadow my-4`}>
                                                    <h2 className="font-semibold">{disease.name}</h2>
                                                    <p>Probability: <span className="font-bold">{+disease.possibility * 100}</span>%</p>
                                                    <p className="text-xs">{disease.description}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                :
                                null
                        }
                    </div>
                </main>
            </Layout>
        </>
    )
}

export default DiseasePrediction