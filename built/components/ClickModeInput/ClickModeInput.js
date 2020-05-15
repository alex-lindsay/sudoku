"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/actions");
var ClickModeInput_module_css_1 = require("./ClickModeInput.module.css");
var ClickModeInput = function (props) {
    var clickMode = react_redux_1.useSelector(function (state) { return state.clickMode; });
    var dispatch = react_redux_1.useDispatch();
    return (<label className={[
        "btn",
        "btn-secondary",
        clickMode === props.mode ? "active" : null,
        clickMode === props.mode ? ClickModeInput_module_css_1.default.ClickModeInputActive : null,
    ].join(" ")}>
      <input type="radio" name="clickMode" id={props.mode} onChange={function () { return dispatch(actions_1.setClickMode(props.mode)); }}/>{" "}
      {props.text}
    </label>);
};
exports.default = ClickModeInput;
