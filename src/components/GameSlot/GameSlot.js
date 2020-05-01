import React from "react";
import styles from "./GameSlot.module.css";

const GameSlot = (props) => {
  const marginRight =
    props.index % 9 === 2 || props.index % 9 === 5 ? styles.marginRight : null;
  const marginBottom =
    Math.floor(props.index / 9) === 2 || Math.floor(props.index / 9) === 5
      ? styles.marginBottom
      : null;
  const selected = props.selected ? styles.selected : null;

  return (
    <div
      className={[styles.GameSlot, marginRight, marginBottom, selected].join(
        " "
      )}
      onClick={props.toggleSelectedSlot}
    >
      <div className={styles.startingPosition}>{props.startingPosition}</div>
    </div>
  );
};

export default GameSlot;
