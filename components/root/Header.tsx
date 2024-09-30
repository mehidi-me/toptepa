"use client";

import Image from "next/image";
import useTapStore from "@/store";

export default function Header({}) {
  const { user, countStarted, gameStarted } = useTapStore((state) => state);
  return (
    <header
      className={`on-game-start`}
      style={{
        position: "absolute",
        top: 0,
        transform:
          countStarted || gameStarted ? "translateY(-100%)" : "translateY(0%)",
      }}
    >
      <div className="container">
        <div className="greetings">
          <p>
            Hi <span>{user.name}</span>,
          </p>
          <h1>Welcome back</h1>
        </div>
        <div className="profile-pic">
          <img
            src={user?.profilePicture || "/images/user.png"}
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
    </header>
  );
}
