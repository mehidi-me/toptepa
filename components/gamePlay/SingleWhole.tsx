import { PositionType } from "@/app/page";
import settings from "@/data/settings";
import Image, { StaticImageData } from "next/image";

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
};

export default function SingleWhole({
  wholeID,
  clientWhole,
  targetWhole,
  setTotalScore,
  clientPositions,
  index,
}: Props) {
  const makeScore = () => {
    setTotalScore((prev) => prev + clientPositions[index].client.score);
  };

  return (
    wholeID === targetWhole && (
      <>
        <div
          className="anim-img"
          style={{
            animationDuration:
              settings?.levels?.level1?.clientDuration / 1000 + "s",
          }}
          onClick={makeScore}
        >
          <Image
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
