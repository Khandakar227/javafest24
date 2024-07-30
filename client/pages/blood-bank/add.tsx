import { useState, useEffect, FormEvent } from "react";
import Layout from "@/components/Layout";
import { useUser, userUserLoaded } from "@/hooks/user";
import Head from "next/head";
import { useRouter } from "next/router";
import GoogleMapComponent from "@/components/GoogleMap";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { BloodGroups } from "@/lib/const";
import { Address } from "@/types";
import { registerDonor } from "@/lib/api-client";

export default function Add() {
  const [user, setUser] = useUser();
  const [userLoaded, _] = userUserLoaded();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

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
    console.log(userInfo);
    setLoading(true)
    registerDonor(userInfo)
    .then(response => {
      if (response.error) return toast.error(response.error);
      (e.target as HTMLFormElement).reset();
      setAddresses([]);
      toast.success("Donor added successfully!");
    })
    .catch(err => {
      toast.error(err.message);
      console.log(err)
    })
    .finally(() => setLoading(false));
  }


async function handleLocationSelect(fullAddress: {location: number[], name:string}) {    
    setAddresses(a => {
      return [...a, fullAddress]
    })
  }

  async function removeAddress(address: Address) {
    setAddresses(a => {
      const addresses = a.filter(_a => _a.name != address.name)
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
                addresses.map(a => <div key={a.name} className="bg-primary bg-opacity-20 py-1 px-2 border rounded w-full flex items-center justify-between gap-1 my-2">
                  <p>{a.name}</p>
                  <button onClick={() => removeAddress(a)}><IoClose /></button>
                </div>)
              }
              <GoogleMapComponent onLocationSelect={handleLocationSelect} mapVisible={true} />
              <button disabled={loading} type="submit" className="my-4 px-4 py-2 rounded-md bg-primary text-white">{loading ? "Please wait..." : "Save"}</button>
            </form>
        </div>
      </Layout>
    </>
  );
}
