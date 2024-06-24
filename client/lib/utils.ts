import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navsmenu = [
    { label: 'Doctors', href: 'doctors' },
    { label: 'Medicines', href: 'medicines' },
    { label: 'Fitness and Exercise', href: 'fitness-and-exercise' },
    { label: 'Disease Prediction', href: 'disease-prediction' },
    { label: 'Blood Bank', href: 'blood-bank' },
    { label: 'AI Assistant', href: 'ai-assistant' },
    { label: 'Calorie Tracking', href: 'calorie-tracking' },
]