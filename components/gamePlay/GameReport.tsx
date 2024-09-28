import settings from "@/data/settings";
import Image from "next/image";
import coinImage from "@/public/images/coin.png";
import useTapStore from "@/store";

export default function GameReport() {
  const { totalScore, currentLevel, tapCount } = useTapStore((state) => state);
  const level = settings?.levels?.[currentLevel];
  return (
    <div className="block report">
      <div className="card">
        <p>Your Level</p>
        <div className="level">
          <Image src={level?.icon} alt="Level" className="w-full h-full" />
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
          <Image src={coinImage} alt="" className="w-full h-full" />
          <h2>{totalScore}</h2>
        </div>
      </div>
      <div className="card">
        <p>Tap Rating</p>
        <h2 className="rating-percentage">
          {Math.round((tapCount.correctTap / (tapCount.totalTap || 1)) * 100)}%
        </h2>
        <div className="bar-wraper">
          <div className="progress-bar">
            <div className="progress" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
