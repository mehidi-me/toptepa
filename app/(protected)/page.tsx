"use client";

import React, { useEffect, useState } from "react";
import GameReport from "@/components/gamePlay/GameReport";
import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import settings from "@/data/settings";
import useTapStore from "@/store";
import SingleWhole from "@/components/gamePlay/SingleWhole";
import GameStart from "@/components/gamePlay/GameStart";
import { StaticImageData } from "next/image";
import CharValue from "@/components/CharValue";
import BeforeCloseSave from "@/components/BeforeCloseSave";
import LevelUpModal from "@/components/LevelUpModal";

export type PositionType = {
  clientType: string;
  orders: number;
  imageSrc: StaticImageData;
  audio_type: HTMLAudioElement;
};

let count = 0;

const Home = () => {
  const {
    gameStarted,
    gamePaused,
    setTapCount,
    countStarted,
    setTotalScore,
    activeDiv,
    setActiveDiv,
    currentLevel,
    showModal,
    setGamePaused,
    setGameStarted,
    setCountStarted,
  } = useTapStore((state) => state);

  const switchInterval =
    settings?.levels?.[currentLevel]?.clientDuration || 1300;

  const [missTimer, setMissTimer] = useState<NodeJS.Timeout>();
  const [clicked, setClicked] = useState(-2);
  const [allClients, setAllClients] = useState<PositionType[]>([]);
  const [selectedClients, setSelectedClients] = useState<PositionType[]>([]);

  const initializeClientCounts = () => {
    const totalClient = settings?.levels?.[currentLevel]?.totalClient;
    const totalClient2 = settings?.levels?.[currentLevel]?.client2Count || 0;
    const totalClient3 = settings?.levels?.[currentLevel]?.client3Count || 0;

    const clients: PositionType[] = [];

    clients.push(
      ...Array(totalClient - totalClient2 - totalClient3).fill(
        settings?.clientProperties?.client1
      )
    );
    clients.push(
      ...Array(totalClient2).fill(settings?.clientProperties?.client2)
    );
    clients.push(
      ...Array(totalClient3).fill(settings?.clientProperties?.client3)
    );

    setAllClients(clients);
  };

  const selectRandomClients = () => {
    const clients: PositionType[] = [];
    let clientsToShow = 1;
    if (Number(currentLevel.split("level")[1]) >= 3) {
      clientsToShow = 4;
    } else if (Number(currentLevel.split("level")[1]) >= 2) {
      clientsToShow = 2;
    }

    const indexToRemove: number[] = [];

    for (let i = 0; i < clientsToShow; i++) {
      const randomIndex = Math.floor(Math.random() * allClients.length);

      if (!indexToRemove.includes(randomIndex)) {
        indexToRemove.push(randomIndex);
      }

      const selectedClient = allClients[randomIndex];

      clients.push(selectedClient);
    }

    setAllClients((prevClients) =>
      prevClients.filter((_, index) => !indexToRemove.includes(index))
    );

    return clients;
  };

  const handleTap = (selectedClient: PositionType) => {
    const scoreAdjustment =
      selectedClient.clientType === "good" ? selectedClient.orders : -1;
    const tapAdjustments =
      selectedClient.clientType === "good"
        ? { byCorrect: 1, byWrong: 0, byMissed: 0 }
        : { byCorrect: 0, byWrong: 1, byMissed: 0 };

    setTotalScore(scoreAdjustment);
    setTapCount(tapAdjustments);
  };

  // const handleMissedTap = (toCheckClients: PositionType[]) => {
  //   toCheckClients.forEach((client) => {
  //     if (client.clientType === "good") {
  //       setTapCount({ byCorrect: 0, byWrong: 0, byMissed: 1 });
  //     }
  //   });
  // };

  const switchImage = () => {
    count++;
    setClicked(-1);
    const levelNum = Number(currentLevel.split("level")[1]);
    const clientsToShow = levelNum >= 3 ? 4 : 1;

    let selectedDivIndexes = Array.from({ length: clientsToShow }, () =>
      Math.floor(Math.random() * 9)
    );

    let retries = 0;
    while (
      JSON.stringify(activeDiv.sort()) ===
      JSON.stringify(selectedDivIndexes.sort())
    ) {
      selectedDivIndexes = Array.from({ length: clientsToShow }, () =>
        Math.floor(Math.random() * 9)
      );
      retries++;
      if (retries > 10) break;
    }

    if (allClients.length <= clientsToShow) {
      initializeClientCounts();
    }

    const tempClients = selectRandomClients();
    setSelectedClients(tempClients);

    // setMissTimer(
    //   setTimeout(() => {
    //     handleMissedTap(tempClients);
    //   }, switchInterval - 500)
    // );

    setActiveDiv(selectedDivIndexes);
  };

  useEffect(() => {
    if (gameStarted && !gamePaused) {
      const interval = setInterval(switchImage, switchInterval);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gamePaused, activeDiv, switchInterval]);

  useEffect(() => {
    initializeClientCounts();
  }, [gameStarted]);

  return (
    <React.Fragment>
      <Header />
      <main
        className="mt-2 home"
        style={{
          transition: "all 0.7s ease-in-out",
          paddingTop: countStarted || gameStarted ? "0" : "8rem",
        }}
      >
        <BeforeCloseSave />
        <div className="container">
          <GameReport />
          <CharValue />
          <div className="block game-board">
            <GameStart />
            {Array.from({ length: 9 }, (_, i) => (
              <SingleWhole
                key={i}
                handleTap={handleTap}
                selectedClient={selectedClients[activeDiv?.indexOf(i)]}
                clicked={clicked}
                setClicked={setClicked}
                toActive={activeDiv?.includes(i)}
                index={i}
                missTimer={missTimer}
              />
            ))}
          </div>

          {gameStarted && (
            <div className="action">
              <center>
                {" "}
                <button
                  className="alert"
                  onClick={() => {
                    setGamePaused(false);
                    setGameStarted(false);
                    setCountStarted(false);
                  }}
                >
                  Exit Game
                </button>
              </center>

              {!gamePaused && (
                <button onClick={() => setGamePaused(true)}>Pause</button>
              )}
            </div>
          )}

          {showModal && <LevelUpModal />}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
