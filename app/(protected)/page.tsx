"use client";
import GameReport from "@/components/gamePlay/GameReport";
import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import settings from "@/data/settings";
import useTapStore from "@/store";
import React, { useEffect, useState } from "react";
import SingleWhole from "@/components/gamePlay/SingleWhole";
import GameStart from "@/components/gamePlay/GameStart";

export type PositionType = {
  clientType: string;
  orders: number;
  imageSrc: string;
};

const switchInterval = 1300;

export default function Home() {
  const {
    gameStarted,
    setTapCount,
    countStarted,
    setTotalScore,
    activeDiv,
    setActiveDiv,
  } = useTapStore((state) => state);

  const [clicked, setClicked] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>();

  const selectRandomClient = () => {
    const rand = Math.random();
    if (rand < 0.7) {
      return settings?.clientProperties?.client1;
    } else if (rand < 0.8) {
      return settings?.clientProperties?.client3;
    } else {
      return settings?.clientProperties?.client2;
    }
  };

  const handleTap = () => {
    if (selectedClient.clientType === "good") {
      setTotalScore(selectedClient.orders);

      setTapCount({ byCorrect: 1, byWrong: 0, byMissed: 0 });
    } else {
      setTotalScore(-20);
      setTapCount({ byCorrect: 0, byWrong: 1, byMissed: 0 });
    }
  };

  const handleMissedTap = (selectedClient: any) => {
    if (selectedClient.clientType === "good") {
      setTapCount({ byCorrect: 0, byWrong: 0, byMissed: 1 });
    }
  };

  const switchImage = () => {
    setClicked(false);
    if (activeDiv) {
    }

    const selectedDivIndex = Math.floor(Math.random() * 6);
    const selectedClient = selectRandomClient();

    setSelectedClient(selectedClient);

    setActiveDiv(selectedDivIndex);

    setTimeout(() => {
      handleMissedTap(selectedClient);
      setActiveDiv(null);
    }, switchInterval);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStarted) {
      interval = setInterval(switchImage, switchInterval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, activeDiv]);

  return (
    <React.Fragment>
      <Header />
      <main
        className="mt-2"
        style={{
          transition: "all 0.7s ease-in-out",
          paddingTop: countStarted || gameStarted ? "0" : "8rem",
        }}
      >
        <div className="container">
          <GameReport />
          <div className="block game-board">
            <GameStart />
            {Array.from({ length: 9 }, (_, i) => (
              <SingleWhole
                key={i}
                handleTap={handleTap}
                index={i}
                selectedClient={selectedClient}
                clicked={clicked}
                setClicked={setClicked}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
