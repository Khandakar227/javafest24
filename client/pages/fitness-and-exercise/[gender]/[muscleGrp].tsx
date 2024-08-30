import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner";
import Head from "next/head"
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { muscleData } from "@/lib/muscle-data";
import { deleteExercise, getExercises } from "@/lib/api-client";
import MaleMuscleFront from "@/components/Exercise/MaleMuscleFront";
import MaleMuscleBack from "@/components/Exercise/MaleMuscleBack";
import FemaleMuscleFront from "@/components/Exercise/FemaleMuscleFront";
import FemaleMuscleBack from "@/components/Exercise/FemaleMuscleBack";
import { Exercise } from "@/types";
import ReactPaginate from "react-paginate";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUser } from "@/hooks/user";

interface ExerciseWIthId extends Exercise {
    id: string;
}
function MuscleGroup() {
    const router = useRouter();
    const [muscle, setMuscle] = useState('');
    const [gender, setGender] = useState('male');
    const [exercises, setExercises] = useState([] as ExerciseWIthId[]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, _] = useUser();


    useEffect(() => {
        const muscleLabel = muscleData[router.query.muscleGrp as keyof typeof muscleData];
        setGender(router.query.gender as string);
        setMuscle(muscleLabel);
        setLoading(false);
    }, [router.query.muscleGrp, router.query.geder])

    useEffect(() => {
        if (!muscle) return;
        console.log(muscle)
        getExercises(muscle, gender, page)
            .then(res => {
                setExercises(res.content);
                console.log(res);
                setTotalPages(res.totalPages);
            })
            .catch(err => {
                console.log(err);
            });
    }, [gender, muscle, page])

    function onGenderSelect(e:ChangeEvent) {
        const selected = (e.target as HTMLSelectElement).value;
        localStorage.setItem("exercise-gender", selected);
        setGender(selected);
       router.push(`/fitness-and-exercise/${selected}/${router.query.muscleGrp}`);
      }


    function onPageChange(selectedItem: { selected: number; }) {
        setPage(selectedItem.selected);
    }


    const deleteData = (e:MouseEvent, id:string) => {
        const confirmDelete = confirm("Are you sure you want to delete this exercise?");
        if (!confirmDelete) return;
        
        (e.target as HTMLButtonElement).disabled = true;
        const originalText = (e.target as HTMLButtonElement).innerHTML;
        (e.target as HTMLButtonElement).innerHTML = "Deleting...";

        deleteExercise(id)
        .then(res => {
            if (res.error) return console.log(res.error);
            setExercises(exercises.filter(e => e.id !== id));
        })
        .catch(err => console.log(err))
        .finally(() => {
            (e.target as HTMLButtonElement).innerHTML = originalText;
            (e.target as HTMLButtonElement).disabled = false
        })
    }

    if (loading) return <Spinner />;
    if (!loading && (!muscle || !['male', 'female'].includes(gender))) return (
        <Layout>
            <div className="text-center text-2xl">Muscle Group Not Found</div>
        </Layout>
    )

    return (
        <>
            <Head>
                <title>{muscle} / Exercise - Cerena</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="flex justify-between gap-4 items-start p-4 w-full">
                    <div className="flex-1">
                        <div className="text-2xl font-semibold">{muscle}</div>
                        <div className="text-sm text-gray-500">Exercises for {muscle}</div>

                        <div className="py-8">
                            {
                                exercises.map((e, index) => (
                                    <div key={index + e.excerciseName} className="bg-white p-4 my-4 rounded shadow">
                                        <div className="text-xl">{e.excerciseName}</div>
                                        <div className="text-xs text-gray-900">Rating: {e.rating}</div>
                                        {
                                            e.description &&
                                            (<div className="py-4">
                                                <h3>Description</h3>
                                                <div className="text-sm text-gray-500">{e.description}</div>
                                            </div>)
                                        }
                                        {
                                            e.benefits &&
                                            (<div className="py-4">
                                                <h3>Benefits</h3>
                                                <div className="text-sm text-gray-500">{e.benefits}</div>
                                            </div>)
                                        }
                                        {
                                            e.equipment &&
                                            (<div className="py-4">
                                                <h3>Equipment</h3>
                                                <div className="text-sm text-gray-500">{e.equipment}</div>
                                            </div>)
                                        }
                                        {
                                        e.img &&
                                        (
                                        <div className="grid lg:grid-cols-2 gap-4 justify-center items-center">
                                        {
                                            e.img.map((img, index) => (
                                                <img key={index + img} src={img} alt={e.excerciseName} className="mx-auto rounded-md w-full max-w-md my-4" />
                                            ))
                                        }
                                        </div>
                                        )
                                        }
                                        {
                                            user?.role == "ADMIN" && (
                                            <div className="flex justify-end items-center gap-4 pt-4">
                                                <button className="text-red-600" onClick={(_e) => deleteData(_e, e.id)}><FaTrash/></button>
                                                <button className="text-orange-400"><FaPen /></button>
                                            </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="max-w-52 lg:max-w-96 sticky top-0">
                    <div className="flex items-center text-sm gap-4 justify-center">
                        <label htmlFor="gender" className="mr-2">Gender</label>
                        <select name="gender" id="gender" className="px-4 py-2 rounded-md shadow outline-none" value={gender} onChange={onGenderSelect}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                        {
                            gender == 'male' ?
                                <div className="hidden md:grid lg:grid-cols-2 justify-center items-center gap-4">
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <MaleMuscleFront />
                                    </div>
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <MaleMuscleBack />
                                    </div>
                                </div>
                                :
                                <div className="hidden md:grid lg:grid-cols-2 justify-center items-center gap-4">
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <FemaleMuscleFront />
                                    </div>
                                    <div className="bg-white p-4 m-4 rounded shadow">
                                        <FemaleMuscleBack />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className="py-8">
                    <ReactPaginate
                        className="flex justify-center items-center gap-4 flex-wrap"
                        pageLinkClassName={'px-4 py-2 rounded-md shadow outline-none bg-primary text-white text-sm hover:bg-green-700 hover:text-white'}
                        pageCount={totalPages}
                        breakLabel="..."
                        nextLabel=">"
                        previousLinkClassName="px-4 py-2 rounded-md outline-none hover:bg-green-700 hover:text-white"
                        nextLinkClassName="px-4 py-2 rounded-md outline-none hover:bg-green-700 hover:text-white"
                        pageRangeDisplayed={5}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        activeLinkClassName="!bg-green-700 !text-white"
                        initialPage={page}
                        onPageChange={onPageChange}
                    />
                </div>
            </Layout>
        </>
    )
}

export default MuscleGroup