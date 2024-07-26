import BMIProgress from "@/components/BMIProgress";
import Layout from "@/components/Layout";
import { calculateBMI } from "@/lib/api-client";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const FEET_TO_METER = 0.3048;
const POUND_TO_KG = 0.453592;

export default function BmiCalculator() {
  const [bmi, setBmi] = useState(0);
  const [status, setStatus] = useState("");

  const calculate = async (e: FormEvent) => {
    e.preventDefault();
    let weight, height;
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    console.log(data);
    if (!data.weight || !data.height) {
      toast.error("Please enter weight and height");
      return;
    }
    weight =
      data.weightUnit === "lb"
        ? parseFloat(data.weight as string) * POUND_TO_KG
        : parseFloat(data.weight as string);
    height =
      data.heightUnit === "ft"
        ? parseFloat(data.height as string) * FEET_TO_METER
        : parseFloat(data.height as string);

    const response = await calculateBMI(weight, height);
    setBmi(response.bmi || 0);
    setStatus(response.category || "");
  };

  return (
    <>
      <Head>
        <title>BMI Calculator - Cerena</title>
      </Head>
      <Layout>
        <div
          className={`shadow rounded-md px-4 py-12 m-4 bg-white text-center`}
        >
          <h1 className="font-bold md:text-3xl text-2xl">Calculate BMI</h1>
          <p className="mx-auto max-w-7xl text-justify py-4">
            BMI is a measurement of a person's leanness or corpulence based on
            their height and weight, and is intended to quantify tissue mass. It
            is widely used as a general indicator of whether a person has a
            healthy body weight for their height. Specifically, the value
            obtained from the calculation of BMI is used to categorize whether a
            person is underweight, normal weight, overweight, or obese depending
            on what range the value falls between.
          </p>
        </div>
        <div
          className={`shadow rounded-md px-4 py-6 m-4 bg-white mx-auto grid md:grid-cols-2 gap-4 justify-between items-center`}
        >
          <form onSubmit={calculate}>
            <div className="flex justify-center items-center gap-4 max-w-xl">
              <input
                type="number"
                name="weight"
                id="weight"
                step="0.01"
                placeholder="Weight"
                className="flex-1 w-full shadow border rounded-md outline-none px-4 py-2 my-3"
              />
              <select
                name="weightUnit"
                id="weightUnit"
                className="shadow rounded border py-2 px-4 my-3"
              >
                <option value="kg">Kg</option>
                <option value="lb">Pound</option>
              </select>
            </div>
            <div className="flex justify-center items-center gap-4 max-w-xl">
              <input
                type="number"
                name="height"
                id="height"
                step="0.01"
                placeholder="Height"
                className="flex-1 w-full shadow border rounded-md outline-none px-4 py-2 my-3"
              />
              <select
                name="heightUnit"
                id="heightUnit"
                className="shadow rounded border py-2 px-4 my-3"
              >
                <option value="m">Meter</option>
                <option value="ft">Feet</option>
              </select>
            </div>

            <div className="flex gap-4 items-center py-6">
              <span>Gender: </span>
              <label>
                <input
                  type="radio"
                  className="p-1 accent-primary"
                  name="gender"
                  value={"male"}
                  checked
                  id="gender"
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  className="p-1 accent-primary"
                  name="gender"
                  value={"female"}
                  id="gender"
                />
                Female
              </label>
            </div>
            <button className="bg-primary px-4 py-2 rounded">Calculate</button>
          </form>
          <div className="mx-auto">
            <BMIProgress bmi={bmi} />
            {
              bmi > 0 && (
                <p className="text-center">
                  Your BMI is <b>{bmi.toFixed(2)}</b> and you are <b>{status}</b>
                </p>
              )
            }
          </div>
        </div>

        <div className="bg-white p-4 m-4 rounded shadow">
          <h2 className="text-xl font-semibold py-4">BMI table for adults</h2>
          <p>This is the World Health Organization's (WHO) recommended body weight based on BMI values for adults. It is used for both men and women, age 20 or older.</p>
          <table align="center">
            <tbody>
              <tr><td className="font-semibold border px-2 py-1 bg-slate-50">Classification</td><td className="font-semibold border px-2 py-1 bg-slate-50">BMI range - kg/m<sup>2</sup></td></tr>
              <tr><td className="border px-2 py-1">Severe Thinness</td><td className="border px-2 py-1" align="center">&lt; 16</td></tr>
              <tr><td className="border px-2 py-1">Moderate Thinness</td><td className="border px-2 py-1" align="center">16 - 17</td></tr>
              <tr><td className="border px-2 py-1">Mild Thinness</td><td className="border px-2 py-1" align="center">17 - 18.5</td></tr>
              <tr><td className="border px-2 py-1">Normal</td><td className="border px-2 py-1" align="center">18.5 - 25</td></tr>
              <tr><td className="border px-2 py-1">Overweight</td><td className="border px-2 py-1" align="center">25 - 30</td></tr>
              <tr><td className="border px-2 py-1">Obese Class I</td><td className="border px-2 py-1" align="center">30 - 35</td></tr>
              <tr><td className="border px-2 py-1">Obese Class II</td><td className="border px-2 py-1" align="center">35 - 40</td></tr>
              <tr><td className="border px-2 py-1">Obese Class III</td><td className="border px-2 py-1" align="center">&gt; 40</td></tr>
            </tbody>
          </table>
        </div>


        <div className="bg-white p-4 m-4 rounded shadow">
          <h2 className="text-xl font-semibold py-4">BMI chart for adults</h2>
          <p className="pb-4">This is a graph of BMI categories based on the World Health Organization data. The dashed lines represent subdivisions within a major categorization.</p>
          <Image src="/bmi-chart.gif" alt="BMI Chart" width={600} height={400} className="mx-auto" />
        </div>
      </Layout>
    </>
  );
}
