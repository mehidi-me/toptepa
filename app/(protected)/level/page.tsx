"use client";
import Footer from "@/components/root/Footer";
import "@/public/css/level.css";
import Image from "next/image";
import useTapStore from "@/store";
import settings from "@/data/settings";
import React from "react";
import { calculateRating } from "@/lib/utils";

type Props = {};

export default function Level({}: Props) {
  const { currentLevel, tapCount, totalScore } = useTapStore((state) => state);
  const level = settings?.levels?.[currentLevel];

  return (
    <React.Fragment>
      <main>
        <div className="container">
          <div className="current-level-badge">
            <Image src={level?.icon} alt="Level" />
            <p>{level?.label}</p>
          </div>
          <div className="level-flow">
            {Object.entries(settings?.levels)?.map(([key, level], index) => {
              return (
                <div
                  key={index}
                  className={`level ${key === currentLevel ? "active" : ""}`}
                >
                  <Image src={level.icon} alt="" className="w-full h-full" />
                  <p>{level.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <section>
        <div className="container">
          <div className="gap-1">
            <h2 className="title">Performance metrics</h2>
            <div className="block">
              <div className="header">
                <div className="flex">
                  <p>Tap Rating</p>
                  <h2>{calculateRating(tapCount)}%</h2>
                </div>
                <div className="bar-wraper">
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: calculateRating(tapCount) + "%",
                        backgroundColor:
                          calculateRating(tapCount) < 70 ? "var(--alert)" : "",
                      }}
                    />
                  </div>
                </div>
                <div className="placement">
                  <small>0%</small>
                  <small>70%</small>
                  <small>90%</small>
                  <small>100%</small>
                </div>
              </div>
              <div className="body">
                <div className="list">
                  <p>Maintain current level</p>
                  <p>Quality for next level</p>
                </div>
                {calculateRating(tapCount) < level?.nextLevelTap ? (
                  <div className="block alert">
                    <i className="uil uil-multiply" />
                    <p>Qualified for next level</p>
                  </div>
                ) : (
                  <div className="block">
                    <i className="uil uil-check" />
                    <p>Qualified for next level</p>
                  </div>
                )}
              </div>
            </div>
            <div className="block">
              <div className="header">
                <div className="flex">
                  <p>Top Tepa Orders</p>
                  <h3>
                    <span>{totalScore}</span> / {level?.nextLevelScore}
                  </h3>
                </div>
              </div>
              <div className="body">
                <div className="list">
                  <p>Maintain current level</p>
                  <p>Quality for next level</p>
                </div>
                {totalScore < level?.nextLevelScore ? (
                  <div className="block alert">
                    <i className="uil uil-multiply" />
                    <p>Qualified for next level</p>
                  </div>
                ) : (
                  <div className="block">
                    <i className="uil uil-check" />
                    <p>Qualified for next level</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
