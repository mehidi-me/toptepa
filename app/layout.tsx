"use client";
import { DM_Sans } from "next/font/google";
import "./style.css";
import "@/public/css/custom.css";
import useTapStore from "@/store";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { countStarted, gameStarted } = useTapStore((state) => state);
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
      ></link>
      <body
        className={`${dmSans.className} ${
          countStarted || gameStarted ? "on-game-start-body" : ""
        }`}
      >
        {children}
      </body>
    </html>
  );
}
