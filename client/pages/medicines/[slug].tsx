import Layout from "@/components/Layout";
import { getFullMedicineInfo } from "@/lib/api-client";
import { Generic, Medicine } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Slug() {
    const router = useRouter();
    const [medicine, setMedicine] = useState({} as {medicine:Medicine, generic: Generic})

    useEffect(() => {
        if(!router.query.slug) return;
        getFullMedicineInfo(router.query.slug as string)
        .then(m => {
            setMedicine(m);
        })
        .catch(err => console.log(err));
    }, [router.query])

    return (
        <>
            <Head>
                <title>{medicine?.medicine?.brandName} - Medicines - Cerena</title>
            </Head>
            <Layout>
                <div className={`shadow rounded-md px-4 py-12 m-4 bg-white`}>
                    {
                        medicine.medicine && (
                            <>
                                <div className="py-4">
                                    <h1 className="text-3xl font-bold">{medicine.medicine.brandName}</h1>
                                    <p className="text-lg">{medicine.medicine.dosageForm}</p>
                                    <p className="pt-4">{medicine.medicine.generic}</p>
                                </div>

                                <div className="py-6">
                                    <p className="font-bold">Manufacturer</p>
                                    <p>{medicine.medicine.manufacturer}</p>
                                </div>
                                
                                <div className="py-6">
                                    <p className="font-bold">Type</p>
                                    <p>{medicine.medicine.type.toUpperCase()}</p>
                                </div>
                                
                                <div className="py-6">
                                    <p className="font-bold">Price</p>
                                    <p>{medicine.medicine.price}</p>
                                </div>
                                
                                <div className="py-6">
                                    <p className="font-bold">Strength</p>
                                    <p>{medicine.medicine.strength}</p>
                                </div>

                               {
                                medicine.generic && (
                                    <div className="py-6">
                                        <h1 className="py-4 text-2xl font-semibold">Generic Information</h1>
                                        {
                                            medicine.generic.drugClass && (
                                            <div className="py-6">
                                                <p className="font-bold">Drug Class</p>
                                                <p>{medicine.generic.drugClass}</p>
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.indication && (
                                            <div className="py-6">
                                                <p className="font-bold">Indication</p>
                                                <p>{medicine.generic.indication}</p>
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.indicationDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Indication Description</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.indicationDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.therapeuticClassDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">TherapeuticClass</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.therapeuticClassDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.pharmacologyDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Pharmacology</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.pharmacologyDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.dosageDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Dosage</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.dosageDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.administrationDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Administration</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.administrationDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.interactionDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Interaction</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.interactionDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.contraindicationsDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Contraindications</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.contraindicationsDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.sideEffectsDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Side Effects</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.sideEffectsDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.pregnancyAndLactationDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Pregnancy And Lactation</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.pregnancyAndLactationDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.precautionsDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Precautions</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.precautionsDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.pediatricUsageDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Pediatric Usage</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.pediatricUsageDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.overdoseEffectsDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Overdose Effects</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.overdoseEffectsDescription}} />
                                            </div>
                                            )
                                        }
                                        {
                                            medicine.generic.storageConditionsDescription && (
                                            <div className="py-6">
                                                <p className="font-bold">Storage Conditions</p>
                                                <div dangerouslySetInnerHTML={{__html:medicine.generic.storageConditionsDescription}} />
                                            </div>
                                            )
                                        }
                                    </div>
                                )
                               } 
                            </>
                        )
                    }
              </div>
            </Layout>
        </>
    )
}
