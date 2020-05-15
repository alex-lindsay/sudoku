"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("./actionTypes");
var constants = require("../constants");
exports.toggleSelectedSlot = function (selectedSlot) {
    return {
        type: actionTypes.TOGGLE_SELECTED_SLOT,
        selectedSlot: selectedSlot,
    };
};
exports.setClickMode = function (clickMode) {
    return {
        type: actionTypes.SET_CLICK_MODE,
        clickMode: clickMode,
    };
};
exports.setNumberMode = function (numberMode) {
    return {
        type: actionTypes.SET_NUMBER_MODE,
        numberMode: numberMode,
    };
};
exports.clearErrors = function () {
    return {
        type: actionTypes.CLEAR_ERRORS,
    };
};
exports.clearMessages = function () {
    return {
        type: actionTypes.CLEAR_MESSAGES,
    };
};
exports.resetBoard = function () {
    return {
        type: actionTypes.RESET_BOARD,
    };
};
exports.randomBoardAction = function () {
    return {
        type: actionTypes.RANDOM_BOARD,
    };
};
exports.randomBoard = function () {
    return {
        type: actionTypes.RANDOM_BOARD,
    };
};
exports.testBoard = function () {
    return {
        type: actionTypes.TEST_BOARD,
    };
};
exports.addingPencilMarks = function (val) {
    return {
        type: actionTypes.ADDING_PENCIL_MARKS,
        val: val,
    };
};
exports.addPencilMarksAction = function (slots) {
    return {
        type: actionTypes.ADD_PENCIL_MARKS,
        slots: slots,
    };
};
exports.addPencilMarks = function (slot) {
    return function (dispatch) {
        if (slot === undefined) {
            dispatch(exports.clearPencilMarks());
            dispatch(exports.addingPencilMarks(true));
            slot = 0;
        }
        setTimeout(function () {
            if (slot < constants.BOARD_SLOTS) {
                dispatch(exports.addPencilMarksAction([slot, slot + 1, slot + 2]));
                dispatch(exports.addPencilMarks(slot + 3));
            }
            else {
                dispatch(exports.addingPencilMarks(false));
            }
        }, constants.DELAY_PENCIL_MARKS);
    };
};
exports.clearPencilMarks = function () {
    return {
        type: actionTypes.CLEAR_PENCIL_MARKS,
    };
};
exports.solveBoardAction = function () {
    return {
        type: actionTypes.SOLVE_BOARD,
    };
};
exports.resetSolverAction = function () {
    return {
        type: actionTypes.RESET_SOLVER,
    };
};
exports.solveBoard = function () {
    return function (dispatch, getState) {
        var state = getState();
        if (state.currentStrategy === null) {
            if (!state.solverHasChangedGuesses) {
                dispatch(exports.addPencilMarks(0));
            }
            dispatch(exports.resetSolverAction());
        }
        if (state.errorMessages.length === 0 && !state.isSolved) {
            dispatch(exports.solveBoardAction());
            setTimeout(function () {
                dispatch(exports.solveBoard());
            }, constants.DELAY_SOLVE_STAGE);
        }
    };
};
