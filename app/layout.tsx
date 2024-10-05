"use client";
//import { DM_Sans } from "next/font/google";
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
import { usePathname } from "next/navigation";

// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   display: "swap",
// });
// ${dmSans.className} 
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <link rel="preconnect" href="https://fonts.gstatic.com" />

      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        precedence="default"
      />
      <body
        className={`${
          countStarted || gameStarted ? "on-game-start-body" : ""
        }`}
        style={
          router == "/login" || router == "/register"
            ? { paddingBottom: "0" }
            : { paddingBottom: "10rem" }
        }
      >
        {children}
      </body>
    </html>
  );
}
