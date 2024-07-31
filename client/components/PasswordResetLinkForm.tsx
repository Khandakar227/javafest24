import { sendPasswordResetLink } from "@/lib/api-client";
import { FormEvent, useState } from "react"
import toast from "react-hot-toast";

export default function PasswordResetLinkForm() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        if(!data.email) return;
        setLoading(true);
        sendPasswordResetLink(data.email as string).then(res => {
            if(res.error) {
                toast.error(res.message || res.error);
                return;
            }
            toast.success("Password reset link sent to your email.");
            (e.target as HTMLFormElement).reset();
        }).catch(err => console.log(err))
        .finally(() => setLoading(false));
    }

    return (
    <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" placeholder="Email" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
        <button disabled={loading} type="submit" className="mt-2 w-full bg-primary text-white p-2 rounded-md">{loading ? 'Please wait...' : 'Send Reset Link'}</button>
    </form>
  )
}
