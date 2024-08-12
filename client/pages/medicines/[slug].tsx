import Layout from "@/components/Layout";
import { getFullMedicineInfo } from "@/lib/api-client";
import { Generic, Medicine } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

type DosageForm =
  | "Tablet"
  | "Mouthwash"
  | "Injection"
  | "Capsule"
  | "Cream"
  | "Dialysis Solution"
  | "Eye Drop"
  | "Gel"
  | "Syrup"|"Emulsion";
const dosageFormIcons: Record<DosageForm, string> = {
  Tablet: "/images-med/tablet.png",
  Mouthwash: "/images-med/mouthwash.png",
  Injection: "/images-med/injection.png",
  Capsule: "/images-med/capsule.png",
  Cream: "/images-med/cream.png",
  "Dialysis Solution": "/images-med/dialysis-solution.png",
  "Eye Drop": "/images-med/eye-drop.png",
  "Gel": "/images-med/gel.png",
 "Syrup": "/images-med/syrup.png",
  "Emulsion":"/images-med/emulsion.png"
};
const mapDosageForm = (str: string) => {
  if (/Injection/.test(str)) {
    return 'Injection';
  } else if (/Gel/.test(str)) {
    return 'Gel';
  } else if (/Emulsion|Suspension|Powder/.test(str)) {
    return 'Emulsion';
  }
 
  return str;
};

function getIconUrl(dosageForm: DosageForm): string {
  return dosageFormIcons[dosageForm] || "";
}

export default function Slug() {
  const router = useRouter();

  const [medicine, setMedicine] = useState<{
    medicine: Medicine;
    generic: Generic;
  } | null>(null);

  useEffect(() => {
    if (!router.query.slug) return;
    getFullMedicineInfo(router.query.slug as string)
      .then((m) => {
        setMedicine(m);
      })
      .catch((err) => console.log(err));
  }, [router.query.slug]);
  const transformedDosageForm = medicine ? mapDosageForm(medicine.medicine.dosageForm) : "";
  return (
    <>
      <Head>
        <title>{medicine?.medicine?.brandName} - Medicines - Cerena</title>
      </Head>
      <Layout>
        <div className={`shadow rounded-md px-12 py-12 m-4 bg-white`}>
          {medicine && medicine.medicine && (
            <>
              <div className="py-4">
              
                <div className="flex items-center">
                  <h1
                    className="text-3xl font-bold"
                    style={{
                      marginRight: `calc(12px + 0.4vw)`,
                      fontSize: "27px",
                      color: "#435b66",
                    }}
                  >
                    <span className="mr-2 md-icon-container mt-neg no-mr">
                      <Image
                        src={getIconUrl(transformedDosageForm)}
                        alt={medicine.medicine.dosageForm}
                        title={medicine.medicine.dosageForm}
                        width={31}
                        height={31}
                      />
                    </span>

                    {medicine.medicine.brandName}
                    <small
                      className="h1-subtitle font-normal"
                      style={{
                        fontSize: "15px",
                        color: "#777777",
                        paddingLeft: "5px",
                      }}
                    >
                      {medicine.medicine.dosageForm}
                    </small>
                  </h1>
                </div>
                <p className="pt-4" style={{ color: "#306976" }}>
                  {medicine.medicine.generic}
                </p>
                <p style={{ color: "#777777" }}>{medicine.medicine.strength}</p>
                <p style={{ color: "#0d4663" }}>
                  {medicine.medicine.manufacturer}
                </p>
              </div>
              <div className="py-6">
                <p style={{ color: "#3a5571" }}>
                  {medicine.medicine.price.replace(/,/g, " ")}
                </p>
              </div>
              <div className="similar-brands inline-block mt-10 margin-b-2">
                <Link
                  href={`/medicines/alternative/${medicine.medicine.generic.replace(
                    /\s+/g,
                    "-"
                  )}`}
                  passHref
                >
                  <p className="btn custom-btn">Alternative Brands</p>
                </Link>
              </div>

              {medicine.generic && (
                <div className="py-6">
                  <div className="py-2">
                    <p className="ac-header">Type</p>
                    <p className="ac-body">
                      {medicine.medicine.type.toUpperCase()}
                    </p>
                  </div>
                  {medicine.generic.drugClass && (
                    <div className="py-2">
                      <h3 className="ac-header">Drug Class</h3>
                      <p className="ac-body">{medicine.generic.drugClass}.</p>
                    </div>
                  )}
                  {medicine.generic.indication && (
                    <div id="indications" className="py-2">
                      <h3 className="ac-header">Indications</h3>
                      <p className="ac-body">{medicine.generic.indication}.</p>
                    </div>
                  )}
                  {medicine.generic.indicationDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Indication Description</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.indicationDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.therapeuticClassDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Therapeutic Class</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.therapeuticClassDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.pharmacologyDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Pharmacology</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.pharmacologyDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.dosageDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Dosage</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.dosageDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.administrationDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Administration</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.administrationDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.interactionDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Interaction</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.interactionDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.contraindicationsDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Contraindications</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.contraindicationsDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.sideEffectsDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Side Effects</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.sideEffectsDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.pregnancyAndLactationDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Pregnancy And Lactation</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html:
                            medicine.generic.pregnancyAndLactationDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.precautionsDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Precautions</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.precautionsDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.pediatricUsageDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Pediatric Usage</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.pediatricUsageDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.overdoseEffectsDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Overdose Effects</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.overdoseEffectsDescription,
                        }}
                      />
                    </div>
                  )}
                  {medicine.generic.storageConditionsDescription && (
                    <div className="py-2">
                      <h3 className="ac-header">Storage Conditions</h3>
                      <div
                        className="ac-body"
                        dangerouslySetInnerHTML={{
                          __html: medicine.generic.storageConditionsDescription,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
