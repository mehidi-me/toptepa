"use client";

import React from "react";
import settings from "@/data/settings";
import { generateRandom } from "@/lib/utils";
import useTapStore from "@/store";
import { useEffect, useState } from "react";

type Props = {
  setTargetWhole: React.Dispatch<React.SetStateAction<number>>;
};

export default function GameStart({ setTargetWhole }: Props) {
  const { gameStarted, setGameStarted, countStarted, setCountStarted } =
    useTapStore((state) => state);

  const [gameCountDown, setGameCountDown] = useState(
    settings.countDownDuration / 1000
  );

  const startGame = () => {
    setCountStarted(true);

    const gameCount = setInterval(() => {
      setGameCountDown((prev) => prev - 1);
    }, 1000);

    if (!gameStarted) {
      setTimeout(() => {
        setCountStarted(false);
        clearInterval(gameCount);
        setGameStarted(true);
      }, settings.countDownDuration);
    }
  };

  useEffect(() => {
    let gameOver: NodeJS.Timeout;
    if (gameStarted) {
      let lastTarget = 0;
      const gameCount = setInterval(() => {
        let target = generateRandom(1, 9);

        while (target == lastTarget) {
          target = generateRandom(1, 9);
        }

        lastTarget = target;
        setTargetWhole(target);
        console.log(target);
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
      {countStarted && (
        <div className="countDown-main">
          <p id="countDown">{gameCountDown}</p>
        </div>
      )}
      {!gameStarted && (
        <div className="start">
          {!countStarted && <button onClick={startGame}>Start</button>}
        </div>
      )}
    </>
  );
}
