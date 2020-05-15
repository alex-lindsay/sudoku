"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cloneDeep_1 = require("lodash/cloneDeep");
var actionTypes = require("./actionTypes");
var constants = require("../constants");
var common = require("../common");
var strategies_1 = require("../strategies");
var testBoards_1 = require("../data/testBoards");
var initialState = {
    errorMessages: [],
    errorPositions: [],
    isAddingPencilMarks: false,
    startingPosition: new Array(constants.BOARD_SLOTS).fill(null),
    guesses: new Array(constants.BOARD_SLOTS).fill(null),
    pencilMarks: new Array(constants.BOARD_SLOTS).fill(null),
    selectedSlot: null,
    clickMode: null,
    numberMode: null,
    isSolving: false,
    isSolved: false,
    solverHasChangedGuesses: false,
    solverIsChecking: {},
    buildingBoard: false,
    currentStrategy: null,
    currentStrategyStage: null,
    messages: [],
};
var checkForSolved = function (state) {
    //TODO change this to compare all guesses or starting positions to the finished state
    //TODO make the finished state remote only so it can't be peeked at in the state
    var isSolved = true;
    for (var index = 0; index < constants.BOARD_SLOTS; index++) {
        if (state.startingPosition[index] === null &&
            state.guesses[index] === null) {
            isSolved = false;
            break;
        }
    }
    state.isSolved = isSolved;
    // console.log("checkForSolved result", isSolved);
    return state;
};
var validatePosition = function (state) {
    var validation = isValidPosition(state);
    state.errorPositions = cloneDeep_1.default(validation.errorPositions);
    state.errorMessages = cloneDeep_1.default(validation.errorMessages);
    // state.errorMessages = [];
    // state.errorPositions = [];
    // let rows = [];
    // let cols = [];
    // let blks = [];
    // for (let index = 0; index < constants.BOARD_SLOTS; index++) {
    //   let val =
    //     state.startingPosition[index] !== null
    //       ? state.startingPosition[index]
    //       : state.guesses[index];
    //   if (val !== null) {
    //     let row = Math.floor(index / constants.BOARD_WIDTH);
    //     let col = index % constants.BOARD_WIDTH;
    //     let blk = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    //     // console.log({ index, val, row, col, blk });
    //     if (rows[row] === undefined) {
    //       rows[row] = [];
    //     }
    //     if (cols[col] === undefined) {
    //       cols[col] = [];
    //     }
    //     if (blks[blk] === undefined) {
    //       blks[blk] = [];
    //     }
    //     if (rows[row][val] === true) {
    //       state.errorPositions.push(index);
    //       state.errorMessages.push(
    //         `${val} occurs more than once in row ${row + 1}`
    //       );
    //     } else {
    //       rows[row][val] = true;
    //     }
    //     if (cols[col][val]) {
    //       state.errorPositions.push(index);
    //       state.errorMessages.push(
    //         `${val} occurs more than once in column ${col + 1}`
    //       );
    //     } else {
    //       cols[col][val] = true;
    //     }
    //     if (blks[blk][val]) {
    //       state.errorPositions.push(index);
    //       state.errorMessages.push(
    //         `${val} occurs more than once in block ${blk + 1}`
    //       );
    //     } else {
    //       blks[blk][val] = true;
    //     }
    //   }
    // }
    if (state.errorPositions.length > 0) {
        state.selectedSlot = null;
    }
    return state;
};
var isValidPosition = function (state) {
    var result = {
        isValid: true,
        errorMessages: [],
        errorPositions: [],
    };
    var rows = [];
    var cols = [];
    var blks = [];
    for (var index = 0; index < constants.BOARD_SLOTS; index++) {
        var val = state.startingPosition[index] !== null
            ? state.startingPosition[index]
            : state.guesses[index];
        if (val !== null) {
            var row = Math.floor(index / constants.BOARD_WIDTH);
            var col = index % constants.BOARD_WIDTH;
            var blk = Math.floor(row / constants.BOARD_ORDER) * constants.BOARD_ORDER +
                Math.floor(col / constants.BOARD_ORDER);
            // console.log({ index, val, row, col, blk });
            if (rows[row] === undefined) {
                rows[row] = [];
            }
            if (cols[col] === undefined) {
                cols[col] = [];
            }
            if (blks[blk] === undefined) {
                blks[blk] = [];
            }
            if (rows[row][val] === true) {
                result.errorPositions.push(index);
                result.errorMessages.push(val + " occurs more than once in row " + (row + 1));
                result.isValid = false;
            }
            else {
                rows[row][val] = true;
            }
            if (cols[col][val]) {
                result.errorPositions.push(index);
                result.errorMessages.push(val + " occurs more than once in column " + (col + 1));
                result.isValid = false;
            }
            else {
                cols[col][val] = true;
            }
            if (blks[blk][val]) {
                result.errorPositions.push(index);
                result.errorMessages.push(val + " occurs more than once in block " + (blk + 1));
                result.isValid = false;
            }
            else {
                blks[blk][val] = true;
            }
        }
    }
    return result;
};
var setSelectedSlotAsStarterAsNeeded = function (state) {
    if (state.clickMode === constants.CLICKMODE_STARTERS &&
        state.numberMode !== null &&
        state.guesses[state.selectedSlot] === null) {
        if (state.startingPosition[state.selectedSlot] !== state.numberMode) {
            state.startingPosition[state.selectedSlot] = state.numberMode;
            state.pencilMarks[state.selectedSlot] = [];
        }
        else {
            state.startingPosition[state.selectedSlot] = null;
        }
    }
    return state;
};
var setSelectedSlotAsGuessAsNeeded = function (state) {
    if (state.clickMode === constants.CLICKMODE_GUESSES &&
        state.numberMode !== null &&
        state.startingPosition[state.selectedSlot] === null) {
        state.pencilMarks[state.selectedSlot] = [];
        if (state.guesses[state.selectedSlot] !== state.numberMode) {
            state.guesses[state.selectedSlot] = state.numberMode;
        }
        else {
            state.guesses[state.selectedSlot] = null;
        }
    }
    return state;
};
var setSelectedSlotAsPencilMarkAsNeeded = function (state) {
    if (state.clickMode === constants.CLICKMODE_PENCILMARKS &&
        state.numberMode !== null &&
        state.startingPosition[state.selectedSlot] === null) {
        state.guesses[state.selectedSlot] = null;
        if (state.pencilMarks[state.selectedSlot] === null) {
            state.pencilMarks[state.selectedSlot] = [];
        }
        if (state.pencilMarks[state.selectedSlot].indexOf(state.numberMode) === -1) {
            state.pencilMarks[state.selectedSlot].push(state.numberMode);
        }
        else {
            state.pencilMarks[state.selectedSlot] = state.pencilMarks[state.selectedSlot].filter(function (val) { return val !== state.numberMode; });
        }
    }
    return state;
};
var toggleSelectedSlotNewState = function (selectedSlot, state) {
    //   console.log({ at: "toggleSelectedSlotNewState", selectedSlot, state });
    if (state.selectedSlot === selectedSlot) {
        state.selectedSlot = null;
    }
    else {
        state.selectedSlot = selectedSlot;
    }
    state = setSelectedSlotAsStarterAsNeeded(state);
    state = setSelectedSlotAsGuessAsNeeded(state);
    state = setSelectedSlotAsPencilMarkAsNeeded(state);
    state = validatePosition(state);
    state = checkForSolved(state);
    return state;
};
var setClickModeNewState = function (clickMode, state) {
    state.clickMode = clickMode;
    return state;
};
var setNumberModeNewState = function (numberMode, state) {
    if (state.numberMode === numberMode) {
        state.numberMode = null;
    }
    else {
        state.numberMode = numberMode;
    }
    return state;
};
var clearErrors = function (state) {
    state.errorMessages = [];
    state.errorPositions = [];
    return state;
};
var clearMessages = function (state) {
    state.messages = [];
    return state;
};
var resetBoard = function () {
    return cloneDeep_1.default(initialState);
};
var randomBoard = function () {
    //TODO - develop a smarter way of building a board
    var numberOfClues = Math.floor(17 + 10 * Math.random());
    var state = cloneDeep_1.default(initialState);
    var slots = [];
    // console.log({ constants });
    for (var index = 0; index < constants.BOARD_SLOTS; index++) {
        slots.push(index);
    }
    var numbers = [];
    for (var index = 0; index < constants.BOARD_WIDTH; index++) {
        numbers.push(index + 1);
    }
    for (var clueNumber = 1; clueNumber < numberOfClues; clueNumber++) {
        var tempState = cloneDeep_1.default(state);
        var tempNumbers = cloneDeep_1.default(numbers);
        var position = Math.floor(Math.random() * slots.length);
        while (tempNumbers.length > 0) {
            var numberPosition = Math.floor(Math.random() * constants.BOARD_WIDTH);
            var number = numbers[numberPosition];
            tempState.startingPosition[position] = number;
            // console.log({
            //   slots,
            //   clueNumber,
            //   position,
            //   number,
            //   valid: isValidPosition(tempState),
            // });
            if (isValidPosition(tempState).isValid) {
                state = tempState;
                slots.splice(position, 1);
                break;
            }
            else {
                tempNumbers.splice(numberPosition, 1);
            }
        }
        if (tempNumbers.length === 0) {
            state.errorMessages.push("Unable to add any more clues to the grid.");
        }
    }
    return state;
};
var testBoard = function (state) {
    var numberMode = state.numberMode !== null ? state.numberMode : 1;
    var boardName = testBoards_1.boardNames[(numberMode - 1) % testBoards_1.boardNames.length];
    var startingPosition = testBoards_1.boards.get(boardName);
    console.log({
        numberMode: numberMode,
        boardNames: testBoards_1.boardNames,
        boardName: boardName,
        startingPosition: startingPosition,
    });
    state.startingPosition = cloneDeep_1.default(startingPosition);
    return state;
};
var addPencilMarks = function (state, action) {
    if (action.slots === undefined) {
        return state;
    }
    var _loop_1 = function (slot) {
        if (state.startingPosition[slot] !== null || state.guesses[slot] !== null) {
            return "continue";
        }
        var row = common.rowFromIndex(slot);
        var col = common.colFromIndex(slot);
        var blk = common.blkFromIndex(slot);
        var allMarks = [];
        for (var i = 1; i <= constants.BOARD_WIDTH; i++) {
            allMarks.push(i);
        }
        var notMarks = []
            .concat(common
            .rowIndices(row, slot)
            .map(function (index) { return state.startingPosition[index]; }), common.rowIndices(row, slot).map(function (index) { return state.guesses[index]; }), common
            .colIndices(col, slot)
            .map(function (index) { return state.startingPosition[index]; }), common.colIndices(col, slot).map(function (index) { return state.guesses[index]; }), common
            .blkIndices(blk, slot)
            .map(function (index) { return state.startingPosition[index]; }), common.blkIndices(blk, slot).map(function (index) { return state.guesses[index]; }))
            .filter(function (val) { return val !== null; });
        // console.log({
        //   slot,
        //   rowIndices: common.rowIndices(row, slot),
        //   colIndices: common.colIndices(col, slot),
        //   blkIndices: common.blkIndices(blk, slot),
        //   notMarks,
        // });
        var marks = allMarks.filter(function (val) { return notMarks.indexOf(val) === -1; });
        state.pencilMarks[slot] = marks;
    };
    for (var _i = 0, _a = action.slots; _i < _a.length; _i++) {
        var slot = _a[_i];
        _loop_1(slot);
    }
    return state;
};
var clearPencilMarks = function (state) {
    state.pencilMarks = cloneDeep_1.default(initialState.pencilMarks);
    return state;
};
var addingPencilMarks = function (state, action) {
    state.isAddingPencilMarks = action.val;
    return state;
};
var solveBoard = function (state) {
    if (state.isAddingPencilMarks) {
        return state;
    }
    if (!state.isSolved) {
        // If no strategy is yet set, choose the first strategy
        if (state.currentStrategy === null) {
            state.currentStrategy = 0;
            state.currentStrategyStage = null;
            state.solverHasChangedGuesses = false;
        }
        // If there is no stage set, choose the first stage,
        // otherwise move to the next stage.
        if (state.currentStrategyStage === null) {
            state.currentStrategyStage = 0;
        }
        else {
            state.currentStrategyStage += 1;
        }
        // If the stage had been advanced beyond the current strategy range,
        // advance to the next strategy and reset the stage
        if (state.currentStrategyStage >= strategies_1.default[state.currentStrategy].stages) {
            state.currentStrategyStage = 0;
            if (!state.solverHasChangedGuesses) {
                state.currentStrategy++;
            }
            else {
                state.currentStrategy = 0;
                state.solverHasChangedGuesses = false;
            }
        }
        if (strategies_1.default[state.currentStrategy] !== undefined) {
            state = strategies_1.default[state.currentStrategy].fn(state);
        }
        else {
            // check to see if the puzzle is solved.  if so give a message
            state = checkForSolved(state);
            if (state.isSolved) {
                state.errorMessages.push("THE PUZZLE HAS BEEN SOLVED!");
            }
            else {
                // if not, then check to see if the solver has updated things
                if (state.solverHasChangedGuesses) {
                    state.currentStrategyStage = null;
                    state.currentStrategy = null;
                }
                else {
                    state.errorMessages.push("This puzzle appears not to be solvable by normal strategies.");
                }
                // if so, then restart the strategies, if not show an error message
            }
        }
    }
    return state;
};
var resetSolver = function (state) {
    state.solverHasChangedGuesses = false;
    return state;
};
function default_1(oldState, action) {
    if (oldState === void 0) { oldState = initialState; }
    var state = cloneDeep_1.default(oldState);
    switch (action.type) {
        case actionTypes.TOGGLE_SELECTED_SLOT:
            return toggleSelectedSlotNewState(action.selectedSlot, state);
        case actionTypes.SET_CLICK_MODE:
            return setClickModeNewState(action.clickMode, state);
        case actionTypes.SET_NUMBER_MODE:
            return setNumberModeNewState(action.numberMode, state);
        case actionTypes.CLEAR_ERRORS:
            return clearErrors(state);
        case actionTypes.CLEAR_MESSAGES:
            return clearMessages(state);
        case actionTypes.RESET_BOARD:
            return resetBoard();
        case actionTypes.TEST_BOARD:
            return testBoard(state);
        case actionTypes.RANDOM_BOARD:
            return randomBoard();
        case actionTypes.ADD_PENCIL_MARKS:
            return addPencilMarks(state, action);
        case actionTypes.ADDING_PENCIL_MARKS:
            return addingPencilMarks(state, action);
        case actionTypes.CLEAR_PENCIL_MARKS:
            return clearPencilMarks(state);
        case actionTypes.SOLVE_BOARD:
            return solveBoard(state);
        case actionTypes.RESET_SOLVER:
            return resetSolver(state);
        default:
            return state;
    }
}
exports.default = default_1;
