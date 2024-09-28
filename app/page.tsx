"use client";

import GameReport from "@/components/gamePlay/GameReport";
import GameStart from "@/components/gamePlay/GameStart";
import SingleWhole from "@/components/gamePlay/SingleWhole";
import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import settings from "@/data/settings";
import { generateRandom } from "@/lib/utils";
import { StaticImageData } from "next/image";
import { useState } from "react";

export type PositionType = {
  id: string;
  client: {
    image: StaticImageData;
    score: number;
  };
};

const initialTarget = generateRandom(1, 9);

const clientPositions: PositionType[] = [];

const generateGame = () => {
  for (let i = 0; i < settings?.gameDuration / 1000; i++) {
    clientPositions.push({
      id: `whole${generateRandom(1, 9)}`,
      client: settings?.clientProperties[generateRandom(0, 3)],
    });
  }

  console.log(clientPositions);
};

generateGame();

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [targetWhole, setTargetWhole] = useState(initialTarget);
  const [totalScore, setTotalScore] = useState(0);

  return (
    <>
      <Header />
      <main className="mt-2">
        <div className="container">
          <GameReport totalScore={totalScore} />
          <p>Position: {targetWhole}</p>
          <div className="block game-board">
            <GameStart
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              setTargetWhole={setTargetWhole}
            />
            {[...Array(9)].map((_, index) => (
              <div key={index} className="whole" id={"whole" + (index + 1)}>
                {gameStarted && (
                  <SingleWhole
                    wholeID={"whole" + (index + 1)}
                    clientWhole={clientPositions[index]}
                    targetWhole={"whole" + targetWhole}
                    setTotalScore={setTotalScore}
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
