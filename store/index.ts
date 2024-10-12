import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import type { } from '@redux-devtools/extension'
import settings from '@/data/settings';
import { calculateRating } from '@/lib/utils';


interface TapState {
    user: {
        phone: string
        name: string
        profilePicture: any
        fiverrName: string
        rank: number
    }

    setData: (to: {
        user?: {
            phone: string
            name: string
            fiverrName: string
            profilePicture: string
            rank: number
        }
        currentLevel?: "level1" | "level2" | "level3" | "level4"
        totalScore?: number
        tapCount?: {
            correctTap: number
            missedTap: number
            wrongTap: number
        }
        dailyCorrectTapCount?: number
        themeColor?: string
    }) => void

    gameStarted: boolean
    setGameStarted: (to: boolean) => void

    gamePaused: boolean
    setGamePaused: (to: boolean) => void

    showModal: boolean
    setShowModal: (to: boolean) => void

    countStarted: boolean
    setCountStarted: (to: boolean) => void

    totalScore: number
    setTotalScore: (by: number) => void

    dailyCorrectTapCount: number
    setDailyCorrectTapCount: (by: number) => void

    tapCount: {
        correctTap: number
        missedTap: number
        wrongTap: number
    }
    setTapCount: (by: { byCorrect: number, byWrong: number, byMissed: number }) => void

    currentLevel: "level1" | "level2" | "level3" | "level4";
    setCurrentLevel: (to: "level1" | "level2" | "level3" | "level4") => void

    activeDiv: number[],
    setActiveDiv: (to: any) => void,

    themeColor: string;
    setThemeColor: (to: string) => void
}

const useTapStore = create<TapState>()(
    devtools(
        (set) => ({
            setData: (to) => set((state) => ({ ...to })),

            user: {
                phone: "",
                name: "",
                fiverrName: "",
                profilePicture: "",
                rank: 0

            },

            gameStarted: false,
            setGameStarted: (to) => set((state) => ({ gameStarted: to })),

            gamePaused: false,
            setGamePaused: (to) => set((state) => {
                saveToDB(state.totalScore, state.currentLevel, state.tapCount, state.dailyCorrectTapCount);
                return ({ gamePaused: to, dailyCorrectTapCount:0 })
            }),

            showModal: false,
            setShowModal: (to) => set((state) => ({ showModal: to })),

            countStarted: false,
            setCountStarted: (to) => set((state) => ({ countStarted: to })),

            totalScore: 0,
            setTotalScore: (by) => set((state) => {
                // saveToDB(state.totalScore + by, state.currentLevel, state.tapCount)
                checkForLevelUp()
                return ({ totalScore: state.totalScore + by })
            }),

            dailyCorrectTapCount: 0,
            setDailyCorrectTapCount: (by) => set((state) => {
                // saveToDB(state.totalScore + by, state.currentLevel, state.tapCount)
                checkForLevelUp()
                return ({ dailyCorrectTapCount: state.dailyCorrectTapCount + by })
            }),

            tapCount: {
                correctTap: 0,
                missedTap: 0,
                wrongTap: 0,
            },
            setTapCount: (by) => set((state) => {
                const updatedTapCount = {
                    correctTap: state.tapCount.correctTap + Number(by.byCorrect),
                    wrongTap: state.tapCount.wrongTap + Number(by.byWrong),
                    missedTap: state.tapCount.missedTap + Number(by.byMissed)
                }

                // saveToDB(state.totalScore, state.currentLevel, updatedTapCount)

                checkForLevelUp()
                return ({
                    tapCount: updatedTapCount
                })
            }),

            currentLevel: "level1",
            setCurrentLevel: (to) => set((state) => {
                saveToDB(state.totalScore, to, state.tapCount,state.dailyCorrectTapCount)
                return ({ currentLevel: to, dailyCorrectTapCount: 0 })
            }),

            activeDiv: [],
            setActiveDiv: (to) => set((state) => ({ activeDiv: to })),

            themeColor: "#1dbf73",
            setThemeColor: (to) => set((state) => ({ themeColor: to })),
        })
    ),
)

const saveToDB = async (totalScore: number, currentLevel: "level1" | "level2" | "level3" | "level4", tapCount: { correctTap: number, missedTap: number, wrongTap: number }, dailyCorrectTapCount: number) => {
    await fetch("/auth/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalScore, currentLevel, tapCount, dailyCorrectTapCount}),
    });

}

const checkForLevelUp = () => {
    const { totalScore, tapCount, setCurrentLevel, currentLevel, setGamePaused, setShowModal } = useTapStore.getState();
    const currentTapRating = calculateRating(tapCount);
    const levels = Object.entries(settings?.levels)

    let maxLevel = "level1";
    for (const [key, level] of levels) {
        if (totalScore >= level?.nextLevelScore && currentTapRating >= level?.nextLevelTap) {
            maxLevel = level?.nextLevel as "level1" | "level2" | "level3" | "level4";
        }
    }

    if (maxLevel != currentLevel) {
        const tempLevel = currentLevel;
        setCurrentLevel(maxLevel as "level1" | "level2" | "level3" | "level4");

        if (Number(tempLevel.split("level")[1]) >= Number(tempLevel.split("level")[1])) {
            setGamePaused(true);
            setShowModal(true);
        }
    }
}

export default useTapStore;