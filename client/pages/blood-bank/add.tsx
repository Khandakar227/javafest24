import Layout from "@/components/Layout";
import { userUserLoaded, useUser } from "@/hooks/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";

const BloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];

export default function Add() {
    const [user, setUser] = useUser();
    const [userLoaded, _] = userUserLoaded();
    const router = useRouter();

    useEffect(() => {
        if(!userLoaded) return;
        if(!user) {
            alert("You must be logged in!");
            router.push("/login");
        }
        }, [userLoaded, user])

    function onSubmit(e:FormEvent) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        console.log(data)
    }

    return (
        <>
            <Head>
                <title>Blood Bank - Cerena</title>
            </Head>

            <Layout>
                <div className={`shadow rounded-md px-4 py-12 m-4 bg-white`}>
                    <p className="text-lg text-center">Add necessary information of the donor.<br />
                        For verification, a <b>verification link</b> will be sent to donor's <b>mobile number</b>
                    </p>
                </div>
                
                <div className={`shadow rounded-md px-4 py-12 m-4 bg-white`}>
                    <form onSubmit={onSubmit} className="mx-auto max-w-2xl">
                        <input type="text" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" placeholder="Full Name" name="fullName" id="fullName" required />
                        <select name="gender" id="gender" className="w-full shadow rounded border py-2 px-4 my-3">
                            <option value="">Select Gender</option>
                            {
                                ['Male', 'Female'].map(g => <option value={g}>{g}</option>)
                            }
                        </select>
                        <select name="bloodGroup" id="bloodGroup" className="w-full shadow rounded border py-2 px-4 my-3" required>
                            <option value="">Select Blood Type</option>
                            {
                                BloodGroups.map(bg => <option value={bg}>{bg}</option>)
                            }
                        </select>
                        <input type="tel" name="mobileNo" id="mobileNo" placeholder="Phone Number" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required/>
                        <input type="number" min={12} name="age" id="age" placeholder="Your Age" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3" required/>
                        <button className="my-4 px-4 py-2 rounded-md bg-primary">Save</button>
                    </form>
                </div>
            </Layout>
        </>
    )
}
