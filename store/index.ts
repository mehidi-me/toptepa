import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import type { } from '@redux-devtools/extension'


interface TapState {
    gameStarted: boolean
    setGameStarted: (to: boolean) => void

    totalScore: number
    setTotalScore: (by: number) => void

    tapCount: {
        totalTap: number,
        correctTap: number,
    }
    setTapCount: (byTotal: number, byCorrect: number) => void

    currentLevel: "level1" | "level2" | "level3" | "level4";
    setCurrentLevel: (to: "level1" | "level2" | "level3" | "level4") => void
}

const useTapStore = create<TapState>()(
    devtools(
        (set) => ({
            gameStarted: false,
            setGameStarted: (to) => set((state) => ({ gameStarted: to })),

            totalScore: 0,
            setTotalScore: (by) => set((state) => ({ totalScore: state.totalScore + by })),

            tapCount: {
                totalTap: 0,
                correctTap: 0
            },
            setTapCount: (byTotal, byCorrect) => set((state) => ({
                tapCount: {
                    totalTap: state.tapCount.totalTap + byTotal,
                    correctTap: state.tapCount.correctTap + byCorrect
                }
            })),

            currentLevel: "level1",
            setCurrentLevel: (to) => set((state) => ({ currentLevel: to })),
        })
    ),
)

export default useTapStore