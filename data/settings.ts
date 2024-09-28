import Client1 from "@/public/images/client.png";
import Client2 from "@/public/images/client2.png";
import Client3 from "@/public/images/client3.png";
import Level1 from "@/public/images/new.svg";
import Level2 from "@/public/images/tepa.svg";
import Level3 from "@/public/images/tepaking.svg";
import Level4 from "@/public/images/top.svg";

export type Level = "level1" | "level2" | "level3" | "level4";

const clientProperties = [
    {
        image: Client1,
        score: 20,
    },
    {
        image: Client2,
        score: -20,
    },
    {
        image: Client3,
        score: 30,
    },
]

const settings = {
    gameDuration: 60000,
    countDownDuration: 500,
    clientProperties,
    levels: {
        level1: {
            label: "Level 1" as Level,
            icon: Level1,
            clientDuration: 1000,
            nextLevelScore: 50,
            nextLevel: "level2" as Level,
        },
        level2: {
            label: "Level 2",
            icon: Level2,
            clientDuration: 1000,
            nextLevelScore: 300,
            nextLevel: "level3" as Level,
        },
        level3: {
            label: "Level 3",
            icon: Level3,
            clientDuration: 1000,
            nextLevelScore: 300,
            nextLevel: "level4" as Level,
        },
        level4: {
            label: "Level 4",
            icon: Level4,
            clientDuration: 1000,
            nextLevelScore: 300,
            nextLevel: "level4" as Level,
        }

    }
}

export default settings