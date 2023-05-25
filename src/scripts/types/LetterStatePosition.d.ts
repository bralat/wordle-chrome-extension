import { LetterState } from "./LetterState";

interface LetterInfo {
    state: LetterState,
    positions: number[]
}

export interface LetterStatePosition {
    [x: string]: LetterInfo
}