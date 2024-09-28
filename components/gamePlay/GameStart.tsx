"use client";
import settings from "@/data/settings";
import { generateRandom } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  gameStarted: boolean;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setTargetWhole: React.Dispatch<React.SetStateAction<number>>;
};

export default function GameStart({
  gameStarted,
  setGameStarted,
  setTargetWhole,
}: Props) {
  const [countDownStarted, setCountDownStarted] = useState(false);
  const [gameCountDown, setGameCountDown] = useState(
    settings.countDownDuration / 1000
  );

  const startGame = () => {
    setCountDownStarted(true);

    const gameCount = setInterval(() => {
      setGameCountDown((prev) => prev - 1);
    }, 1000);

    if (!gameStarted) {
      setTimeout(() => {
        setCountDownStarted(false);
        console.log("Game Started");
        clearInterval(gameCount);
        setGameStarted(true);
      }, settings.countDownDuration);
    }
  };

  useEffect(() => {
    let gameOver: NodeJS.Timeout;
    if (gameStarted) {
      const gameCount = setInterval(() => {
        setTargetWhole(generateRandom(1, 9));
      }, 2000);

      gameOver = setTimeout(() => {
        setGameStarted(false);
        clearInterval(gameCount);
      }, settings.gameDuration);
    }

    return () => {
      clearTimeout(gameOver);
    };
  }, [gameStarted]);

  return (
    <>
      {countDownStarted && (
        <div className="countDown-main">
          <p id="countDown">{gameCountDown}</p>
        </div>
      )}
      {!gameStarted && (
        <div className="start">
          {!countDownStarted && <button onClick={startGame}>Start</button>}
        </div>
      )}
    </>
  );
}
