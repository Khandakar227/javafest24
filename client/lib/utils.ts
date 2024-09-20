import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GiMedicines ,GiBackPain} from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { BsFillCalculatorFill } from "react-icons/bs";
import { BiDonateBlood } from "react-icons/bi";
import { FaUserDoctor,FaHandsAslInterpreting ,FaLungsVirus } from "react-icons/fa6";
import { LuGanttChartSquare } from "react-icons/lu";
import { MdOutlineFoodBank,MdOutlineDocumentScanner } from "react-icons/md";




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navsmenu = [
    { label: 'Doctors', href: '/doctors',icon:FaUserDoctor },
    { label: 'Medicines', href: '/medicines',icon:GiMedicines },
    { label: 'Fitness and Exercise', href: '/fitness-and-exercise',icon:IoIosFitness},
    { label: 'BMI Calculator', href: '/bmi-calculator',icon:BsFillCalculatorFill },
    { label: 'Disease Prediction', href: '/disease-prediction',icon:FaLungsVirus },
    { label: 'Blood Bank', href: '/blood-bank' ,icon:BiDonateBlood},
    { label: 'Sign Speak', href: '/signspeak',icon:FaHandsAslInterpreting },
    { label: 'Diet Planner', href: '/diet-plan',icon:LuGanttChartSquare },
    { label: 'Food Calorie', href: '/food-calorie' ,icon:MdOutlineFoodBank},
    { label: 'Doc Scanner', href: '/scanner',icon:MdOutlineDocumentScanner },
]

export const getBasePath = (pathname:string) => {
  return '/' + pathname.split('/')[1]
}