import settings from "@/data/settings";
import Image from "next/image";

type Props = {
  totalScore: number;
  currentLevel: "level1" | "level2" | "level3" | "level4";
};

export default function GameReport({ totalScore, currentLevel }: Props) {
  const level = settings?.levels?.[currentLevel];
  return (
    <div className="block report">
      <div className="card">
        <p>Your Level</p>
        <div className="lavel">
          <Image src={level?.icon} alt="Level" />
        </div>
        <h3>{level?.label}</h3>
      </div>
      <div className="card">
        <p>Leaderboard</p>
        <div className="rank">
          <h2>120</h2>
        </div>
        <h3>Your rank</h3>
      </div>
      <div className="card">
        <p>Top Tepa Orders</p>
        <div className="coin">
          <img src="images/coin.png" alt="" />
          <h2>{totalScore}</h2>
        </div>
      </div>
      <div className="card">
        <p>Tap Rating</p>
        <h2 className="rating-percentage">0%</h2>
        <div className="bar-wraper">
          <div className="progress-bar">
            <div className="progress" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
