"use client";
import { DM_Sans } from "next/font/google";
import "@/public/css/style.css";
import "@/public/css/custom.css";
import "@/public/css/form.css";
import "@/public/css/profile.css";
import "@/public/css/form.css";
import "@/public/css/leaderboard.css";
import "@/public/css/level.css";
import "@/public/css/notification.css";
import "@/public/css/contributor.css";
import useTapStore from "@/store";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

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
  const router = usePathname();
  console.log(router);
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        precedence="default"
      ></link>
      <body
        className={`${dmSans.className} ${
          countStarted || gameStarted ? "on-game-start-body" : ""
        }`}
        style={router == "/login" || router == "/register" ? {paddingBottom:'0'} : {paddingBottom: '10rem'}}
      >
        {children}
      </body>
    </html>
  );
}
