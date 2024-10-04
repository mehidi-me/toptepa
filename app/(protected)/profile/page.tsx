"use client";

import React from "react";
import Footer from "@/components/root/Footer";
// import "@/public/css/profile.css";
import { useRouter } from "next/navigation";
import useTapStore from "@/store";
import { useRef, useState } from "react";
import { toBase64 } from "@/lib/utils";
import toast from "react-hot-toast";

type Props = {};

export default function page({}: Props) {
  const route = useRouter();
  const { user, setData, themeColor } = useTapStore((state) => state);
  const [name, setName] = useState(user?.name || "");
  const [userName, setUserName] = useState(user?.fiverrName || "");
  const [editName, setEditName] = useState(false);
  const [file, setFile] = useState<any>(user?.profilePicture || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [unsaved, setUnsaved] = useState(false);

  const [themeColorValue, setThemeColorValue] = useState(
    themeColor || "#1dbf73"
  );

  const handleFileChange = async (event: any) => {
    setUnsaved(true);
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
      setUnsaved(false);
      toast.success("Saved Changes!");
    }
  };
  const saveHandler2 = async () => {
    if (userName.length > 0) {
      await fetch("/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fiverrName: userName,
        }),
      });
      setData({
        user: { ...user, fiverrName: userName },
        themeColor: themeColorValue,
      });
      toast.success("Joined Contest Successfully!");
    } else {
      alert("Please Enter Your Fiverr Username");
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
      <main className="mt-2 profile">
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
                  onChange={(e) => {
                    setUnsaved(true);
                    setName(e.target.value);
                  }}
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
          <div className="block" style={{ display: "none" }}>
            <div className="flex">
              <p>Primary theme color</p>
              <div className="color-picker">
                <label htmlFor="color" style={{}} />
                <input
                  type="color"
                  id="color"
                  value={themeColorValue}
                  onChange={(e) => {
                    setUnsaved(true);
                    setThemeColorValue(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="action">
            <button disabled={!unsaved} onClick={saveHandler}>
              Save Changes
            </button>
            <button onClick={logOutHandler} className="alert">
              Logout
            </button>
          </div>

          <h2 className="title">Contest</h2>
          <div className="block">
            {user?.fiverrName ? (
              <h1>You are in🐰</h1>
            ) : (
              <>
                <div className="fild">
                  <input
                    type="text"
                    id="fiverr_username"
                    placeholder=" "
                    required
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label htmlFor="fiverr_username">Fiverr Username</label>
                </div>
                <button onClick={saveHandler2}>Join Contest</button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
