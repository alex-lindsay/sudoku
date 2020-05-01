import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNumberMode } from "../../store/actions";

import styles from "./NumberModeInput.module.css";

const NumberModeInput = (props) => {
  const numberMode = useSelector((state) => state.numberMode);

  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={[
        "btn-lg",
        "btn-secondary",
        styles.NumberModeInput,
        numberMode === props.number ? styles.NumberModeInputActive : null,
        numberMode === props.number ? "active" : null,
      ].join(" ")}
      onClick={() => dispatch(setNumberMode(props.number))}
    >
      {props.number}
    </button>
    // <div
    //   className={["btn-group-toggle", styles.NumberModeInput].join(" ")}
    //   data-toggle="buttons"
    // >
    //   <label
    //     className={[
    //       "btn-lg",
    //       "btn-secondary",
    //       numberMode === props.mode ? "active" : null,
    //     ].join(" ")}
    //   >
    //     <input
    //       type="checkbox"
    //       onClick={() => dispatch(setNumberMode(props.mode))}
    //     />{" "}
    //     {props.mode}
    //   </label>
    // </div>
  );
};

export default NumberModeInput;
