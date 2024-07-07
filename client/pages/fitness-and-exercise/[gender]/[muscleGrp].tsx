import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { muscleData } from "@/lib/muscle-data";
import { getExercises } from "@/lib/api-client";
import MaleMuscleFront from "@/components/Exercise/MaleMuscleFront";
import MaleMuscleBack from "@/components/Exercise/MaleMuscleBack";
import FemaleMuscleFront from "@/components/Exercise/FemaleMuscleFront";
import FemaleMuscleBack from "@/components/Exercise/FemaleMuscleBack";
import { Exercise } from "@/types";

function MuscleGroup() {
    const router = useRouter();
    const [muscle, setMuscle] = useState('');
    const [gender, setGender] = useState('male');
    const [exercises, setExercises] = useState([] as Exercise[]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const muscleLabel = muscleData[router.query.muscleGrp as keyof typeof muscleData];
        setGender(router.query.gender as string);
        setMuscle(muscleLabel);
        setLoading(false);
    }, [router.query.muscleGrp, router.query.geder])

    useEffect(() => {
        if (!muscle) return;
        console.log(muscle)
        getExercises(muscle, page)
            .then(res => {
                setExercises(res.content);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [muscle])

    if (loading) return <Spinner />;
    if (!loading && (!muscle || !['male', 'female'].includes(gender))) return (
        <Layout>
            <div className="text-center text-2xl">Muscle Group Not Found</div>
        </Layout>
    )

    return (
        <>
            <Head>
                <title>{muscle} / Exercise - Cerena</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="flex justify-between gap-4 items-start p-4 w-full">
                    <div className="flex-1">
                        <div className="text-2xl font-semibold">{muscle}</div>
                        <div className="text-sm text-gray-500">Exercises for {muscle}</div>

                        <div className="py-8">
                            {
                                exercises.map((e, index) => (
                                    <div key={index + e.excerciseName} className="bg-white p-4 my-4 rounded shadow">
                                        <div className="text-xl">{e.excerciseName}</div>
                                        <div className="text-xs text-gray-900">Rating: {e.rating}</div>
                                        {
                                            e.description &&
                                            (<div className="py-4">
                                                <h3>Description</h3>
                                                <div className="text-sm text-gray-500">{e.description}</div>
                                            </div>)
                                        }
                                        {
                                            e.benefits &&
                                            (<div className="py-4">
                                                <h3>Benefits</h3>
                                                <div className="text-sm text-gray-500">{e.benefits}</div>
                                            </div>)
                                        }
                                        {
                                            e.equipment &&
                                            (<div className="py-4">
                                                <h3>Equipment</h3>
                                                <div className="text-sm text-gray-500">{e.equipment}</div>
                                            </div>)
                                        }
                                        {
                                        e.img &&
                                        (
                                        <div className="grid lg:grid-cols-2 gap-4 justify-center items-center">
                                        {
                                            e.img.map((img, index) => (
                                                <img key={index + img} src={img} alt={e.excerciseName} className="mx-auto rounded-md w-full max-w-md my-4" />
                                            ))
                                        }
                                        </div>
                                        )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="max-w-52 lg:max-w-96 sticky top-0">
                        {
                            gender == 'male' ?
                                <div className="hidden md:grid lg:grid-cols-2 justify-center items-center gap-4">
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <MaleMuscleFront />
                                    </div>
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <MaleMuscleBack />
                                    </div>
                                </div>
                                :
                                <div className="hidden md:grid lg:grid-cols-2 justify-center items-center gap-4">
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <FemaleMuscleFront />
                                    </div>
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <FemaleMuscleBack />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default MuscleGroup