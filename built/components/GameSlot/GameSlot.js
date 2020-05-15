"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("../../constants");
var react_1 = require("react");
var PencilMark_1 = require("../PencilMark/PencilMark");
var GameSlot_module_css_1 = require("./GameSlot.module.css");
var GameSlot = function (props) {
    var marginRight = props.index % constants.BOARD_WIDTH === 2 ||
        props.index % constants.BOARD_WIDTH === 5
        ? GameSlot_module_css_1.default.marginRight
        : null;
    var marginBottom = Math.floor(props.index / constants.BOARD_WIDTH) === 2 ||
        Math.floor(props.index / constants.BOARD_WIDTH) === 5
        ? GameSlot_module_css_1.default.marginBottom
        : null;
    var selected = props.selected ? GameSlot_module_css_1.default.selected : null;
    var checking = props.isChecking ? GameSlot_module_css_1.default.checking : null;
    var pencilMarkItems = props.pencilMarks && !props.guess
        ? props.pencilMarks.map(function (mark) { return <PencilMark_1.default key={mark} number={mark}/>; })
        : null;
    return (<div className={[
        GameSlot_module_css_1.default.GameSlot,
        marginRight,
        marginBottom,
        selected,
        checking,
    ].join(" ")} onClick={props.toggleSelectedSlot}>
      <div className={GameSlot_module_css_1.default.startingPosition}>{props.startingPosition}</div>
      <div className={GameSlot_module_css_1.default.guess}>{props.guess}</div>
      <div className={GameSlot_module_css_1.default.pencilMarks}>{pencilMarkItems}</div>
    </div>);
};
exports.default = GameSlot;
