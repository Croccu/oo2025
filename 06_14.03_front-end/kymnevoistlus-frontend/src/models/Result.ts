import { Athlete } from "./Athlete"

export type Result = {
    id: number,
    event: string,
    score: number,
    points: number,
    athlete: Athlete
}
