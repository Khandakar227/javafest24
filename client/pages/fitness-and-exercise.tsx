import FemaleMuscleFront from "@/components/Exercise/FemaleMuscleFront";
import Layout from "@/components/Layout";
import MaleMuscleBack from "@/components/Exercise/MaleMuscleBack";
import MaleMuscleFront from "@/components/Exercise/MaleMuscleFront";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import FemaleMuscleBack from "@/components/Exercise/FemaleMuscleBack";

export default function FitnessAndExercise() {
  const [gender, setGender] = useState('male');

  function onGenderSelect(e:ChangeEvent) {
    const selected = (e.target as HTMLSelectElement).value;
    setGender(selected);
  }
  return (
    <>
      <Head>
        <title>Exercise - Cerena</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="bg-white p-4 m-4 rounded">
          <div className="flex items-center text-sm gap-4 justify-center">
            <label htmlFor="gender" className="mr-2">Gender</label>
            <select name="gender" id="gender" className="px-4 py-2 rounded-md shadow outline-none" onChange={onGenderSelect}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <h1 className="text-2xl text-center">Muscle Diagram</h1>
        {
          gender == 'male' ? 
        <div className="grid md:grid-cols-2 gap-4 justify-center items-start">
          <div className="bg-white p-4 m-4 rounded">
              <MaleMuscleFront />
          </div>
          <div className="bg-white p-4 m-4 rounded">
              <MaleMuscleBack />
          </div>
        </div>
        :
        
        <div className="grid md:grid-cols-2 gap-4 justify-center items-start">
          <div className="bg-white p-4 m-4 rounded">
              <FemaleMuscleFront />
          </div>
          <div className="bg-white p-4 m-4 rounded">
              <FemaleMuscleBack />
          </div>
        </div>
        }
      </Layout>
    </>
  )
}
