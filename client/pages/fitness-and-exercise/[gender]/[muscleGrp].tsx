import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { muscleData } from "@/lib/muscle-data";

function MuscleGroup() {
    const router = useRouter();
    const [muscle, setMuscle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const muscleLabel = muscleData[router.query.muscleGrp as keyof typeof muscleData];
        setMuscle(muscleLabel);
        setLoading(false);
    }, [router.query.muscleGrp])

    if(loading) return <Spinner />;
    if (!loading && !muscle) return (
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
            </Layout>
        </>
    )
}

export default MuscleGroup