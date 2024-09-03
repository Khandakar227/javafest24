import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import UploadPhoto from "@/components/UploadPhoto";
import { userUserLoaded, useUser } from "@/hooks/user";
import { getDoctor, updateDoctor, uploadPhoto } from "@/lib/api-client";
import { mainUrl } from "@/lib/const";
import { districts, medical_specialties } from "@/lib/doctor-data";
import { Doctor } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Update() {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState({} as Doctor);
  const [user, _] = useUser();
  const [loaded, __] = userUserLoaded();
  const router = useRouter();
  const [image, setImage] = useState<File| null>(null);


  useEffect(() => {
    getDoctor(router.query.id as string)
      .then((res) => {
        setDoctor(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [router.query.id]);


  useEffect(() => {
    if (!loaded) return;
    if (!user || user.role != "ADMIN") {
        toast.error("You are not authorized to view this page.");
        router.push("/");
    }
  }, [loaded, user]);


 async function onUpdaeDoctor(e:FormEvent) {
    e.preventDefault();
    const formData= new FormData(e.target as HTMLFormElement);
    formData.delete('file');
    const data = Object.fromEntries(formData);
    setLoading(true);
    let photo = doctor.photo;
    if(image) {
      const imgResponse = await uploadPhoto(image as File);
      photo = mainUrl + "/" + imgResponse.filePath;
    }
    console.log({...doctor, ...data, photo});
    const res = await updateDoctor({...doctor, ...data, photo});
    if(res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    toast.success("Doctor updated successfully");
  }

  return (
    <>
    <Head>
      <title>Modify Doctor Info - Cerena</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
        {
            !loaded || !user || user.role!='ADMIN' ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
              <div className="p-4">
                <form onSubmit={onUpdaeDoctor} className="p-4 bg-white shadow rounded">
                <UploadPhoto image={image} setImage={setImage} />
                <input type="text" name="name" defaultValue={doctor.name} id="name" placeholder="Doctor's Name" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="text" name="degree" defaultValue={doctor.degree} id="degree" placeholder="Degree" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="text" name="workplace" defaultValue={doctor.workplace} id="workplace" placeholder="Workplace" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="text" name="designation" defaultValue={doctor.designation} id="designation" placeholder="Designation" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <select name="speciality" id="specialty" className="mt-2 border px-4 py-2 rounded-md shadow outline-none">
                    <option value="">Select Medical Speciality</option>
                    {
                        medical_specialties.map(ss => <option value={ss.value} key={ss.label} selected={doctor.speciality == ss.label}>{ss.label}</option>)
                    }
                    {
                      medical_specialties.find(ss => ss.value == doctor.speciality) ? null : <option value={doctor.speciality} key={doctor.speciality} selected={true}>{doctor.speciality}</option>
                    }
                </select>
                <select name="district" id="district" className="mt-2 border px-4 py-2 rounded-md shadow outline-none">
                    <option value="">Select District</option>
                    {districts.map(d => <option value={d} key={d} selected={doctor.district == d}>{d}</option>)}
                </select>
                <input name="chamber" id="chamber" defaultValue={doctor.chamber} placeholder="Chamber" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
                <textarea name="about" id="about" defaultValue={doctor.about} placeholder="About" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm min-h-28"></textarea>
                <textarea name="contact" id="contact" defaultValue={doctor.contact} placeholder="Contact Information" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm min-h-28"></textarea>
                <button disabled={loading} className="bg-primary px-4 py-2 rounded mt-4">{loading ? 'Loading...' : 'Add'}</button>
              </form>
              </div>
            )
        }
    </Layout>
    </>
  )
}

