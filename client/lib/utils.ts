import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navsmenu = [
    { label: 'Doctors', href: '/doctors' },
    { label: 'Medicines', href: '/medicines' },
    { label: 'Fitness and Exercise', href: '/fitness-and-exercise' },
    { label: 'BMI Calculator', href: '/bmi-calculator' },
    { label: 'Disease Prediction', href: '/disease-prediction' },
    { label: 'Blood Bank', href: '/blood-bank' },
    { label: 'Sign Speak', href: '/signspeak' },
    { label: 'Food Calorie', href: '/food-calorie' },
    { label: 'Doc Scanner', href: '/scanner' },
]

export const getBasePath = (pathname:string) => {
  return '/' + pathname.split('/')[1]
}