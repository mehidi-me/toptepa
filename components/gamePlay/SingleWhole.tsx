import React, { useCallback, useState } from "react";
import { PositionType } from "@/app/(protected)/page";
import settings from "@/data/settings";
import useTapStore from "@/store";
import Image from "next/image";
import debounce from "lodash.debounce";

type Props = {
  handleTap: (selectedClient: PositionType) => void;
  selectedClient: PositionType;
  toActive: boolean;
  setClicked: React.Dispatch<React.SetStateAction<number>>;
  clicked: number;
  index: number;
  missTimer: NodeJS.Timeout | undefined;
};

export default function SingleWhole({
  handleTap,
  selectedClient,
  toActive,
  setClicked,
  clicked,
  index,
  missTimer,
}: Props) {
  const { currentLevel } = useTapStore((state) => state);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

   const playAudio = (audio: HTMLAudioElement) => {
     if (currentAudio) {
       currentAudio.pause();
       currentAudio.currentTime = 0;
     }
     audio.play().catch((error) => {
       console.error("Failed to play audio:", error);
     });
     setCurrentAudio(audio);
   };

  const debouncedFunction = useCallback(
    debounce(() => {
      clearTimeout(missTimer);
      setClicked(index);
      handleTap(selectedClient);
      playAudio(selectedClient.audio_type);
    }, 200),
    [missTimer, index, selectedClient]
  );

  return (
    <>
      <div className={`whole`}>
        {toActive && selectedClient && (
          <div className="anim-img" onClick={debouncedFunction}>
            <Image priority={true} src={selectedClient.imageSrc} alt="client" />
            {clicked == index && (
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
