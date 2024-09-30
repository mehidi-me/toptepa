"use client";

import useTapStore from "@/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export default function Footer({}: Props) {
  const pathname = usePathname();
  const { countStarted, gameStarted } = useTapStore((state) => state);
  return (
    <div
      className={`footer-menu on-game-start`}
      style={{
        position: "fixed",
        bottom: 0,
        transform:
          countStarted || gameStarted ? "translateY(100%)" : "translateY(0%)",
      }}
    >
      <div className="container">
        <Link href={"/level"}>
          <div className={`ico ${pathname === "/level" ? "active" : ""}`}>
            <i className="uil uil-info-circle" />
          </div>
        </Link>
        <Link href={"/leaderboard"}>
          <div className={`ico ${pathname === "/leaderboard" ? "active" : ""}`}>
            <i className="uil uil-list-ol-alt" />
          </div>
        </Link>
        <Link href={"/"}>
          <div className={`ico order ${pathname === "/" ? "" : ""}`}>
            <i className="uil uil-clipboard-notes" />
          </div>
        </Link>
        <Link href={"/notifications"}>
          <div
            className={`ico ${pathname === "/notifications" ? "active" : ""}`}
          >
            <i className="uil uil-bell" />
            <div className="alert" />
          </div>
        </Link>
        <Link href={"/profile"}>
          <div className={`ico ${pathname === "/profile" ? "active" : ""}`}>
            <i className="uil uil-user" />
          </div>
        </Link>
      </div>
    </div>
  );
}
