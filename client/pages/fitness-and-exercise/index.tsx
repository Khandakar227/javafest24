import FemaleMuscleFront from "@/components/Exercise/FemaleMuscleFront";
import Layout from "@/components/Layout";
import MaleMuscleBack from "@/components/Exercise/MaleMuscleBack";
import MaleMuscleFront from "@/components/Exercise/MaleMuscleFront";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import FemaleMuscleBack from "@/components/Exercise/FemaleMuscleBack";

export default function FitnessAndExercise() {
  const [gender, setGender] = useState('male');

  useEffect(() => { 
    const _gender = localStorage.getItem("exercise-gender");
    setGender(_gender ? _gender : "male");
  },[]);

  function onGenderSelect(e:ChangeEvent) {
    const selected = (e.target as HTMLSelectElement).value;
    localStorage.setItem("exercise-gender", selected);
    setGender(selected);
  }
  return (
    <>
      <Head>
        <title>Exercise - Cerena</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div className="bg-white p-4 m-4 rounded shadow">
        <h1 className="text-3xl font-semibold text-center py-12">A Sound Mind<br/> lives in a Sound Body</h1>
      </div>
        <div className="bg-white p-4 m-4 rounded shadow">
          <div className="flex items-center text-sm gap-4 justify-center">
            <label htmlFor="gender" className="mr-2">Gender</label>
            <select name="gender" id="gender" className="px-4 py-2 rounded-md shadow outline-none" value={gender} onChange={onGenderSelect}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <h1 className="text-2xl text-center">Muscle Diagram</h1>
        {
          gender == 'male' ? 
        <div className="grid md:grid-cols-2 gap-4 justify-center items-start">
          <div className="bg-white p-4 m-4 rounded shadow">
              <MaleMuscleFront />
          </div>
          <div className="bg-white p-4 m-4 rounded shadow">
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
