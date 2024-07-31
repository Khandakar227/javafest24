import { WorkoutPlan } from "@/types";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

function WorkoutPlanPDF({workouts}:{workouts:WorkoutPlan[]}) {
  return (
    <Document>
        <Page wrap={false} size="A4" style={{ flexDirection: 'column', backgroundColor: 'white', fontSize: 10 }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingVertical: 16}}>Workout Plans</Text>
        {
            workouts.map(w => (
                <View style={{flexDirection: 'column', padding: 10, margin: 10, borderRadius: 16, backgroundColor: '#fffff0', border: '1px solid #ececec'}} key={w.day}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, paddingBottom: 8}}>{w.day}</Text>
                    {
                        w.workouts.map(workout => (
                            <View style={{paddingLeft: 10, paddingVertical: 8, borderBottom: '1px solid #ececec'}} key={workout.name}>
                                <Text style={{fontWeight: 'semibold', fontSize: 10}}>{workout.name}</Text>
                                <Text style={{ fontSize: 10, color: '#7f7f7f' }}>{workout.summery}</Text>
                                {
                                    <Text style={{ fontSize: 10, color: '#374151' }}>
                                        {workout.sets && workout.sets != 'null' ? `${workout.sets} x ` : ""}{workout.reps && workout.reps != 'null' ? `${workout.reps}` : ""}
                                    </Text>    
                                }
                            </View>
                        ))
                    }

                </View>
            ))
        }
        <Image src={"/cerena-logo.png"} style={{ width: 30, height: 30, margin: 10 }}/>
        </Page>
    </Document>
  )
}

export default WorkoutPlanPDF

{/* <View style={{ flexDirection: 'column', alignItems: 'center' }}> */}