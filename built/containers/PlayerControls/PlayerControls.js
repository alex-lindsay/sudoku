"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var actions = require("../../store/actions");
var constants = require("../../constants");
var ClickModeInput_1 = require("../../components/ClickModeInput/ClickModeInput");
var NumberModeInput_1 = require("../../components/NumberModeInput/NumberModeInput");
var PlayerControlButton_1 = require("../../components/PlayerControlButton/PlayerControlButton");
var PlayerControls_module_css_1 = require("./PlayerControls.module.css");
var PlayerControls = function (props) {
    var numberModeButtons = Array(9)
        .fill("")
        .map(function (val, index) { return (<NumberModeInput_1.default key={index + 1} number={index + 1}/>); });
    return (<>
      <div className={[PlayerControls_module_css_1.default.PlayerControls, "container-fluid"].join(" ")}>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <ClickModeInput_1.default mode={constants.CLICKMODE_STARTERS} text="Starters"/>
          <ClickModeInput_1.default mode={constants.CLICKMODE_PENCILMARKS} text="Pencil Marks"/>
          <ClickModeInput_1.default mode={constants.CLICKMODE_GUESSES} text="Guesses"/>
        </div>
      </div>
      <div className={[
        PlayerControls_module_css_1.default.PlayerControls,
        "container-fluid",
        "justify-content-center",
        "d-flex",
        "flex-wrap",
    ].join(" ")}>
        {numberModeButtons}
      </div>
      <div className={[PlayerControls_module_css_1.default.PlayerControls, "container-fluid"].join(" ")}>
        <PlayerControlButton_1.default onClickAction={actions.resetBoard} text="Reset Board"/>
        <PlayerControlButton_1.default onClickAction={actions.randomBoard} text="Random Board"/>
        <PlayerControlButton_1.default onClickAction={actions.testBoard} text="Test Board"/>
        <PlayerControlButton_1.default onClickAction={actions.solveBoard} text="Solve Board"/>
        <PlayerControlButton_1.default onClickAction={actions.addPencilMarks} text="Add Pencil Marks"/>
        <PlayerControlButton_1.default onClickAction={actions.clearPencilMarks} text="Clear Pencil Marks"/>
      </div>
    </>);
};
exports.default = PlayerControls;
