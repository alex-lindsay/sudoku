"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/actions");
var NumberModeInput_module_css_1 = require("./NumberModeInput.module.css");
var NumberModeInput = function (props) {
    var numberMode = react_redux_1.useSelector(function (state) { return state.numberMode; });
    var dispatch = react_redux_1.useDispatch();
    return (<button type="button" className={[
        "btn-lg",
        "btn-secondary",
        NumberModeInput_module_css_1.default.NumberModeInput,
        numberMode === props.number ? NumberModeInput_module_css_1.default.NumberModeInputActive : null,
        numberMode === props.number ? "active" : null,
    ].join(" ")} onClick={function () { return dispatch(actions_1.setNumberMode(props.number)); }}>
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
exports.default = NumberModeInput;
