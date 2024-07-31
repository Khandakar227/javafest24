import { districts, medical_specialties } from "@/lib/doctor-data";
import { addDoctor, uploadPhoto } from "@/lib/api-client";
import { FormEvent, useState } from "react"
import toast from "react-hot-toast";
import UploadPhoto from "./UploadPhoto";

export default function AddDoctor() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File| null>(null);

    const onAddDoctor = (e:FormEvent) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        setLoading(true);
        // uploadPhoto(image as File).then(fileResponse => {
        //     if(fileResponse.error) return toast.error(fileResponse.message);
        //     addDoctor({...data, photo: fileResponse.})
        //     .then(res => {
    
        //     }).catch(err => {
        //         console.log(err)
        //     })
        //     .finally(() => setLoading(false))
        // })
        console.log(data);
    }
  return (
    <div>
        <h2 className="text-xl pb-4 font-semibold"> Add a Doctors Information </h2>
        <form onSubmit={onAddDoctor}>
            <UploadPhoto image={image} setImage={setImage} />
            <input type="text" name="name" id="name" placeholder="Doctor's Name" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <input type="text" name="degree" id="degree" placeholder="Degree" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <input type="text" name="workplace" id="workplace" placeholder="Workplace" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <input type="text" name="designation" id="designation" placeholder="Designation" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <select name="specialty" id="specialty" className="mt-2 border px-4 py-2 rounded-md shadow outline-none">
                <option value="">Select Medical Speciality</option>
                {
                    medical_specialties.map(ss => <option value={ss.value} key={ss.label}>{ss.label}</option>)
                }
            </select>
            <select name="district" id="district" className="mt-2 border px-4 py-2 rounded-md shadow outline-none">
                <option value="">Select District</option>
                {districts.map(d => <option value={d} key={d}>{d}</option>)}
            </select>
            <textarea name="about" id="about" placeholder="About" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            <textarea name="contact" id="contact" placeholder="Contact Information" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
            <button disabled={loading} className="bg-primary px-4 py-2 rounded mt-4">{loading ? 'Loading...' : 'Add'}</button>
        </form>
    </div>
  )
}

