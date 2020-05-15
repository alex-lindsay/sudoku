"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("./constants");
var difference_1 = require("lodash/difference");
var isInteger_1 = require("lodash/isInteger");
exports.symbols = "123456789ABCDEF0";
exports.rowFromIndex = function (index) {
    return index === undefined ||
        !isInteger_1.default(index) ||
        index < 0 ||
        index >= constants.BOARD_SLOTS
        ? undefined
        : Math.floor(index / constants.BOARD_WIDTH);
};
exports.colFromIndex = function (index) {
    return index === undefined ||
        !isInteger_1.default(index) ||
        index < 0 ||
        index >= constants.BOARD_SLOTS
        ? undefined
        : index % constants.BOARD_WIDTH;
};
exports.blkFromIndex = function (index) {
    return Math.floor(exports.rowFromIndex(index) / constants.BOARD_ORDER) *
        constants.BOARD_ORDER +
        Math.floor(exports.colFromIndex(index) / constants.BOARD_ORDER);
};
exports.rowIndexToIndex = function (row, index) {
    return row * constants.BOARD_WIDTH + index;
};
exports.colIndexToIndex = function (col, index) {
    return index * constants.BOARD_WIDTH + col;
};
exports.blkIndexToIndex = function (blk, index) {
    return Math.floor(blk / constants.BOARD_ORDER) * Math.pow(constants.BOARD_ORDER, 3) +
        (blk % constants.BOARD_ORDER) * constants.BOARD_ORDER +
        Math.floor(index / constants.BOARD_ORDER) * constants.BOARD_WIDTH +
        (index % constants.BOARD_ORDER);
};
exports.grpIndices = function (rule, grp, excluding) {
    var result = [];
    for (var index = 0; index < constants.BOARD_WIDTH; index++) {
        result.push(rule(grp, index));
    }
    if (excluding !== undefined) {
        if (!Array.isArray(excluding)) {
            excluding = [excluding];
        }
        result = result.filter(function (val) { return excluding.indexOf(val) === -1; });
    }
    return result;
};
exports.rowIndices = function (row, excluding) {
    return exports.grpIndices(exports.rowIndexToIndex, row, excluding);
};
exports.colIndices = function (col, excluding) {
    return exports.grpIndices(exports.colIndexToIndex, col, excluding);
};
exports.blkIndices = function (blk, excluding) {
    return exports.grpIndices(exports.blkIndexToIndex, blk, excluding);
};
exports.removeValuesFromGrp = function (state, grp, values) {
    for (var _i = 0, grp_1 = grp; _i < grp_1.length; _i++) {
        var grpIndex = grp_1[_i];
        state.pencilMarks[grpIndex] = difference_1.default(state.pencilMarks[grpIndex], values);
    }
    return state;
};
exports.removeValuesFromRow = function (state, row, values, excluding) {
    return exports.removeValuesFromGrp(state, exports.rowIndices(row, excluding), values);
};
exports.removeValuesFromCol = function (state, col, values, excluding) {
    return exports.removeValuesFromGrp(state, exports.colIndices(col, excluding), values);
};
exports.removeValuesFromBlk = function (state, blk, values, excluding) {
    return exports.removeValuesFromGrp(state, exports.blkIndices(blk, excluding), values);
};
