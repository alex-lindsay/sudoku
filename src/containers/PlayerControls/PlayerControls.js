import React from "react";
import styles from "./PlayerControls.module.css";

const PlayerControls = (props) => {
  return (
    <div className={[styles.PlayerControls, "container-fluid"].join(" ")}>
      This is the controls.
    </div>
  );
};

export default PlayerControls;
