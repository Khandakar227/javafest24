import WorkoutPlanPDF from "@/components/WorkoutPlanPDF"
import { PDFViewer } from "@react-pdf/renderer"
import { useEffect, useState } from "react"

function Pdf() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  return (
    <>
    {
        isClient && (
            
            <PDFViewer style={{minHeight: '100vh', width: '100%'}}>
                <WorkoutPlanPDF workouts={[
                    {
                        "day": "Monday",
                        "workouts": [
                    {
                        "name": "Squats",
                        "reps": 12,
                        "sets": 3,
                        "summery": "Focus on proper form and control during the downward and upward movement."
                    },
                    {
                        "name": "Push-ups",
                        "reps": 10,
                        "sets": 3,
                        "summery": "Maintain a straight line from head to toe, engaging core muscles."
                    },
                    {
                        "name": "Pull-ups (or assisted)",
                        "reps": 8,
                        "sets": 3,
                        "summery": "Use a spotter or resistance band if needed, focus on a controlled pull."
                    },
                    {
                        "name": "Walking Lunges",
                        "reps": 12,
                        "sets": 3,
                        "summery": "Engage core, step forward with one leg and lower your hips towards the ground."
                    },
                    {
                        "name": "Plank",
                        "reps": 30,
                        "sets": 3,
                        "summery": "Hold a straight line from head to heels, engaging core and glutes."
                    }
                ]
            },
            {
                "day": "Tuesday",
                "workouts": [
                    {
                        "name": "Burpees",
                        "reps": 10,
                        "sets": 3,
                        "summery": "Perform each movement with explosiveness and maintain good form."
                    },
                    {
                        "name": "Jumping Jacks",
                        "reps": 20,
                        "sets": 3,
                        "summery": "Simple cardio exercise, can be modified with high knees or side steps."
                    },
                    {
                        "name": "Mountain Climbers",
                        "reps": 15,
                        "sets": 3,
                        "summery": "Maintain a plank position and alternate bringing one knee towards the chest."
                    },
                    {
                        "name": "Sprint Intervals",
                        "reps": 6,
                        "sets": 3,
                        "summery": "Find a safe space and sprint for short bursts, rest and repeat."
                    },
                    {
                        "name": "High Knees",
                        "reps": 20,
                        "sets": 3,
                        "summery": "Bring your knees as high as possible while maintaining an upright posture."
                    }
                ]
            },
            {
                "day": "Wednesday",
                "workouts": [
                    {
                        "name": "Rest",
                        "reps": 0,
                        "sets": 0,
                        "summery": "Allow your body to recover, engage in light activities like stretching or walking."
                    }
                ]
            },
            {
                "day": "Thursday",
                "workouts": [
                    {
                        "name": "Deadlifts",
                        "reps": 8,
                        "sets": 3,
                        "summery": "Focus on proper form to avoid injuries, lift with your legs, not your back."
                    },
                    {
                        "name": "Overhead Press",
                        "reps": 10,
                        "sets": 3,
                        "summery": "Stand with feet shoulder-width apart, press weight upwards, and lower it slowly."
                    },
                    {
                        "name": "Bent-over Rows",
                        "reps": 12,
                        "sets": 3,
                        "summery": "Keep back straight, pull weight towards your chest, and lower it slowly."
                    },
                    {
                        "name": "Dumbbell Bench Press",
                        "reps": 10,
                        "sets": 3,
                        "summery": "Lie on a bench, lower dumbbells to chest level, and push them back up."
                    },
                    {
                        "name": "Bicep Curls",
                        "reps": 12,
                        "sets": 3,
                        "summery": "Stand with dumbbells in each hand, curl the weights upwards, and lower slowly."
                    }
                ]
            },
            {
                "day": "Friday",
                "workouts": [
                    {
                        "name": "Jump Squats",
                        "reps": 10,
                        "sets": 3,
                        "summery": "Add an explosive jump to your regular squats, land softly."
                    },
                    {
                        "name": "Push-ups (with clap)",
                        "reps": 8,
                        "sets": 3,
                        "summery": "Push yourself explosively and clap your hands before landing."
                    },
                    {
                        "name": "Box Jumps",
                        "reps": 10,
                        "sets": 3,
                        "summery": "Use a sturdy box and focus on landing softly to avoid injuries."
                    },
                    {
                        "name": "Russian Twists",
                        "reps": 15,
                        "sets": 3,
                        "summery": "Sit with knees bent, lean back slightly, and twist your torso side to side."
                    },
                    {
                        "name": "Bicycle Crunches",
                        "reps": 20,
                        "sets": 3,
                        "summery": "Lie on your back, bring your knees towards your chest, and alternate elbow to opposite knee."
                    }
                ]
            },
            {
                "day": "Saturday",
                "workouts": [
                    {
                        "name": "Long Run or Jogging",
                        "reps": 45,
                        "sets": 1,
                        "summery": "Go for a long run at a moderate pace, enjoy the outdoors and focus on endurance."
                    }
                ]
            },
            {
                "day": "Sunday",
                "workouts": [
                    {
                        "name": "Rest",
                        "reps": 0,
                        "sets": 0,
                        "summery": "Allow your body to recover and prepare for the next week's workouts."
                    }
                ]
            }
        ]}/>
            </PDFViewer>
        )
    }
    </>
  )
}

export default Pdf