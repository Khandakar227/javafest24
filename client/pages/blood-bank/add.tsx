import { useState, useEffect, FormEvent } from "react";
import Layout from "@/components/Layout";
import { useUser, userUserLoaded } from "@/hooks/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { registerDonor, searchDonorsByCity } from "@/lib/api-client";
import { cities, divisions } from "@/lib/const";
import GoogleMapComponent from "@/components/GoogleMap";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

type FulllAdress = { lat?: number, lng: number, address: string }

const BloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];


export default function Add() {
  const [user, setUser] = useUser();
  const [userLoaded, _] = userUserLoaded();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [addresses, setAddresses] = useState<FulllAdress[]>([]);

  useEffect(() => {
    if (!userLoaded) return;
    if (!user) {
      toast.error("You must be logged in!");
      router.push("/login");
    }
  }, [userLoaded, user]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    const userInfo = { ...data, addresses };
    setLoading(true)
    registerDonor(userInfo)
    .then(response => {
      if (response.error) return toast.error(response.error);
      (e.target as HTMLFormElement).reset();
      setAddresses([]);
    })
    .catch(err => {
      toast.error(err.message);
      console.log(err)
    })
    .finally(() => setLoading(false));
  }

  async function handleLocationSelect(fullAddress: any) {
    setAddresses(a => [...a, fullAddress])
  }

  async function removeAddress(address: FulllAdress) {
    setAddresses(a => {
      const addresses = a.filter(_a => _a.address != address.address)
      return addresses;
    })
  }

  return (
    <>
      <Head>
        <title>Blood Bank - Cerena</title>
      </Head>

      <Layout>
        <div className="shadow rounded-md px-4 py-12 m-4 bg-white">
          <p className="text-lg text-center">Add necessary information of the donor.<br />
            For verification, a <b>verification link</b> will be sent to donor's <b>mobile number</b>
          </p>
        </div>

        <div className="shadow rounded-md px-4 py-12 m-4 bg-white">
          {!registrationSuccessful && (
            <form onSubmit={onSubmit} className="mx-auto max-w-2xl">
              <input type="text" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" placeholder="Full Name" name="fullName" id="fullName" required />
              <select name="gender" id="gender" className="w-full shadow rounded border py-2 px-4 my-3">
                <option value="">Select Gender</option>
                {['Male', 'Female'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select name="bloodGroup" id="bloodGroup" className="w-full shadow rounded border py-2 px-4 my-3" required>
                <option value="">Select Blood Type</option>
                {BloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
              <input type="tel" name="mobileNo" id="mobileNo" placeholder="Phone Number" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required />
              <input type="number" min={12} name="age" id="age" placeholder="Your Age" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required />
              <p className="pt-4">Address: </p>
              {
                addresses.map(a => <div key={a.lat + ' ' + a.lng} className="bg-primary bg-opacity-20 py-1 px-2 border rounded w-full flex items-center justify-between gap-1 my-2">
                  <p>{a.address}</p>
                  <button onClick={() => removeAddress(a)}><IoClose /></button>
                </div>)
              }
              <GoogleMapComponent onLocationSelect={handleLocationSelect} />
              <button disabled={loading} type="submit" className="my-4 px-4 py-2 rounded-md bg-primary text-white">{loading ? "Please wait..." : "Save"}</button>
            </form>
          )}
        </div>
      </Layout>
    </>
  );
}
