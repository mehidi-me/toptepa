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

export type PositionType = {
  clientType: string;
  orders: number;
  imageSrc: StaticImageData;
};

const Home = () => {
  const {
    gameStarted,
    setTapCount,
    countStarted,
    setTotalScore,
    activeDiv,
    setActiveDiv,
    currentLevel,
  } = useTapStore((state) => state);

  const switchInterval =
    settings?.levels?.[currentLevel]?.clientDuration || 1300;

  const [clicked, setClicked] = useState(-1);
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
    // allClients = clients;
  };

  const selectRandomClients = () => {
    const clients: PositionType[] = [];
    const clientsToShow = Number(currentLevel.split("level")[1]) >= 3 ? 4 : 1;

    for (let i = 0; i < clientsToShow; i++) {
      const randomIndex = Math.floor(Math.random() * allClients.length);

      const selectedClient = allClients[randomIndex];

      setAllClients((prevClients) =>
        prevClients.filter((_, index) => index != randomIndex)
      );

      clients.push(selectedClient);
    }

    return clients;
  };

  const handleTap = (selectedClient: PositionType) => {
    const scoreAdjustment =
      selectedClient.clientType === "good" ? selectedClient.orders : -20;
    const tapAdjustments =
      selectedClient.clientType === "good"
        ? { byCorrect: 1, byWrong: 0, byMissed: 0 }
        : { byCorrect: 0, byWrong: 1, byMissed: 0 };

    setTotalScore(scoreAdjustment);
    setTapCount(tapAdjustments);
  };

  const handleMissedTap = () => {
    selectedClients.forEach((client) => {
      if (client.clientType === "good") {
        setTapCount({ byCorrect: 0, byWrong: 0, byMissed: 1 });
      }
    });
  };

  const switchImage = () => {
    setClicked(-1);

    const clientsToShow = Number(currentLevel.split("level")[1]) >= 3 ? 4 : 1;
    let selectedDivIndexes = Array.from({ length: clientsToShow }, () =>
      Math.floor(Math.random() * 9)
    );

    while (
      JSON.stringify(activeDiv.sort()) ===
      JSON.stringify(selectedDivIndexes.sort())
    ) {
      selectedDivIndexes = Array.from({ length: clientsToShow }, () =>
        Math.floor(Math.random() * 9)
      );
    }

    if (allClients.length === 3) {
      initializeClientCounts();
    }
    setSelectedClients(selectRandomClients());
    setActiveDiv(selectedDivIndexes);
  };

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(switchImage, switchInterval);
      return () => clearInterval(interval);
    }
  }, [gameStarted, activeDiv, switchInterval]);

  useEffect(() => {
    if (activeDiv.length > 0) {
      setTimeout(handleMissedTap, switchInterval - 500);
    }
  }, [activeDiv]);

  useEffect(() => {
    initializeClientCounts();
  }, [gameStarted]);

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
                selectedClient={selectedClients[activeDiv?.indexOf(i)]}
                clicked={clicked}
                setClicked={setClicked}
                toActive={activeDiv?.includes(i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
