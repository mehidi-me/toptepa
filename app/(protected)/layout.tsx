"use client";

import React from "react";
import useTapStore from "@/store";
import Image from "next/image";
import loadingImage from "@/public/images/loading.gif";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const { setData } = useTapStore((state) => state);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/auth/profile", {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setData({
            user: {
              phone: data.user.phone,
              name: data.user.name,
              fiverrName: data.user.fiverrName,
              profilePicture: data.user.profilePicture,
            },
            currentLevel: data.user.currentLevel,
            totalScore: data.user.totalScore || 0,
            tapCount: {
              correctTap: data.user.tapCount.correctTap || 0,
              missedTap: data.user.tapCount.missedTap || 0,
              wrongTap: data.user.tapCount.wrongTap || 0,
            },
          });
          document.documentElement.style.setProperty(
            "--primary",
            data.user.themeColor
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Image src={loadingImage} alt="Loading" width={200} height={200} />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
