import { PositionType } from "@/app/page";
import settings, { Level } from "@/data/settings";
import { debounce } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useCallback } from "react";

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
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  clientPositions: PositionType[];
  index: number;
  currentLevel: Level;
  setCurrentLevel: React.Dispatch<React.SetStateAction<Level>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SingleWhole({
  wholeID,
  clientWhole,
  targetWhole,
  setTotalScore,
  clientPositions,
  index,
  currentLevel,
  setCurrentLevel,
  setGameStarted,
}: Props) {
  const makeScore = useCallback(
    debounce((index: number) => {
      setTotalScore((prev) => {
        const nextScore = prev + clientPositions[index].client.score;
        if (
          nextScore >= settings?.levels?.[currentLevel]?.nextLevelScore &&
          currentLevel !== "level4"
        ) {
          setCurrentLevel(
            settings?.levels?.[currentLevel]?.nextLevel || currentLevel
          );
          setGameStarted(false);
        }
        return nextScore;
      });
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
            onClick={() => makeScore(index)}
            src={clientWhole?.client?.image}
            alt="Client Image"
            className="w-full h-full"
          />
        </div>
        <p>{clientWhole?.client?.score} Orders</p>
      </>
    )
  );
}
