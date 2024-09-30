"use client";

import React, { useEffect, useState } from "react";
import "@/public/css/form.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const route = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();
      if (data.success) {
        route.push("/");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <main>
      <div className="container">
        <div className="block">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="fild">
              <input
                type="text"
                id="phone"
                placeholder=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="fild">
              <input
                type="password"
                id="pass"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="pass">Password</label>
              <i className="uil uil-eye" />
            </div>
            <button type="submit">Start TepaTepi</button>
            {message && (
              <p style={{ color: "#FE0320", marginTop: "0.7rem" }}>{message}</p>
            )}
            <div className="addons">
              <p>
                Don't have an account? <Link href="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
