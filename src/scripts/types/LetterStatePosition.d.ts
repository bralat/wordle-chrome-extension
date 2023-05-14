import { LetterState } from "./LetterState";

interface LetterInfo {
    state: LetterState,
    position: number|null
}

export interface LetterStatePosition {
    [x: string]: LetterInfo
}