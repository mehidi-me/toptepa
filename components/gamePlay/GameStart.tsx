"use client";
import useTapStore from "@/store";
import React, { useEffect, useState } from "react";

type Props = {};

export default function GameStart({}: Props) {
  const { gameStarted, countStarted, setCountStarted, setGameStarted } =
    useTapStore((state) => state);
  const [count, setCount] = useState<any>(-1);
  const [fade, setFade] = useState(true);
  const [animate, setAnimate] = useState(false);

  const startGameHandler = () => {
    setCount(3);
    setCountStarted(true);
  };

  useEffect(() => {
    if (count >= -1) {
      const interval = setInterval(() => {
        setFade(false);
        setAnimate(true);

        setTimeout(() => {
          setFade(true);
          if (count > 1) {
            setCount((prevCount: number) => prevCount - 1);
          } else if (count === 1) {
            if (gameStarted) {
              setCountStarted(false);
              setCount("");
              setGameStarted(false);
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

  useEffect(() => {
    if (gameStarted) {
      setTimeout(() => {
        setCount(3);
        setCountStarted(true);
      }, 4000);
    }
  }, [gameStarted]);

  return (
    <React.Fragment>
      {countStarted && (
        <div className="countDown-main">
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
    </React.Fragment>
  );
}
