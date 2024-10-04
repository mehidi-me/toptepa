import settings from "@/data/settings";
import useTapStore from "@/store";
import "./LevelUp.css";

type Props = {};

export default function LevelUpModal({}: Props) {
  const { setShowModal, currentLevel } = useTapStore((state) => state);
  const level = settings?.levels?.[currentLevel];

  return (
    <div className="level-modal">
      <div className="modal-block">
        <div className="level-badge">
          <img
            src={`images/${
              currentLevel == "level2"
                ? "l1"
                : currentLevel == "level3"
                ? "l2"
                : currentLevel == "level4"
                ? "l3"
                : "l1"
            }.svg`}
            alt=""
          />
        </div>
        <h2>Congrats!</h2>
        <p>You are now {level.label}.</p>
        <p className="close" onClick={() => setShowModal(false)}>
          Got it!
        </p>
      </div>
    </div>
  );
}
