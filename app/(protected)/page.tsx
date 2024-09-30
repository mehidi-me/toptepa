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

let clientCounts = { client1: 0, client2: 0, client3: 0 };

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
  const [selectedClients, setSelectedClients] = useState<PositionType[]>([]);

  const initializeClientCounts = (
    totalClient: number,
    totalClient2: number,
    totalClient3: number
  ) => {
    const remainingClients = totalClient - totalClient2 - totalClient3;

    clientCounts.client1 = Math.max(
      2,
      Math.floor(Math.random() * (remainingClients + 1))
    );

    clientCounts.client2 = totalClient2;
    clientCounts.client3 = totalClient3;

    console.log("Client Counts", clientCounts);
  };

  const resetClientCounts = () => {
    initializeClientCounts(
      settings?.levels?.[currentLevel]?.totalClient,
      settings?.levels?.[currentLevel]?.client2Count || 0,
      settings?.levels?.[currentLevel]?.client3Count || 0
    );
  };

  const selectRandomClients = () => {
    const { client1, client2, client3 } = settings?.clientProperties;
    const totalRemaining =
      clientCounts.client1 + clientCounts.client2 + clientCounts.client3;

    if (totalRemaining === 0) {
      resetClientCounts();
    }

    let clients: PositionType[] = [];

    // Show multiple clients only for levels 3 and 4
    if (Number(currentLevel.split("level")[1]) >= 3) {
      const clientsToShow = 4;

      for (let i = 0; i < clientsToShow; i++) {
        const rand = Math.random();
        let selectedClient: PositionType;

        if (rand < clientCounts.client1 / totalRemaining) {
          selectedClient = client1;
          clientCounts.client1--;
        } else if (
          rand <
          (clientCounts.client1 + clientCounts.client2) / totalRemaining
        ) {
          selectedClient = client2;
          clientCounts.client2--;
        } else {
          selectedClient = client3;
          clientCounts.client3--;
        }

        clients.push(selectedClient);
      }
    } else {
      // For levels below 3, only select a single client
      const rand = Math.random();
      let selectedClient: PositionType;

      if (rand < clientCounts.client1 / totalRemaining) {
        selectedClient = client1;
        clientCounts.client1--;
      } else if (
        rand <
        (clientCounts.client1 + clientCounts.client2) / totalRemaining
      ) {
        selectedClient = client2;
        clientCounts.client2--;
      } else {
        selectedClient = client3;
        clientCounts.client3--;
      }

      clients.push(selectedClient);
    }

    return clients;
  };
  const handleTap = (selectedClient: PositionType) => {
    if (selectedClient.clientType === "good") {
      setTotalScore(selectedClient.orders);
      setTapCount({ byCorrect: 1, byWrong: 0, byMissed: 0 });
    } else {
      setTotalScore(-20);
      setTapCount({ byCorrect: 0, byWrong: 1, byMissed: 0 });
    }
  };

  const handleMissedTap = () => {
    selectedClients.forEach((client) => {
      if (client.clientType === "good") {
        setTapCount({
          byCorrect: 0,
          byWrong: 0,
          byMissed: 1,
        });
      }
    });
  };

  const switchImage = () => {
    setClicked(-1);

    let selectedDivIndexes = Array.from(
      { length: Number(currentLevel.split("level")[1]) >= 3 ? 4 : 1 },
      () => Math.floor(Math.random() * 9)
    );

    while (
      JSON.stringify(activeDiv.sort()) ===
      JSON.stringify(selectedDivIndexes.sort())
    ) {
      selectedDivIndexes = Array.from(
        { length: Number(currentLevel.split("level")[1]) >= 3 ? 4 : 1 },
        () => Math.floor(Math.random() * 9)
      );
    }

    const newClients = selectRandomClients();

    setSelectedClients(newClients);
    setActiveDiv(selectedDivIndexes);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (gameStarted) {
      interval = setInterval(switchImage, switchInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameStarted, activeDiv, switchInterval]);

  useEffect(() => {
    if (activeDiv && activeDiv.length > 0) {
      setTimeout(() => {
        handleMissedTap();
      }, switchInterval - 500);
    }
  }, [activeDiv]);

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
