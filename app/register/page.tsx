"use client";
import React, { useState } from "react";
// import "@/public/css/profile.css";
// import "@/public/css/form.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [fiverrName, setFiverrName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (name.length < 3) {
      setMessage("Name must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (phone.length != 11) {
      setMessage("Phone number must be 11 characters");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, password, fiverrName }),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form">
      <div className="container">
        <div className="block">
          <div>
            <p style={{marginBottom: '3rem',
color: '#d9a2a2',
textAlign: 'center',
lineHeight: '1.5'}}>Please provide a valid phone number to confirm the winner at the end of the contest. Your data will be securely protected by the community.</p>
          </div>
          <h2 className="title">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="profile-input">
              <label className="profile-pic" htmlFor="pic-up">
                <img src="images/avatar.png" alt="" />
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
              <label htmlFor="public-name">Display name</label>
            </div>
            {/* <div className="fild">
              <input
                type="text"
                id="fiverr-name"
                placeholder=" "
                required
                value={fiverrName}
                onChange={(e) => setFiverrName(e.target.value)}
              />
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
                type={showPassword ? "text" : "password"}
                id="pass"
                placeholder=" "
                required
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
            <div className="fild">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="c-pass"
                placeholder=" "
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="c-pass">Confirm password</label>
              <p onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
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
              Complete Registration
            </button>
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
                Already have an account? <Link href="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
