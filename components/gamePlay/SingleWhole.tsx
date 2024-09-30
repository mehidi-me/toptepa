import React from "react";
import { PositionType } from "@/app/(protected)/page";
import settings from "@/data/settings";
import useTapStore from "@/store";
import Image from "next/image";

type Props = {
  handleTap: () => void;
  selectedClient: PositionType;
  index: number;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SingleWhole({
  handleTap,
  index,
  selectedClient,
  clicked,
  setClicked,
}: Props) {
  const { activeDiv, currentLevel } = useTapStore((state) => state);

  return (
    <>
      <div className={`whole ${activeDiv === index ? "active" : ""}`}>
        {activeDiv === index && (
          <div
            className="anim-img"
            onClick={() => {
              setClicked(true);
              handleTap();
            }}
          >
            <Image src={selectedClient.imageSrc} alt="client" />
            {clicked && (
              <p
                style={{
                  color:
                    selectedClient.clientType == "good" ? "#1dbf73" : "#f85e5e",
                  animationDuration:
                    settings?.levels?.[currentLevel]?.clientDuration / 1000 +
                    "s",
                }}
              >
                {selectedClient.clientType == "good" && "+"}{" "}
                {selectedClient.orders} Orders
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
