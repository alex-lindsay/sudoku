import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectedSlot } from "../../store/actions";

import GameSlot from "../../components/GameSlot/GameSlot";

import styles from "./GameBoard.module.css";

const Gameboard = (props) => {
  const startingPosition = useSelector((state) => state.startingPosition);
  // const cPosition = useSelector((state) => state.currentPosition);
  const selectedSlot = useSelector((state) => state.selectedSlot);

  const dispatch = useDispatch();

  const gameSlots = startingPosition.map((startingSlot, index) => {
    const isSelected = index === selectedSlot;
    // console.log({ index, selectedSlot, isSelected });
    return (
      <GameSlot
        key={index}
        index={index}
        startingPosition={startingSlot}
        // slot={slot}
        selected={isSelected}
        toggleSelectedSlot={() => dispatch(toggleSelectedSlot(index))}
      />
    );
  });

  return (
    <div className={[styles.GameBoard, "container-md"].join(" ")}>
      <div>This is the gameboard.</div>
      <div
        className={[
          styles.GameGrid,
          "d-flex",
          "justify-content-center",
          "flex-wrap",
        ].join(" ")}
      >
        {gameSlots}
      </div>
    </div>
  );
};

export default Gameboard;
