import { useState } from "react";
import UploadPhoto from "../UploadPhoto";
import { muscleData } from "@/lib/muscle-data";

export default function AddExerciseForm() {
    const [image, setImage] = useState<File| null>(null);
    return (
    <div>
        <h2 className="text-xl pb-4 font-semibold"> Add an Exercise Information </h2>
        <form>
            <UploadPhoto image={image} setImage={setImage} />
            equipment
            <input type="text" name="excerciseName" id="excerciseName" placeholder="Exercise Name" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <select name="specialty" id="specialty" className="w-full mt-2 border px-4 py-2 rounded-md shadow outline-none">
                <option value="">Select Muscle Group</option>
                {
                    Object.values(muscleData).map(mg => <option value={mg} key={mg}>{mg}</option>)
                }
            </select>
            <input type="number" name="rating" id="rating" min={0} max={10} placeholder="Rating (0 - 10)" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <textarea name="description" id="description" placeholder="Description" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <textarea name="benefits" id="benefits" placeholder="Benefits" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            <div className="flex gap-8 py-2 items-center">
                <span>Suitable For: </span>
            {
                ["Male", "Female"].map((g) => (
                    <label key={g} className="flex gap-2 justify-center items-center">
                        <input type="checkbox" name="gender" id="gender" value={g} className="accent-primary h-4 w-4" defaultChecked={g == "Male"} />
                        <span>{g}</span>
                    </label>
                ))
            }
            </div>
            <button type="submit" className="bg-primary px-4 py-2 rounded mt-4">Add</button>
        </form>
    </div>
  )
}
