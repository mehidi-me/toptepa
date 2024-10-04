import settings from "@/data/settings";
import Image from "next/image";
import coinImage from "@/public/images/coin.png";
import useTapStore from "@/store";
import { calculateRating } from "@/lib/utils";
import Link from "next/link";

export default function GameReport() {
  const { totalScore, currentLevel, tapCount, setGamePaused } = useTapStore(
    (state) => state
  );
  const level = settings?.levels?.[currentLevel];

  return (
    <div className="block report">
      <Link href={"/level"} className="card">
        <p>Your Level</p>
        <div className="level">
          <Image
            src={level?.icon}
            alt="Level"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h3>{level?.label}</h3>
      </Link>
      <div className="card">
        <p>Leaderboard</p>
        <div className="rank">
          <h2>-</h2>
        </div>
        <h3>Your rank</h3>
      </div>
      <div className="card">
        <p>Top Tepa Orders</p>
        <div className="coin">
          <Image src={coinImage} alt="" />
          <h2>{totalScore === 0 ? "-" : totalScore}</h2>
        </div>
      </div>
      <div className="card">
        <p>Tap Rating</p>
        <h2 className="rating-percentage">
          {calculateRating(tapCount) ? calculateRating(tapCount) + "%" : "-"}
        </h2>
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
      </div>
      <button onClick={() => setGamePaused(true)}>Pause</button>
    </div>
  );
}
