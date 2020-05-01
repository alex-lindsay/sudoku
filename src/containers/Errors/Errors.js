import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../store/actions";

import styles from "./Errors.module.css";

const Errors = (props) => {
  const errorMessages = useSelector((state) => state.errorMessages);

  const dispatch = useDispatch();

  const errorMessageAlerts = errorMessages.map((errorMessage, index) => (
    <div
      key={index}
      className="alert alert-danger"
      role="alert"
      onClick={() => {
        alert("test");
        dispatch(clearErrors());
      }}
    >
      {errorMessage}
    </div>
  ));

  const isVisible = errorMessages.length > 0 ? null : styles.hidden;

  return (
    <div className={[styles.ErrorContainer, isVisible].join(" ")}>
      {errorMessageAlerts}
    </div>
  );
};

export default Errors;
