"use client";
import useTapStore from "@/store";
import Link from "next/link";

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
        <Link href={"/profile"} className="profile-pic">
          <img
            src={user?.profilePicture || "/images/avatar.png"}
            alt=""
            className="w-full h-full"
          />
        </Link>
      </div>
    </header>
  );
}
