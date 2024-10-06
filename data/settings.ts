

import Client1 from "@/public/images/client.png";
import Client2 from "@/public/images/client2.gif";
import Client3 from "@/public/images/client3.png";
import Level1 from "@/public/images/new.svg";
import Level2 from "@/public/images/tepa.svg";
import Level3 from "@/public/images/tepaking.svg";
import Level4 from "@/public/images/top.svg";


export type Level = "level1" | "level2" | "level3" | "level4";

const clientProperties = {
    client1: {
        clientType: "good",
        orders: 2,
        imageSrc: Client1,
        audio_type: typeof window !== "undefined" ? new Audio("/music/normal-order.MP3") : null
    },
    client2: {
        clientType: "bad",
        orders: -20,
        imageSrc: Client2,
        audio_type: typeof window !== "undefined" ? new Audio("/music/boom.MP3") : null
    },
    client3: {
        clientType: "good",
        orders: 10,
        imageSrc: Client3,
        audio_type: typeof window !== "undefined" ? new Audio("/music/bonus-order.MP3") : null
    }
}

const settings = {
    gameDuration: 60000,
    countDown: 3,
    clientProperties,
    levels: {
        level1: {
            label: "Newby" as Level,
            icon: Level1,
            totalClient: 25,
            client2Count: 4,
            client3Count: 2,
            clientDuration: 1500,
            nextLevelScore: 400,
            nextLevelTap: 60,
            nextLevel: "level2" as Level,
        },
        level2: {
            label: "Tepa",
            icon: Level2,
            totalClient: 35,
            client2Count: 6,
            client3Count: 4,
            clientDuration: 1400,
            nextLevelScore: 2000,
            nextLevelTap: 70,
            nextLevel: "level3" as Level,
        },
        level3: {
            label: "Tepa King",
            icon: Level3,
            totalClient: 45,
            client2Count: 9,
            client3Count: 7,
            clientDuration: 1300,
            nextLevelScore: 50000,
            nextLevelTap: 85,
            nextLevel: "level4" as Level,
        },
        level4: {
            label: "Top Tepa",
            icon: Level4,
            totalClient: 55,
            client2Count: 10,
            client3Count: 27,
            clientDuration: 1300,
            nextLevelScore: 10000000000,
            nextLevelTap: 110,
            nextLevel: "level4" as Level,
        },
        // level5: {
        //     label: "Top Tepa",
        //     icon: Level4,
        //     totalClient: 55,
        //     client2Count: 0,
        //     client3Count: 27,
        //     clientDuration: 1300,
        //     nextLevelScore: 10000000000,
        //     nextLevelTap: 110,
        //     nextLevel: "level5" as Level,
        // }
    }
}

export default settings