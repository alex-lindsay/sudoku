"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/actions");
var GameSlot_1 = require("../../components/GameSlot/GameSlot");
var GameBoard_module_css_1 = require("./GameBoard.module.css");
var Gameboard = function (props) {
    var startingPosition = react_redux_1.useSelector(function (state) { return state.startingPosition; });
    var guesses = react_redux_1.useSelector(function (state) { return state.guesses; });
    var pencilMarks = react_redux_1.useSelector(function (state) { return state.pencilMarks; });
    var selectedSlot = react_redux_1.useSelector(function (state) { return state.selectedSlot; });
    var checkingSlots = react_redux_1.useSelector(function (state) { return state.solverIsChecking; });
    // TODO add error positions
    var dispatch = react_redux_1.useDispatch();
    var gameSlots = startingPosition.map(function (startingSlot, index) {
        var isSelected = index === selectedSlot;
        var isChecking = checkingSlots[index] !== undefined;
        // console.log({ index, selectedSlot, isSelected });
        return (<GameSlot_1.default key={index} index={index} startingPosition={startingSlot} guess={guesses[index]} pencilMarks={pencilMarks[index]} selected={isSelected} isChecking={isChecking} toggleSelectedSlot={function () { return dispatch(actions_1.toggleSelectedSlot(index)); }}/>);
    });
    return (<div className={[GameBoard_module_css_1.default.GameBoard, "container-md"].join(" ")}>
      <div className={[
        GameBoard_module_css_1.default.GameGrid,
        "d-flex",
        "justify-content-center",
        "flex-wrap",
    ].join(" ")}>
        {gameSlots}
      </div>
    </div>);
};
exports.default = Gameboard;
