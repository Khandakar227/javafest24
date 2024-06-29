import { serverUrl } from "@/lib/const";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

export default function Register() {
  const reguster = async (e:FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if(data.confirm_password != data.password) {
      alert("Password Mismatch");
      return;
    }
    const res = (await fetch(serverUrl + '/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })).json();
    console.log(res);
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-primary bg-opacity-15">
        <div className="bg-white rounded-md shadow p-4 max-w-md w-full">
            <Link href="/"><Image className="mx-auto mb-4" src={'/cerena-logo.png'} alt="Cerena" width={80} height={80} /></Link>
            <form className="pb-8" onSubmit={reguster}>
                <input type="text" name="name" id="name" placeholder="Name" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="email" name="email" id="email" placeholder="Email" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="password" name="password" id="password" placeholder="Password" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="password" name="confirm_password" id="password" placeholder="Confirm Password" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <button type="submit" className="mt-2 w-full bg-primary text-white p-2 rounded-md">Sign up</button>
            </form>
            <p>Have an account? <Link className="text-primary underline font-semibold" href={"/login"}> Login </Link></p>
            <p className="text-end"><button className="text-primary font-semibold"> Forgot Password </button></p>
        </div>
    </div>
  )
}
