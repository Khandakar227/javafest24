import Modal from "@/components/Modal";
import PasswordResetLinkForm from "@/components/PasswordResetLinkForm";
import { useUser } from "@/hooks/user";
import { login } from "@/lib/api-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [_, setUser] = useUser();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      setLoading(true);
      const res = await login(data); // this function also saves the token in local storage
      if (res.error) {
        toast.error(res.message);
        setLoading(false);
        return;
      }
      setUser(res.user);
      setLoading(false);
      router.push('/');
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-primary bg-opacity-15">
        <div className="bg-white rounded-md shadow p-4 max-w-md w-full">
          <Link href="/" className="mx-auto mb-4 block w-fit"><Image src={'/cerena-logo.png'} alt="Cerena" width={80} height={80} /></Link>
          <form className="pb-8" onSubmit={onSubmit}>
            <input type="text" name="email" id="email" placeholder="Email" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <input type="password" name="password" id="password" placeholder="Password" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <button disabled={loading} type="submit" className="mt-2 w-full bg-primary text-white p-2 rounded-md">{loading ? 'Loading...' : 'Login'}</button>
          </form>
          <p>Don't have an account?<Link className="text-primary underline font-semibold" href={"/signup"}> Register </Link></p>
          <p className="text-end"><button onClick={() => setShowForgotPassword(true)} className="text-primary font-semibold"> Forgot Password </button></p>
        </div>
      </div>
      <Modal onClose={() => setShowForgotPassword(false)} open={showForgotPassword} >
          <h1 className="py-2 text-2xl font-semibold">Reset Password</h1>
          <p>A password reset mail will be sent to your account.</p>
          <PasswordResetLinkForm/>
          <button className="mt-4 w-full bg-red-400 text-white p-2 rounded-md" onClick={() => setShowForgotPassword(false)}>Close</button>
      </Modal>
    </>
  )
}