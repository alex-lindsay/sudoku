import * as constants from "../../constants";
import React from "react";

import PencilMark from "../PencilMark/PencilMark";

import styles from "./GameSlot.module.css";

const GameSlot = (props) => {
  const marginRight =
    props.index % constants.BOARD_WIDTH === 2 ||
    props.index % constants.BOARD_WIDTH === 5
      ? styles.marginRight
      : null;
  const marginBottom =
    Math.floor(props.index / constants.BOARD_WIDTH) === 2 ||
    Math.floor(props.index / constants.BOARD_WIDTH) === 5
      ? styles.marginBottom
      : null;
  const selected = props.selected ? styles.selected : null;
  const checking = props.isChecking ? styles.checking : null;
  const pencilMarkItems =
    props.pencilMarks && !props.guess
      ? props.pencilMarks.map((mark) => <PencilMark key={mark} number={mark} />)
      : null;

  return (
    <div
      className={[
        styles.GameSlot,
        marginRight,
        marginBottom,
        selected,
        checking,
      ].join(" ")}
      onClick={props.toggleSelectedSlot}
    >
      <div className={styles.startingPosition}>{props.startingPosition}</div>
      <div className={styles.guess}>{props.guess}</div>
      <div className={styles.pencilMarks}>{pencilMarkItems}</div>
    </div>
  );
};

export default GameSlot;
