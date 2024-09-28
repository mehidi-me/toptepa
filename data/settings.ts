import Client1 from "@/public/images/client.png";
import Client2 from "@/public/images/client2.png";
import Client3 from "@/public/images/client3.png";

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
    maxTaps: 5,
    clientProperties,
    levels: {
        level1: {
            clientDuration: 1000,
        }
    }
}

export default settings