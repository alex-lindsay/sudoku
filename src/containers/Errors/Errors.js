import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../store/actions";

import styles from "./Errors.module.css";

const Errors = (props) => {
  const errorMessages = useSelector((state) => state.errorMessages);

  const dispatch = useDispatch();

  const errorMessageAlerts = errorMessages.map((errorMessage, index) => (
    <div key={index} className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  ));

  return <div>{errorMessageAlerts}</div>;
};

export default Errors;
