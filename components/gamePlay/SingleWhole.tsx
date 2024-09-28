import { PositionType } from "@/app/page";
import settings from "@/data/settings";
import { debounce } from "@/lib/utils";
import useTapStore from "@/store";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type Props = {
  wholeID: string;
  clientWhole: {
    id: string;
    client: {
      image: StaticImageData;
      score: number;
    };
  };
  targetWhole: string;
  clientPositions: PositionType[];
  index: number;
};

export default function SingleWhole({
  wholeID,
  clientWhole,
  targetWhole,
  clientPositions,
  index,
}: Props) {
  const router = useRouter();
  const { currentLevel, setCurrentLevel, setTotalScore, totalScore, tapCount } =
    useTapStore((state) => state);

  const [clicked, setClicked] = useState(false);

  const levelUp = () => {
    const level = settings?.levels?.[currentLevel];
    const currentTap = Math.round(
      (tapCount.correctTap / (tapCount.totalTap || 1)) * 100
    );

    console.log(
      `Level: ${currentLevel} | Score: ${totalScore} | Tap: ${currentTap}%`
    );
    console.log(
      `Next Level: ${level?.nextLevel} | Score: ${level?.nextLevelScore} | Tap: ${level?.nextLevelTap}%`
    );
    console.log(tapCount);

    if (
      totalScore >= level.nextLevelScore &&
      currentTap >= level.nextLevelTap &&
      currentLevel !== "level4"
    ) {
      setCurrentLevel(
        settings?.levels?.[currentLevel]?.nextLevel || currentLevel
      );
      router.refresh();
    }
  };

  const makeScore = useCallback(
    debounce((index: number) => {
      const scoreToAdd = clientPositions[index].client.score;

      setTotalScore(scoreToAdd);

      console.log(`Client Score: ${totalScore}`);

      setClicked(false);
      // levelUp();
    }, 300),
    [clientPositions]
  );

  return (
    wholeID === targetWhole && (
      <>
        <div
          className="anim-img"
          style={{
            animationDuration:
              settings?.levels?.level1?.clientDuration / 1000 + "s",
          }}
        >
          <Image
            onClick={() => {
              setClicked(true);
              makeScore(index);
            }}
            src={clientWhole?.client?.image}
            alt="Client Image"
            className="w-full h-full"
          />
        </div>
        {clicked && (
          <p
            style={{
              animationDuration:
                settings?.levels?.level1?.clientDuration / 1000 + "s",
            }}
          >
            {clientWhole?.client?.score} Orders
          </p>
        )}
      </>
    )
  );
}
