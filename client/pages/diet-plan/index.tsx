import Accordion from "@/components/Accordion";
import Layout from "@/components/Layout";
import { getDietPlan } from "@/lib/api-client";
import { Meal } from "@/types";
import Head from "next/head";
import { FormEvent, useState } from "react";

export default function DietPlan() {
  const [show, setShow] = useState(false);
  const [dietPlan, setDietPlan] = useState([] as Meal[]);
  const showDietPlanForm = () => {
    setShow(true);
  }

  return (
    <>
      <Head>
        <title>Diet Plan - Cerena</title>
        <meta name="description" content="Find doctors near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="p-4">
            <div className="bg-diet-plan rounded-md shadow p-4 bg-cover bg-no-repeat min-h-screen grid md:grid-cols-2 justify-center items-start gap-4">
              <div className="mt-6">
                <div className="px-4 py-12 shadow rounded backdrop-blur bg-white bg-opacity-30 mb-6">
                  <h1 className="md:text-4xl text-3xl font-bold pb-2">Create your diet plan today</h1>
                  <p className="text-green-800 font-semibold text-xl pb-12">Personalized and Goal oriented plan</p>
                  <button className="px-4 py-2 rounded-md bg-primary" onClick={showDietPlanForm}>Get Started</button>
                </div>
                {show && <DietPlanForm setDietPlan={setDietPlan} />}
              </div>

              <div className="p-4 sticky top-0">
              {
                dietPlan.length > 0 && (
                  <div className="bg-white p-4 rounded-md shadow bg-opacity-60 backdrop-blur">
                    <h1 className="text-3xl font-semibold">Today's Meal Plan</h1>
                    <div className="mt-4">
                      {
                        dietPlan.map((meal, index) => (
                          <div key={index + meal.name} className="mt-4 rounded shadow p-4 bg-white">
                            <h2 className="text-xl font-semibold">{meal.type}</h2>
                            <p className="text-sm text-gray-500">{meal.calories} Calories</p>
                            <Accordion title={meal.name}>
                              <p className="font-bold">Ingrediants:</p>
                              <ul className="list-disc list-inside">
                                {
                                  meal.ingrediants.map((ingrediant, index) => (
                                    <li key={index + ingrediant}>{ingrediant}</li>
                                  ))
                                }
                              </ul>
                            </Accordion>                              
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              </div>
            </div>
        </div>
      </Layout>
    </>
  )
}

const DietPlanForm = ({setDietPlan}:{setDietPlan:(data:any) => void}) => {
  const goals = ["Maintain", "Lose Weight", "Gain Muscle"];
  const genders = ['Male', 'Female'];
  const activityLevels = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'];
  const mealTimings = ['2 times a day', '3 times a day', '4 times a day'];
  const exerciseIntensities = ['Don\'t Exercise', 'Light 1-2 times a week', 'Moderate 3-4 times a week', 'Intense 5-6 times a week', 'Very Intense daily'];
  
  const [loading, setLoading] = useState(false);

  function generate(e:FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setLoading(true);

    console.log(data);
    
    getDietPlan(data).then((res) => {
      console.log(res);
      setDietPlan(res.diet_plan);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }
  return (
    <div className="bg-white p-4 rounded-md shadow bg-opacity-60 backdrop-blur">
      <h1 className="text-3xl font-semibold">Put your diet on autopilot</h1>

      <form onSubmit={generate}>
        <div className="flex justify-between items-center">
          <span>Goal:</span>
          <div className="flex justify-center items-center py-4 flex-wrap">
            {
              goals.map((goal, index) => (
                <label key={index + goal} className="group md:tex-lg">
                  <input type="radio" name="goal" id="goal" value={goal} className="peer hidden" defaultChecked={index == 0} />
                  <span className="peer-checked:bg-primary px-3 py-1 rounded-t-md border border-primary">{goal}</span>
                </label>
              ))
            }
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Gender:</span>
          <div className="flex justify-center items-center py-4 flex-wrap">
            {
              genders.map((gender, index) => (
                <label key={index +  gender} className="group md:tex-lg">
                  <input type="radio" name="gender" id="gender" value={gender} className="peer hidden" defaultChecked={index == 0} />
                  <span className="peer-checked:bg-primary px-3 py-1 rounded-t-md border border-primary">{gender}</span>
                </label>
              ))
            }
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <input type="number" name="age" id="age" placeholder="Age" className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
            <label htmlFor="age"> years</label>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <input type="number" name="height" id="height" placeholder="Height" className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
            <label htmlFor="height"> cm</label>
        </div>
        
        <div className="mt-2 flex items-center gap-4">
          <input type="number" name="weight" id="weight" placeholder="Weight" className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
            <label htmlFor="weight"> kg</label>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span>Activity Level:</span>
          <select name="activityLevel" id="activityLevel" className="rounded-md focus:outline-primary p-2 shadow-sm border border-gray-300">
            {
              activityLevels.map((activity, index) => (
                <option key={index + activity} value={activity}>{activity}</option>
              ))
            }
          </select>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span>Meal Timings:</span>
          <select name="mealTimings" id="mealTimings" className="rounded-md focus:outline-primary p-2 shadow-sm border border-gray-300">
            {
              mealTimings.map((timing, index) => (
                <option key={index + timing} value={timing}>{timing}</option>
              ))
            }
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>Exercise Intensity:</span>
          <select name="exerciseIntensity" id="exerciseIntensity" className="rounded-md focus:outline-primary p-2 shadow-sm border border-gray-300">
            {
              exerciseIntensities.map((intensity, index) => (
                <option key={index + intensity} value={intensity}>{intensity}</option>
              ))
            }
          </select>
        </div>
        <input type="text" name="allergies" id="allergies" placeholder="Foods that trigger allergies (Seperated by comma (,) Leave blank if none )" className="mt-4 w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
        <input type="text" name="medicalConditions" id="medicalConditions" placeholder="Medical Conditions if any" className="mt-4 w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
        <input type="text" name="beverageConsumption" id="beverageConsumption" placeholder="Beverage Consumption (Water, Tea, Coffee etc.)" className="mt-4 w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
        
        <button className="mt-6 px-4 py-2 rounded-md bg-green-600 text-white font-semibold"> {loading ? 'Generating...' : 'Generate'}</button>
      </form>
    </div>
  )
}