import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import type { } from '@redux-devtools/extension'


interface TapState {
    user: {
        email: string
        name: string
    }

    setData: (to: {
        user?: {
            email: string
            name: string
        }
        currentLevel?: "level1" | "level2" | "level3" | "level4"
        totalScore?: number
        tapCount?: {
            totalTap: number,
            correctTap: number
        }
        themeColor?: string
    }) => void

    gameStarted: boolean
    setGameStarted: (to: boolean) => void

    countStarted: boolean
    setCountStarted: (to: boolean) => void

    totalScore: number
    setTotalScore: (by: number) => void

    tapCount: {
        totalTap: number,
        correctTap: number,
    }
    setTapCount: (byTotal: number, byCorrect: number) => void

    currentLevel: "level1" | "level2" | "level3" | "level4";
    setCurrentLevel: (to: "level1" | "level2" | "level3" | "level4") => void

    themeColor: string;
    setThemeColor: (to: string) => void
}

const useTapStore = create<TapState>()(
    devtools(
        (set) => ({
            setData: (to) => set((state) => ({ ...to })),

            user: {
                email: "",
                name: ""
            },

            gameStarted: false,
            setGameStarted: (to) => set((state) => ({ gameStarted: to })),

            countStarted: false,
            setCountStarted: (to) => set((state) => ({ countStarted: to })),

            totalScore: 0,
            setTotalScore: (by) => set((state) => {
                saveToDB(state.totalScore + by, state.currentLevel, state.tapCount)
                return ({ totalScore: state.totalScore + by })
            }),

            tapCount: {
                totalTap: 0,
                correctTap: 0
            },
            setTapCount: (byTotal, byCorrect) => set((state) => {
                const updatedTapCount = {
                    totalTap: state.tapCount.totalTap + byTotal,
                    correctTap: state.tapCount.correctTap + byCorrect
                }
                saveToDB(state.totalScore, state.currentLevel, updatedTapCount)
                return ({
                    tapCount: updatedTapCount
                })
            }),

            currentLevel: "level1",
            setCurrentLevel: (to) => set((state) => {
                saveToDB(state.totalScore, to, state.tapCount)
                return ({ currentLevel: to })
            }),

            themeColor: "#1dbf73",
            setThemeColor: (to) => set((state) => ({ themeColor: to })),
        })
    ),
)

const saveToDB = async (totalScore: number, currentLevel: "level1" | "level2" | "level3" | "level4", tapCount: { totalTap: number, correctTap: number }) => {
    const res = await fetch("/auth/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalScore, currentLevel, tapCount }),
    });

    const data = await res.json();
    if (data.success) {
        console.log("Saved to DB");
    } else {
        console.log("Failed to save to DB");
    }
}

export default useTapStore