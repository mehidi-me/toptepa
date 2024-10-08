"use client";
import React, { useState } from "react";
// import "@/public/css/form.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form">
      <div className="container">
        <div className="block">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="fild">
              <input
                type="phone"
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
                type={showPassword ? "text" : "password"}
                id="pass"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="pass">Password</label>
              <p onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <i className="uil uil-eye-slash" />
                ) : (
                  <i className="uil uil-eye" />
                )}
              </p>
            </div>
            <button
              disabled={loading}
              style={{
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
              type="submit"
            >
              Start TepaTepi
            </button>
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
