"use client";
import settings from "@/data/settings";
import useTapStore from "@/store";
import React, { useEffect, useState } from "react";
import LevelUpModal from "../LevelUpModal";

type Props = {};

export default function GameStart({}: Props) {
  const {
    gameStarted,
    gamePaused,
    countStarted,
    setCountStarted,
    setGameStarted,
    setGamePaused,
  } = useTapStore((state) => state);
  const [count, setCount] = useState<any>(-1);
  const [fade, setFade] = useState(true);
  const [ending, setEnding] = useState(false);

  const startGameHandler = () => {
    setCount(settings?.countDown);
    setCountStarted(true);
  };

  useEffect(() => {
    if (count >= -1) {
      const interval = setInterval(() => {
        setFade(false);

        setTimeout(() => {
          setFade(true);
          if (count > 1) {
            setCount((prevCount: number) => prevCount - 1);
          } else if (count === 1) {
            if (ending) {
              setCount("Game Over");
              setTimeout(() => {
                setGameStarted(false);
                setEnding(false);
                setCountStarted(false);
              }, 1000);
            } else {
              setCount("Top Tepa");
            }
          } else {
            setCount("");
            clearInterval(interval);
          }
        }, 400);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count]);

  useEffect(() => {
    if (count === "Top Tepa") {
      const timeout = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setCount(null);
          setGameStarted(true);
        }, 600);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [count]);

  // useEffect(() => {
  //   if (gameStarted) {
  //     setTimeout(() => {
  //       setEnding(true);
  //       setCount(3);
  //       setCountStarted(true);
  //     }, settings?.gameDuration - 3800);
  //   }
  // }, [gameStarted]);

  return (
    <React.Fragment>
      {countStarted && (
        <div className="countDown-main" style={{ pointerEvents: "none" }}>
          <span
            id="countDown"
            style={{
              opacity: fade ? 1 : 0,
              fontSize: fade ? "15vw" : "2vw",
            }}
          >
            {count}
          </span>
        </div>
      )}
      {!countStarted && (
        <div className="start">
          <button onClick={startGameHandler}>Start</button>
        </div>
      )}
      {gameStarted && gamePaused && (
        <div className="start">
          <button onClick={() => setGamePaused(false)}>Resume</button>
        </div>
      )}
    </React.Fragment>
  );
}
