import React from "react";
import styles from "./Gameboard.module.css";

const Gameboard = (props) => {
  return (
    <div className={[styles.Gameboard, "container-md"].join(" ")}>
      This is the gameboard.
    </div>
  );
};

export default Gameboard;
