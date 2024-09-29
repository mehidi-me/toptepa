"use client";

import GameReport from "@/components/gamePlay/GameReport";
import GameStart from "@/components/gamePlay/GameStart";
import SingleWhole from "@/components/gamePlay/SingleWhole";
import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import settings from "@/data/settings";
import { generateRandom } from "@/lib/utils";
import useTapStore from "@/store";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export type PositionType = {
  id: string;
  client: {
    image: StaticImageData;
    score: number;
  };
};

export default function Home() {
  const { gameStarted, setTapCount, tapCount, currentLevel } = useTapStore(
    (state) => state
  );
  const initialTarget = generateRandom(1, 9);
  const [targetWhole, setTargetWhole] = useState(initialTarget);
  const [clientPositions, setClientPositions] = useState<PositionType[]>([]);

  const generateGame = () => {
    let temp = [];
    for (let i = 0; i < settings?.levels[currentLevel]?.totalClient; i++) {
      temp.push({
        id: `whole${generateRandom(1, 9)}`,
        client: settings?.clientProperties[generateRandom(0, 3)],
      });
    }
    setClientPositions(temp);
    console.log(temp);
  };

  useEffect(() => {
    generateGame();
  }, [currentLevel, gameStarted]);

  return (
    <>
      <Header />
      <main className="mt-2">
        <div className="container">
          <GameReport />
          {/* <p>Position: {targetWhole}</p> */}
          <div className="block game-board">
            <GameStart setTargetWhole={setTargetWhole} />
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="whole"
                id={"whole" + (index + 1)}
                onClick={() => {
                  setTapCount(1, targetWhole === index + 1 ? 1 : 0);
                }}
              >
                {gameStarted && (
                  <SingleWhole
                    wholeID={"whole" + (index + 1)}
                    clientWhole={clientPositions[index]}
                    targetWhole={"whole" + targetWhole}
                    clientPositions={clientPositions}
                    index={index}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
