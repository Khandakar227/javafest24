import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-primary bg-opacity-15">
        <div className="bg-white rounded-md shadow p-4 max-w-md w-full">
            <Link href="/"><Image className="mx-auto mb-4" src={'/cerena-logo.png'} alt="Cerena" width={80} height={80} /></Link>
            <form className="pb-8">
                <input type="text" name="email" id="email" placeholder="Email" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <input type="password" name="password" id="password" placeholder="Password" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                <button type="submit" className="mt-2 w-full bg-primary text-white p-2 rounded-md">Login</button>
            </form>
            <p>Don't have an account? <Link className="text-primary underline font-semibold" href={"/signup"}> Register </Link></p>
            <p className="text-end"><button className="text-primary font-semibold"> Forgot Password </button></p>
        </div>
    </div>
  )
}
