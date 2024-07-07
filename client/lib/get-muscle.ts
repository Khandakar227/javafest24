import { MouseEvent } from "react"
import Router from 'next/router'

function getMuscle(e: MouseEvent, gender:string) {
    Router.push(`/fitness-and-exercise/${gender ? gender : 'male'}/${(e.target as SVGElement).parentElement?.id}`);
}

export { getMuscle }