"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/actions");
var Errors_module_css_1 = require("./Errors.module.css");
var Errors = function (props) {
    var errorMessages = react_redux_1.useSelector(function (state) { return state.errorMessages; });
    var messages = react_redux_1.useSelector(function (state) { return state.messages; });
    var dispatch = react_redux_1.useDispatch();
    var errorMessageAlerts = errorMessages.map(function (errorMessage, index) { return (<div key={index} className="alert alert-danger" role="alert" onClick={function () {
        dispatch(actions_1.clearErrors());
    }}>
      {errorMessage}
    </div>); });
    var messageAlerts = messages.map(function (message, index) { return (<div key={index} className="alert alert-primary" role="alert" onClick={function () {
        dispatch(actions_1.clearMessages());
    }}>
      {message}
    </div>); });
    var isVisible = errorMessages.length + messages.length > 0 ? null : Errors_module_css_1.default.hidden;
    return (<div className={[Errors_module_css_1.default.ErrorContainer, isVisible].join(" ")}>
      {errorMessageAlerts}
      {messageAlerts}
    </div>);
};
exports.default = Errors;
