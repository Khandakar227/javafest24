import AddDoctor from "@/components/AddDoctor";
import AddExerciseForm from "@/components/Exercise/AddExerciseForm";
import GenericForm from "@/components/GenericForm";
import Layout from "@/components/Layout";
import MedicineForm from "@/components/MedicineForm";
import Modal from "@/components/Modal";
import SignSpeakWordForm from "@/components/SignSpeakWordForm";
import Spinner from "@/components/Spinner";
import { userUserLoaded, useUser } from "@/hooks/user";
import { countDoctors, countDonors, countExercises, countGenerics, countMedicines, countSigns } from "@/lib/api-client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function Admin() {
  const [user, setUser] = useUser();
  const [userLoaded, setUserLoaded] = userUserLoaded();
  const [show, setShow] = useState<"doctors"|"medicines"|"generics"|"exercises"|"asl"|"donors"|"">("");
  const [_countDoctors, setCountDoctors] = useState(0);
  const [_countExercises, setCountExercises] = useState(0);
  const [_countMedicines, setCountMedicines] = useState(0);
  const [_countGenerics, setCountGenerics] = useState(0);
  const [_countDonors, setCountDonors] = useState(0);
  const [_countSigns, setCountSigns] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!userLoaded) return;
    if (!user || user.role !== "ADMIN") {
      toast.error("You are not authorized to view this page");
      router.push("/");
      return;
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    countDoctors()
    .then(res => setCountDoctors(res.count))
    .catch(err => console.log(err));
    countExercises()
    .then(res => setCountExercises(res.count))
    .catch(err => console.log(err));
    countMedicines()
    .then(res => setCountMedicines(res.count))
    .catch(err => console.log(err));
    countGenerics()
    .then(res => setCountGenerics(res.count))
    .catch(err => console.log(err));
    countDonors()
    .then(res => setCountDonors(res.count))
    .catch(err => console.log(err));
    countSigns()
    .then(res => setCountSigns(res.count))
    .catch(err => console.log(err));
    
  }, [user])

  return (
    <>
      <Head>
        <title>Admin - Cerena</title>
      </Head>
      <Layout>
        {!userLoaded || user?.role !== "ADMIN" ? (
          <Spinner />
        ) : (
          <>
            <div
              className={`shadow rounded-md px-4 pt-12 pb-6 m-4 bg-white text-center`}
            >
              <h2 className="text-2xl font-bold">Admin - Dashboard</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 justify-center">
              <div>
                <div className={`shadow rounded-md px-4 py-6 m-4 bg-white`}>
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="font-semibold text-xl md:text-2xl">Doctors Inventory</h2>
                    <button onClick={() => setShow("doctors")} className="bg-primary rounded px-2 py-1">Add</button>
                  </div>
                  <p className="font-semibold text-xl text-end pt-4">
                    Total: {_countDoctors}
                  </p>
                </div>

              <div className={`shadow rounded-md px-4 py-6 m-4 bg-white`}>
                <div className="flex justify-between items-center gap-4 pt-4">
                  <h2 className="font-semibold text-xl md:text-2xl">Generics</h2>
                  <button onClick={() => setShow("generics")} className="bg-primary rounded px-2 py-1">
                    Add Generic
                  </button>
                </div>
                <p className="font-semibold text-xl text-end py-4">
                  Total: {_countGenerics}
                </p>
                <hr />
                <div className="flex justify-between items-center gap-4 pt-4">
                  <h2 className="font-semibold text-xl md:text-2xl">Medicine Inventory</h2>
                  <button onClick={() => setShow("medicines")} className="bg-primary rounded px-2 py-1">
                    Add Medicine
                  </button>
                </div>
                <p className="font-semibold text-xl text-end py-4">
                    Total: {_countMedicines}
                </p>
              </div>
              </div>
            <div>

                <div className={`shadow rounded-md px-4 py-6 m-4 bg-white`}>
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="font-semibold text-xl md:text-2xl">Exercises</h2>
                    <button onClick={() => setShow("exercises")} className="bg-primary rounded px-2 py-1">Add</button>
                  </div>
                  <p className="font-semibold text-xl text-end pt-4">
                    Total: {_countExercises}
                  </p>
                </div>
                
                <div className={`shadow rounded-md px-4 py-6 m-4 bg-white`}>
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="font-semibold text-xl md:text-2xl">Donors</h2>
                    <Link href={"/blood-bank/add"} className="bg-primary rounded px-2 py-1">Add</Link>
                  </div>
                  <p className="font-semibold text-xl text-end pt-4">
                    Total: {_countDonors}
                  </p>
                </div>
                
                <div className={`shadow rounded-md px-4 py-6 m-4 bg-white`}>
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="font-semibold text-xl md:text-2xl">ASL Word Dictionary</h2>
                    <button onClick={() => setShow("asl")} className="bg-primary rounded px-2 py-1">Add</button>
                  </div>
                  <p className="font-semibold text-xl text-end pt-4">
                    Total: {_countSigns}
                  </p>
                </div>
            </div>
            </div>
            <Modal open={show} onClose={() => setShow("")}>
              <div className="text-end"><button onClick={() => setShow("")}><IoClose size={22}/></button></div>
              {
              show == 'doctors' ?
              <AddDoctor />
              :
              show == "exercises" ?
              <AddExerciseForm/>
              :
              show == "generics" ?
              <GenericForm />
              :
              show == "medicines" ?
              <MedicineForm />
              :
              show == "asl" ?
              <SignSpeakWordForm />
              :
              ""
              }
            </Modal>
          </>
        )}
      </Layout>
    </>
  );
}

export default Admin;
