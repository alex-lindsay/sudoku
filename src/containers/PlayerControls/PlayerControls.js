import React from "react";

import * as actions from "../../store/actions";
import * as constants from "../../constants";

import ClickModeInput from "../../components/ClickModeInput/ClickModeInput";
import NumberModeInput from "../../components/NumberModeInput/NumberModeInput";
import PlayerControlButton from "../../components/PlayerControlButton/PlayerControlButton";

import styles from "./PlayerControls.module.css";

const PlayerControls = (props) => {
  const numberModeButtons = Array(9)
    .fill("")
    .map((val, index) => (
      <NumberModeInput key={index + 1} number={index + 1} />
    ));
  return (
    <>
      <div className={[styles.PlayerControls, "container-fluid"].join(" ")}>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <ClickModeInput mode={constants.CLICKMODE_STARTERS} text="Starters" />
          <ClickModeInput
            mode={constants.CLICKMODE_PENCILMARKS}
            text="Pencil Marks"
          />
          <ClickModeInput mode={constants.CLICKMODE_GUESSES} text="Guesses" />
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
      <div className={[styles.PlayerControls, "container-fluid"].join(" ")}>
        <PlayerControlButton
          onClickAction={actions.resetBoard}
          text="Reset Board"
        />
      </div>
    </>
  );
};

export default PlayerControls;
