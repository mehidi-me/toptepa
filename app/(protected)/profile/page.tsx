"use client";

import React from "react";
import Footer from "@/components/root/Footer";
import "@/public/css/profile.css";
import { useRouter } from "next/navigation";
import useTapStore from "@/store";
import { useRef, useState } from "react";
import { toBase64 } from "@/lib/utils";

type Props = {};

export default function page({}: Props) {
  const route = useRouter();
  const { user, setData, themeColor } = useTapStore((state) => state);
  const [name, setName] = useState(user?.name || "");
  const [editName, setEditName] = useState(false);
  const [file, setFile] = useState<any>(user?.profilePicture || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [themeColorValue, setThemeColorValue] = useState(
    themeColor || "#1dbf73"
  );

  const handleFileChange = async (event: any) => {
    const fileBase = (await toBase64(event.target.files[0])) as string;
    setFile(fileBase);
  };

  const saveHandler = async () => {
    if (name.length > 0 && themeColorValue.length > 0) {
      await fetch("/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          themeColor: themeColorValue,
          profilePicture: file,
        }),
      });
      setData({
        user: { ...user, name, profilePicture: file },
        themeColor: themeColorValue,
      });
      document.documentElement.style.setProperty("--primary", themeColorValue);
      setEditName(false);
    }
  };

  const logOutHandler = async () => {
    await fetch("/auth/logout", {
      method: "POST",
    });
    route.push("/login");
  };

  return (
    <>
      <main className="mt-2">
        <div className="container">
          <h2 className="title">Profile Settings</h2>
          <div className="gap-1">
            <div className="block">
              <div className="profile-input">
                <label className="profile-pic" htmlFor="pic-up">
                  <img
                    src={file || "/images/avatar.png"}
                    alt=""
                    className="w-full h-full"
                  />
                  <i className="uil uil-camera-plus" />
                </label>
                <input type="file" id="pic-up" onChange={handleFileChange} />
              </div>
              <div className="user-name">
                <input
                  ref={inputRef}
                  type="text"
                  disabled={!editName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={editName ? { borderBottom: "1px solid white" } : {}}
                />
                {editName ? (
                  <i
                    className="uil uil-check"
                    onClick={() => setEditName(false)}
                  />
                ) : (
                  <i
                    className="uil uil-edit"
                    onClick={() => {
                      setEditName(true);
                      inputRef.current?.focus();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="block">
            <div className="flex">
              <p>Primary theme color</p>
              <div className="color-picker">
                <label htmlFor="color" style={{}} />
                <input
                  type="color"
                  id="color"
                  value={themeColorValue}
                  onChange={(e) => setThemeColorValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="action">
            <button onClick={saveHandler}>Save Changes</button>
            <button onClick={logOutHandler} className="alert">
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
