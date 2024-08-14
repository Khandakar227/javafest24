import Layout from "@/components/Layout";
import { getDoctor } from "@/lib/api-client";
import { Doctor } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function extractDoctorInfo(contactInfo: string) {
  const addressMatch = contactInfo.match(/Address:\s*(.*)/);
  const visitingHourMatch = contactInfo.match(/Visiting Hour:\s*(.*)/);
  const appointmentMatch = contactInfo.match(/Appointment:\s*(.*)/);

  const address = addressMatch ? addressMatch[1] : "";
  const visitingHour = visitingHourMatch ? visitingHourMatch[1] : "";
  const appointment = appointmentMatch ? appointmentMatch[1] : "";

  return { address, visitingHour, appointment };
}

export default function DoctorPage() {
  const router = useRouter();
  const [doctor, setDoctor] = useState({} as Doctor);

  useEffect(() => {
    getDoctor(router.query.id as string)
      .then((res) => {
        setDoctor(res);
      })
      .catch((err) => console.log(err));
  }, [router.query.id]);
  if (!doctor) return null;
  const { address, visitingHour, appointment } = doctor.contact
    ? extractDoctorInfo(doctor.contact)
    : { address: "", visitingHour: "", appointment: "" };
  return (
    <Layout>
      <div className="p-4">
        <div
          className="p-4 px-12 shadow rounded  mx-auto max-w-2xl bg-[#f0ffef]"
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "15px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h1 className="text-2xl font-semibold ac-header felx justify-between">
            {doctor.name}
          </h1>
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-40 h-40 rounded-full shadow my-4 mx-auto"
          />

          <p className="font-semibold ac-header ">Contact</p>
          {/* <p className="mb-4 p-1 whitespace-pre-wrap  ">{doctor.contact}</p> */}
          <div className="flex justify-between py-3">
            <div>
              <p>
                <strong className="text-[#1A4870] py-2">Address :</strong> {address}
              </p>
              <div>
                <p>
                  <strong  className="text-[#1A4870] py-2">Appointment :</strong> {appointment}
                </p>
              </div>

              <div>
                <p>
                  <strong  className="text-[#1A4870] py-2">Visiting Hour :</strong> {visitingHour}
                </p>
              </div>
            </div>
          </div>

          <p className="font-semibold ac-header ">Speciality</p>

          <p className="pb-8">{doctor.speciality}</p>

          {doctor.designation && (
            <>
              <p className="font-semibold ac-header ">Designation</p>
              <p className="pb-8">{doctor.designation}</p>
            </>
          )}
          <p className="font-semibold ac-header ">Degree</p>
          <p className="mb-4 p-1">{doctor.degree}</p>
          <p className="font-semibold ac-header ">Chamber</p>
          <p className="pb-8">{doctor.chamber}</p>

          <p className="font-semibold ac-header ">Workplace</p>
          <p className="pb-8">{doctor.workplace}</p>

          <p className="font-semibold ac-header ">District</p>
          <p className="pb-8">{doctor.district}</p>

          <p className="font-semibold ac-header ">About</p>
          <p className="mb-4 p-1 text-justify">{doctor.about}</p>
        </div>
      </div>
    </Layout>
  );
}
