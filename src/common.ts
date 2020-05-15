import * as constants from "./constants";
import difference from "lodash/difference";
import isInteger from "lodash/isInteger";

export const symbols = "123456789ABCDEF0";

export const rowFromIndex: (index: number) => number = (index) =>
  Math.floor(index / constants.BOARD_WIDTH);
export const colFromIndex: (index: number) => number = (index) =>
  index % constants.BOARD_WIDTH;
export const blkFromIndex: (index: number) => number = (index) =>
  Math.floor(rowFromIndex(index) / constants.BOARD_ORDER) *
    constants.BOARD_ORDER +
  Math.floor(colFromIndex(index) / constants.BOARD_ORDER);

export const rowIndexToIndex: (row: number, index: number) => number = (
  row,
  index
) => row * constants.BOARD_WIDTH + index;
export const colIndexToIndex: (col: number, index: number) => number = (
  col,
  index
) => index * constants.BOARD_WIDTH + col;
export const blkIndexToIndex: (blk: number, index: number) => number = (
  blk,
  index
) =>
  Math.floor(blk / constants.BOARD_ORDER) * constants.BOARD_ORDER ** 3 +
  (blk % constants.BOARD_ORDER) * constants.BOARD_ORDER +
  Math.floor(index / constants.BOARD_ORDER) * constants.BOARD_WIDTH +
  (index % constants.BOARD_ORDER);

const grpIndices: (
  rule: (grp: number, index: number) => number,
  grp: number,
  excluding?: number[]
) => number[] = (rule, grp, excluding) => {
  let result: number[] = [];
  for (let index = 0; index < constants.BOARD_WIDTH; index++) {
    result.push(rule(grp, index));
  }
  if (excluding !== undefined) {
    if (!Array.isArray(excluding)) {
      excluding = [excluding];
    }
    result = result.filter((val) => excluding.indexOf(val) === -1);
  }
  return result;
};

export const rowIndices: (row: number, excluding?: number[]) => number[] = (
  row,
  excluding
) => grpIndices(rowIndexToIndex, row, excluding);
export const colIndices: (col: number, excluding?: number[]) => number[] = (
  col,
  excluding
) => grpIndices(colIndexToIndex, col, excluding);
export const blkIndices: (blk: number, excluding?: number[]) => number[] = (
  blk,
  excluding
) => grpIndices(blkIndexToIndex, blk, excluding);

const removeValuesFromGrp = (state, grp, values) => {
  for (let grpIndex of grp) {
    state.pencilMarks[grpIndex] = difference(
      state.pencilMarks[grpIndex],
      values
    );
  }
  return state;
};

export const removeValuesFromRow = (state, row, values, excluding) => {
  return removeValuesFromGrp(state, rowIndices(row, excluding), values);
};

export const removeValuesFromCol = (state, col, values, excluding) => {
  return removeValuesFromGrp(state, colIndices(col, excluding), values);
};

export const removeValuesFromBlk = (state, blk, values, excluding) => {
  return removeValuesFromGrp(state, blkIndices(blk, excluding), values);
};
