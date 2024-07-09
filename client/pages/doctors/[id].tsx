import Layout from "@/components/Layout";
import { getDoctor } from "@/lib/api-client";
import { Doctor } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DoctorPage() {
    const router = useRouter();
    const [doctor, setDoctor] = useState({} as Doctor);

    useEffect(() => {
        getDoctor(router.query.id as string)
        .then(res => {
            setDoctor(res);
        })
        .catch(err=> console.log(err))
    }, [router.query.id])
    return (
        <Layout>
            <div className="p-4">

                <div className="p-4 shadow rounded bg-white mx-auto max-w-2xl">
                    <h1 className="text-2xl font-semibold">{doctor.name}</h1>
                    <img src={doctor.photo} alt={doctor.name} className="w-40 h-40 rounded-full shadow my-4 mx-auto" />

                    <p className="font-semibold">Contact</p>
                    <p className="mb-4 p-1 whitespace-pre-wrap">{doctor.contact}</p>
                    <p className="font-semibold">Speciality</p>

                    <p className="pb-8">{doctor.speciality}</p>

                   {
                    doctor.designation && (
                        <>
                        <p className="font-semibold">Designation</p>
                        <p className="pb-8">{doctor.designation}</p>
                        </>
                    )
                   } 
                    <p className="font-semibold">Chamber</p>
                    <p className="pb-8">{doctor.chamber}</p>

                    <p className="font-semibold">Workplace</p>
                    <p className="pb-8">{doctor.workplace}</p>

                    <p className="font-semibold">District</p>
                    <p className="pb-8">{doctor.district}</p>
                    
                    <p className="font-semibold">About</p>
                    <p className="mb-4 p-1 text-justify">{doctor.about}</p>

                    <p className="font-semibold">Degree</p>
                    <p className="mb-4 p-1">{doctor.degree}</p>
                </div>
            </div>
        </Layout>
    )
}
