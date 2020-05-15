"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var PlayerControlButton_module_css_1 = require("./PlayerControlButton.module.css");
var PlayerControlButton = function (props) {
    var dispatch = react_redux_1.useDispatch();
    return (<button type="button" className={["btn-lg", "btn-secondary", PlayerControlButton_module_css_1.default.PlayerControlButton].join(" ")} disabled={props.disabled} onClick={function () { return dispatch(props.onClickAction()); }}>
      {props.text}
    </button>);
};
exports.default = PlayerControlButton;
