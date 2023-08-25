import { LetterState } from "./LetterState";

export interface LetterInfo {
    state: LetterState,
    positions: number[]
}

export interface LetterStatePosition {
    [x: string]: LetterInfo
}