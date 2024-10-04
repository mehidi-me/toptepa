import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useTapStore from "@/store";

const BeforeCloseSave = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setGamePaused, gameStarted, gamePaused } = useTapStore(
    (state) => state
  );

  useEffect(() => {
    if (gameStarted) {
      const handleBeforeUnload = (event: Event) => {
        event.preventDefault();
        setTimeout(() => {
          setGamePaused(false);
        }, 1000);
        return "Game Paused";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const handleRouteChange = () => {
        setTimeout(() => {
          setGamePaused(false);
        }, 1000);
      };

      handleRouteChange();
    }
  }, [pathname, searchParams, gameStarted]);

  return null;
};

export default BeforeCloseSave;
