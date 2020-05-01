import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClickMode } from "../../store/actions";

import styles from "./ClickModeInput.module.css";

const ClickModeInput = (props) => {
  const clickMode = useSelector((state) => state.clickMode);

  const dispatch = useDispatch();

  return (
    <label
      className={[
        "btn",
        "btn-secondary",
        clickMode === props.mode ? "active" : null,
        clickMode === props.mode ? styles.ClickModeInputActive : null,
      ].join(" ")}
    >
      <input
        type="radio"
        name="clickMode"
        id={props.mode}
        onChange={() => dispatch(setClickMode(props.mode))}
      />{" "}
      {props.text}
    </label>
  );
};

export default ClickModeInput;
