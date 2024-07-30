import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { userUserLoaded, useUser } from "@/hooks/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Admin() {
    const [user, setUser] = useUser();
    const [userLoaded, setUserLoaded] = userUserLoaded();
    const router = useRouter();

    useEffect(() => {
        if(!userLoaded) return;
        if(!user || user.role !== "ADMIN") {
            toast.error("You are not authorized to view this page");
            router.push("/");
            return;
        }
    }, [user])
  return (
    <>
      <Head>
        <title>Admin - Cerena</title>
      </Head>
      <Layout>
        {
            !userLoaded || user?.role !== 'ADMIN' ? <Spinner />
            :
            <>
                <div className={`shadow rounded-md px-4 py-12 m-4 bg-white text-center`} >
                    <h2 className="text-2xl font-bold">Admin - Dashboard</h2>
                </div>
            </>

        }
      </Layout>
    </>
  );
}

export default Admin;
