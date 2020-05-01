import React from "react";
import { useDispatch } from "react-redux";

import styles from "./PlayerControlButton.module.css";

const PlayerControlButton = (props) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={["btn-lg", "btn-secondary", styles.PlayerControlButton].join(
        " "
      )}
      disabled={props.disabled}
      onClick={() => dispatch(props.onClickAction())}
    >
      {props.text}
    </button>
  );
};

export default PlayerControlButton;
