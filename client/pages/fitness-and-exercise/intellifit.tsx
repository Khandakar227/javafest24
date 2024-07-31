import Layout from "@/components/Layout";
import { getWorkoutPlans } from "@/lib/api-client";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useUser } from "@/hooks/user";
import { WorkoutPlan } from "@/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import WorkoutPlanPDF from "@/components/WorkoutPlanPDF";

const fitnessGoals = [
  "Weight Loss",
  "Muscle Gain",
  "Strength Building",
  "Endurance",
  "Flexibility",
  "General Fitness",
  "Cardiovascular Health",
  "Athletic Performance",
  "Body Toning",
  "Injury Recovery",
  "Stress Relief",
  "Balance and Stability",
  "Improved Mobility",
  "Increased Energy Levels",
];

const workoutTypes = [
  "Cardio",
  "Strength Training",
  "High-Intensity Interval Training (HIIT)",
  "Yoga",
  "Pilates",
  "CrossFit",
  "Bodyweight Exercises",
  "Resistance Band Workouts",
  "Weightlifting",
  "Circuit Training",
  "Swimming",
  "Cycling",
  "Running",
  "Walking",
  "Stretching",
  "Dance Workouts",
  "Martial Arts",
  "Boxing",
  "Rowing",
  "Kettlebell Workouts",
  "Core Workouts",
  "Balance Training",
  "Sports-Specific Training",
];

export default function Intellifit() {
  const [loading, setLoading] = useState(false);
  const [workoutPlans, setWorkOutPlans] = useState([] as WorkoutPlan[]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData),
      workout: formData.getAll("workout").join(", "),
    };
    getWorkoutPlans(data)
      .then((res) => {
        setWorkOutPlans(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const clear = () => {
    setWorkOutPlans([]);
  };
  return (
    <>
      <Head>
        <title>IntelliFit - Cerena</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="p-4">
          <div className="bg-white px-4 py-12 rounded shadow mx-auto max-w-xl relative">
            <h1 className="text-3xl font-semibold text-center">IntelliFit</h1>
            <p className="text-lg text-center">
              AI powered workout planning system
            </p>
            {workoutPlans.length ? (
              <div className="py-12">
                <div className="text-end">
                  <button
                    className="hover:underline text-red-500"
                    onClick={clear}
                  >
                    {" "}
                    Clear{" "}
                  </button>
                </div>
                <p className="pb-2 font-semibold">
                  Here's a workout plan for you
                </p>
                <WorkOutTable workouts={workoutPlans} />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="py-8">
                  <p className="font-semibold text-lg">
                    Tell us about yourself
                  </p>
                  <p className="pt-4 text-sm">Your Age:</p>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min={12}
                    className="bg-primary bg-opacity-15 px-4 py-2 rounded-md shadow outline-none"
                  />
                  <p className="pt-4 text-sm">Gender:</p>
                  <div className="flex gap-8 items-center">
                    {["Male", "Female"].map((g) => (
                      <label
                        key={g}
                        className="flex gap-2 justify-center items-center"
                      >
                        <input
                          type="radio"
                          name="gender"
                          id="gender"
                          value={g}
                          className="accent-primary h-4 w-4"
                          defaultChecked={g == "Male"}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="py-4">
                  <p className="font-semibold text-lg">
                    Tell us about your fitness goal
                  </p>
                  {fitnessGoals.map((goal) => (
                    <label key={goal} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="goal"
                        id="goal"
                        defaultValue={goal}
                        className="accent-primary h-4 w-4"
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>

                <div className="py-4">
                  <p className="font-semibold text-lg">
                    What is your preferred workout type
                  </p>
                  {workoutTypes.map((workout) => (
                    <label key={workout} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        name="workout"
                        id="workout"
                        defaultValue={workout}
                        className="accent-primary h-4 w-4"
                      />
                      <span>{workout}</span>
                    </label>
                  ))}
                </div>
                <button
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-primary shadow text-lg mt-4"
                >
                  {loading ? "Generating Workout Plans..." : "Get Workout Plan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

function WorkOutTable({ workouts }: { workouts: WorkoutPlan[] }) {
  const divRef = useRef({} as HTMLDivElement);
  const [user, _] = useUser();

  return (
    <>
      <div ref={divRef}>
        {workouts.map((w) => (
          <div className="rounded shadow p-2 my-4 bg-[#fffff0]">
            <p className="text-lg font-semibold pb-2">{w.day}</p>
            {w.workouts.map((workout) => (
              <div className="pl-4 pb-4" key={workout.name}>
                <p className="font-semibold text-sm">{workout.name}</p>
                <p className="text-xs text-gray-700">{workout.summery}</p>
                {
                  <p className="text-xs text-gray-500">
                    {workout.sets && workout.sets != "null"
                      ? `${workout.sets} sets of `
                      : ""}
                    {workout.reps && workout.reps != "null"
                      ? `${workout.reps} reps`
                      : ""}
                  </p>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 items-center">
        {user && (
          <button className="bg-primary px-4 py-2 rounded-md">Save</button>
        )}
        <PDFDownloadLink
          document={<WorkoutPlanPDF workouts={workouts} />}
          fileName="cerena-workout-plans.pdf"
        >
          <button className="px-4 py-2 flex justify-center items-center gap-2 bg-red-500 text-white rounded-md">
            <span>Download as PDF</span>
            <FaDownload />
          </button>
        </PDFDownloadLink>
      </div>
    </>
  );
}
