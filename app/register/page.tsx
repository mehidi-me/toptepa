"use client";

import React, { useState } from "react";
import "@/public/css/profile.css";
import "@/public/css/form.css";
import { useRouter } from "next/navigation";

type Props = {};

export default function page({}: Props) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const route = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Registration successful!");
        setTimeout(() => {
          route.push("/login");
        }, 1000);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <main>
      <div className="container">
        <div className="block">
          <h2 className="title">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="profile-input">
              <label className="profile-pic" htmlFor="pic-up">
                <img src="images/user.png" alt="" />
                <i className="uil uil-camera-plus" />
              </label>
              <input type="file" id="pic-up" />
            </div>
            <div className="fild">
              <input
                type="text"
                id="public-name"
                placeholder=" "
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="public-name">Public profile name</label>
            </div>
            {/* <div className="fild">
              <input type="text" id="fiverr-name" placeholder=" " required />
              <label htmlFor="fiverr-name">Fiverr user name</label>
            </div> */}
            <div className="fild">
              <input
                type="text"
                id="phone"
                placeholder=" "
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="fild">
              <input
                type="password"
                id="pass"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="pass">Password</label>
              <i className="uil uil-eye" />
            </div>
            <div className="fild">
              <input
                type="password"
                id="c-pass"
                placeholder=" "
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="c-pass">Confirm password</label>
              <i className="uil uil-eye-slash" />
            </div>
            <button type="submit">Start TepaTepi</button>
            {message && (
              <p
                style={{
                  color:
                    message === "Registration successful!"
                      ? "#1dbf73"
                      : "#FE0320",
                  marginTop: "0.7rem",
                }}
              >
                {message}
              </p>
            )}
            <div className="addons">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
