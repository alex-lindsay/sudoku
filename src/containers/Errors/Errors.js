import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../store/actions";

import styles from "./Errors.module.css";

const Errors = (props) => {
  const errorMessages = useSelector((state) => state.errorMessages);
  const messages = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  const errorMessageAlerts = errorMessages.map((errorMessage, index) => (
    <div
      key={index}
      className="alert alert-danger"
      role="alert"
      onClick={() => {
        dispatch(clearErrors());
      }}
    >
      {errorMessage}
    </div>
  ));

  const messageAlerts = messages.map((message, index) => (
    <div
      key={index}
      className="alert alert-primary"
      role="alert"
      onClick={() => {
        dispatch(clearErrors());
      }}
    >
      {message}
    </div>
  ));

  const isVisible =
    errorMessages.length + messages.length > 0 ? null : styles.hidden;

  return (
    <div className={[styles.ErrorContainer, isVisible].join(" ")}>
      {errorMessageAlerts}
      {messageAlerts}
    </div>
  );
};

export default Errors;
