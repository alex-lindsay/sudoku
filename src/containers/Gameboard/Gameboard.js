import React from "react";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import GameSlot from "../../components/GameSlot";

import styles from "./GameBoard.module.css";

const Gameboard = (props) => {
  const gameBoard = useSelector((state) => state.currentPosition);
  const selectedSlot = useSelector((state) => state.selectedSlot);

  const gameSlots = gameBoard.map((slot, index) => {
    const isSelected = index === selectedSlot;
    console.log({ index, selectedSlot, isSelected });
    return (
      <GameSlot key={index} index={index} slot={slot} selected={isSelected} />
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
