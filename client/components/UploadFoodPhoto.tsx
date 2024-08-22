import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";
import { estimateFoodCalorie } from "@/lib/api-client";
import Spinner from "./Spinner";

type FoodData = { foodName: string, width: number, height: number }
type Ingredients = { name: string, calorie: number }

function UploadPhoto() {
    const [previewImage, setPreviewImage] = useState("");
    const [ingredients, setIngrediants] = useState([] as Ingredients[]);
    const [totalCalorie, setTotalCalorie] = useState(0);
    const [error, setError] = useState("");
    const [foodData, setFoodData] = useState({ foodName: "", width: 0, height: 0 } as FoodData);
    const [loading, setLoading] = useState(false);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            if(!acceptedFiles.length) return;
            setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
        },
        accept: {
            "image/*": [],
        },
        maxFiles: 1,
        maxSize: 8192002,
    });

    function clearImage() {
        setPreviewImage("");
    }

    function handleChange(e:ChangeEvent) {
        const key = (e.target as HTMLInputElement).name as keyof FoodData;
        const value = (e.target as HTMLInputElement).value;
        setFoodData(v => ({...v, [key]: value }));
    }

    async function calculateCalorie() {
        setError("");
        setLoading(true);
        if(!previewImage) return toast.error("Please upload an image of the food");
        estimateFoodCalorie(acceptedFiles[0], foodData.foodName, foodData.width, foodData.height)
        .then(res => {
            console.log(res);
            if(res.error) {setError(res.error); return;}
            setIngrediants(res.ingredients);
            setFoodData(v => ({...v, foodName: res.food}));
            setTotalCalorie(res.total_calorie);
        }).catch(err=> console.log(err))
        .finally(() => setLoading(false));
    }
    return (
        <div className="max-w-2xl mx-auto ">
        {
            previewImage ? (
                <div className="w-full mx-auto">
                    <div className="text-end py-2">
                        <button onClick={clearImage} className="p-1 rounded bg-primary hover:bg-green-500"><IoClose size={32}/></button>
                    </div>
                    <Image src={previewImage} alt={acceptedFiles[0].name} className="w-full mx-auto rounded shadow" width={400} height={400} />
                </div>
            )
            :
            <>
            <p>Upload photo of your food</p>
            <div {...getRootProps({ className: "dropzone" })} >
                <div className="flex justify-center items-center pb-4">
                    <FaCloudUploadAlt size={48} />
                </div>
                <input {...getInputProps()} name="file" />
                <p>Choose an image or Drag and Drop</p>
                <small>Image size 8MB (max)</small>
            </div>
            </>
        }
        <p className="pt-6 text-xs">For beeter accuracy add additional information (Optional)</p>
        <input onChange={handleChange} type="text" name="foodName" id="foodName" placeholder="Name of the Food" className="shadow border w-full rounded-md outline-none px-4 py-2 my-3 border border-green-500" />
        <p className="text-xs">Approximate Dimension (in cm.)(Optional)</p>
        <div className="flex items-center gap-1 flex-wrap">
            <input onChange={handleChange} type="number" name="width" id="width" placeholder="Width" className="w-full max-w-40 shadow border rounded-md outline-none px-4 py-2 my-3 border border-green-500"/>
            <span><IoClose/></span>
            <input onChange={handleChange} type="number" name="height" id="height" placeholder="Height" className="w-full max-w-40 shadow border rounded-md outline-none px-4 py-2 my-3  border border-green-500"/>
        </div>
        <button disabled={loading} onClick={calculateCalorie} className="my-4 bg-primary rounded px-4 py-1 hover:text-white">{loading ? 'Please wait...' : 'Calculate Calorie'}</button>
        {
            loading && (<div className="flex justify-center items-center mx-auto "><Spinner size={4}/></div>)
        }

        {
            error ? <p className="text-red-500 text-center ">{error}</p> : 
            ingredients.length > 0 && (
                <div className="bg-gray-100 p-4 rounded-md border border-green-500">
                    <h1 className="font-bold text-lg pb-4">Food: {foodData.foodName}</h1>
                    <h2 className="font-semibold">Ingredients</h2>
                    <ul>
                        {
                            ingredients.map((ing, i) => (
                                <li key={i} className="flex justify-between gap-2 border-green-500 border-b py-1">
                                    <span>{ing.name}</span>
                                    <span>{ing.calorie} kcal</span>
                                </li>
                            ))
                        }
                    </ul>
                    <p className="text-right font-bold">Total Calorie: {totalCalorie} kcal</p>
                </div>
            )
    }
    </div>
    )
}

export default UploadPhoto
