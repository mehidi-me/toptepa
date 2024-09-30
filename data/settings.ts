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
    countDownDuration: 3000,
    clientProperties,
    levels: {
        level1: {
            label: "Newby" as Level,
            icon: Level1,
            totalClient: 25,
            clientDuration: 1500,
            nextLevelScore: 40,
            nextLevelTap: 70,
            nextLevel: "level2" as Level,
        },
        level2: {
            label: "Tepa",
            icon: Level2,
            totalClient: 35,
            clientDuration: 1300,
            nextLevelScore: 20000,
            nextLevelTap: 80,
            nextLevel: "level3" as Level,
        },
        level3: {
            label: "Tepa King",
            icon: Level3,
            totalClient: 45,
            clientDuration: 1200,
            nextLevelScore: 1000000,
            nextLevelTap: 90,
            nextLevel: "level4" as Level,
        },
        level4: {
            label: "Top Tepa",
            icon: Level4,
            totalClient: 55,
            clientDuration: 1000,
            nextLevelScore: 300,
            nextLevelTap: 100,
            nextLevel: "level4" as Level,
        }

    }
}

export default settings