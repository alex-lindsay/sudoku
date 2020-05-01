import React from "react";

import styles from "./PlayerControls.module.css";
import ClickModeInput from "../../components/ClickModeInput/ClickModeInput";
import NumberModeInput from "../../components/NumberModeInput/NumberModeInput";

const CLICKMODE_STARTERS = "starters";
const CLICKMODE_PENCILMARKS = "pencilMarks";
const CLICKMODE_GUESSES = "guesses";

const PlayerControls = (props) => {
  const numberModeButtons = Array(9)
    .fill("")
    .map((val, index) => <NumberModeInput number={index + 1} />);
  return (
    <>
      <div className={[styles.PlayerControls, "container-fluid"].join(" ")}>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <ClickModeInput mode={CLICKMODE_STARTERS} text="Starters" />
          <ClickModeInput mode={CLICKMODE_PENCILMARKS} text="Pencil Marks" />
          <ClickModeInput mode={CLICKMODE_GUESSES} text="Guesses" />
        </div>
      </div>
      <div
        className={[
          styles.PlayerControls,
          "container-fluid",
          "justify-content-center",
          "d-flex",
          "flex-wrap",
        ].join(" ")}
      >
        {numberModeButtons}
      </div>
    </>
  );
};

export default PlayerControls;
