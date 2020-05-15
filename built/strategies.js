"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("./constants");
var common = require("./common");
var isEqual_1 = require("lodash/isEqual");
var difference_1 = require("lodash/difference");
var singleStrategy = function (state) {
    var _a;
    var index = state.currentStrategyStage;
    //   while (
    //     index < constants.BOARD_SLOTS &&
    //     (!Array.isArray(state.pencilMarks) ||
    //       !Array.isArray(state.pencilMarks[index]) ||
    //       state.pencilMarks[index].length !== 1)
    //   ) {
    //     state.solverIsChecking = { [index]: true };
    //     index++;
    //   }
    state.solverIsChecking = (_a = {}, _a[index] = true, _a);
    state.messages = [
        "The solver is checking slot " + (index + 1) + " for an Open Single.",
    ];
    // If there is only one pencil mark for the square
    if (Array.isArray(state.pencilMarks) &&
        Array.isArray(state.pencilMarks[index]) &&
        state.pencilMarks[index].length === 1) {
        // mark it as a guess
        state.guesses[index] = state.pencilMarks[index][0];
        // remove it as a pencil mark from the row, col, and blk
        state = common.removeValuesFromRow(state, common.rowFromIndex(index), [state.guesses[index]], index);
        state = common.removeValuesFromCol(state, common.colFromIndex(index), [state.guesses[index]], index);
        state = common.removeValuesFromBlk(state, common.blkFromIndex(index), [state.guesses[index]], index);
        state.solverHasChangedGuesses = true;
    }
    return state;
};
var nakedPairsStrategy = function (state) {
    var type = null;
    var index = null;
    var checking = [];
    switch (Math.floor(state.currentStrategyStage / constants.BOARD_WIDTH)) {
        case 0:
            type = "row";
            index = state.currentStrategyStage;
            checking = common.rowIndices(index);
            break;
        case 1:
            type = "column";
            index = state.currentStrategyStage - constants.BOARD_WIDTH;
            checking = common.colIndices(index);
            break;
        default:
            type = "block";
            index = state.currentStrategyStage - 2 * constants.BOARD_WIDTH;
            checking = common.blkIndices(index);
            break;
    }
    state.messages = [
        "The solver is checking " + type + " " + (index + 1) + " for a Naked Pair.",
    ];
    state.solverIsChecking = {};
    for (var _i = 0, checking_1 = checking; _i < checking_1.length; _i++) {
        var checkingIndex = checking_1[_i];
        state.solverIsChecking[checkingIndex] = true;
    }
    for (var index1 = 0; index1 < checking.length - 1; index1++) {
        if (Array.isArray(state.pencilMarks[checking[index1]]) &&
            state.pencilMarks[checking[index1]].length !== 2) {
            continue;
        }
        for (var index2 = index1 + 1; index2 < checking.length; index2++) {
            if (Array.isArray(state.pencilMarks[checking[index2]]) &&
                state.pencilMarks[checking[index2]].length !== 2) {
                continue;
            }
            if (isEqual_1.default(state.pencilMarks[checking[index1]], state.pencilMarks[checking[index2]])) {
                for (var _a = 0, checking_2 = checking; _a < checking_2.length; _a++) {
                    var pencilMarkIndex = checking_2[_a];
                    if (pencilMarkIndex !== checking[index1] &&
                        pencilMarkIndex !== checking[index2])
                        state.pencilMarks[pencilMarkIndex] = difference_1.default(state.pencilMarks[pencilMarkIndex], state.pencilMarks[checking[index1]]);
                    state.solverHasChangedGuesses = true;
                }
            }
        }
    }
    return state;
};
//TODO This does not account for AB AC BC cycles
var nakedTriplesStrategy = function (state) {
    var type = null;
    var index = null;
    var checking = [];
    switch (Math.floor(state.currentStrategyStage / constants.BOARD_WIDTH)) {
        case 0:
            type = "row";
            index = state.currentStrategyStage;
            checking = common.rowIndices(index);
            break;
        case 1:
            type = "column";
            index = state.currentStrategyStage - constants.BOARD_WIDTH;
            checking = common.colIndices(index);
            break;
        default:
            type = "block";
            index = state.currentStrategyStage - 2 * constants.BOARD_WIDTH;
            checking = common.blkIndices(index);
            break;
    }
    state.messages = [
        "The solver is checking " + type + " " + (index + 1) + " for a Naked Triple.",
    ];
    state.solverIsChecking = {};
    for (var _i = 0, checking_3 = checking; _i < checking_3.length; _i++) {
        var checkingIndex = checking_3[_i];
        state.solverIsChecking[checkingIndex] = true;
    }
    for (var index1 = 0; index1 < checking.length; index1++) {
        var checking_index1 = checking[index1];
        var pencilMarks1 = state.pencilMarks[checking_index1];
        if (!Array.isArray(pencilMarks1) || pencilMarks1.length !== 3) {
            continue;
        }
        for (var index2 = 0; index2 < checking.length - 1; index2++) {
            var checking_index2 = checking[index2];
            var pencilMarks2 = state.pencilMarks[checking_index2];
            if (index2 === index1 ||
                !Array.isArray(pencilMarks2) ||
                pencilMarks2.length === 0) {
                continue;
            }
            if (difference_1.default(pencilMarks2, pencilMarks1).length !== 0) {
                continue;
            }
            for (var index3 = index2 + 1; index3 < checking.length; index3++) {
                var checking_index3 = checking[index3];
                var pencilMarks3 = state.pencilMarks[checking_index3];
                if (index3 === index1 ||
                    !Array.isArray(pencilMarks3) ||
                    pencilMarks3.length === 0) {
                    continue;
                }
                if (difference_1.default(pencilMarks3, pencilMarks1).length !== 0) {
                    continue;
                }
                else {
                    for (var _a = 0, checking_4 = checking; _a < checking_4.length; _a++) {
                        var pencilMarkIndex = checking_4[_a];
                        if (pencilMarkIndex !== checking_index1 &&
                            pencilMarkIndex !== checking_index2 &&
                            pencilMarkIndex !== checking_index3) {
                            state.pencilMarks[pencilMarkIndex] = difference_1.default(state.pencilMarks[pencilMarkIndex], pencilMarks1);
                            state.solverHasChangedGuesses = true;
                        }
                    }
                }
            }
        }
    }
    return state;
};
var nakedQuadsStrategy = function (state) {
    return state;
};
var strategies = [
    { title: "Singles", stages: constants.BOARD_SLOTS, fn: singleStrategy },
    {
        title: "Naked Pairs",
        stages: constants.BOARD_WIDTH * 3,
        fn: nakedPairsStrategy,
    },
    {
        title: "Naked Triples",
        stages: constants.BOARD_WIDTH * 3,
        fn: nakedTriplesStrategy,
    },
    {
        title: "Naked Quads",
        stages: constants.BOARD_WIDTH * 3,
        fn: nakedQuadsStrategy,
    },
];
exports.default = strategies;
