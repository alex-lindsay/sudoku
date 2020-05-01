import React from "react";

import styles from "./PencilMark.module.css";

const PencilMark = (props) => {
  return (
    <div
      className={[styles.PencilMark, styles["PencilMark" + props.number]].join(
        " "
      )}
    >
      {props.number}
    </div>
  );
};

export default PencilMark;
