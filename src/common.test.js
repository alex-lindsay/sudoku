import * as common from "./common";
import * as constants from "./constants";
import { initialState } from "./store/reducers";

describe("rowFromIndex", () => {
  it("converts proper indices to rows properly", () => {
    expect(common.rowFromIndex(0)).toEqual(0);
    expect(common.rowFromIndex(8)).toEqual(0);
    expect(common.rowFromIndex(9)).toEqual(1);
    expect(common.rowFromIndex(18)).toEqual(2);
    expect(common.rowFromIndex(80)).toEqual(8);
  });
});

describe("colFromIndex", () => {
  it("converts proper indices to cols properly", () => {
    expect(common.colFromIndex(0)).toEqual(0);
    expect(common.colFromIndex(8)).toEqual(8);
    expect(common.colFromIndex(9)).toEqual(0);
    expect(common.colFromIndex(18)).toEqual(0);
    expect(common.colFromIndex(80)).toEqual(8);
  });
});

describe("blkFromIndex", () => {
  it("converts proper indices to blks properly", () => {
    expect(common.blkFromIndex(0)).toEqual(0);
    expect(common.blkFromIndex(8)).toEqual(2);
    expect(common.blkFromIndex(9)).toEqual(0);
    expect(common.blkFromIndex(39)).toEqual(4);
    expect(common.blkFromIndex(80)).toEqual(8);
  });
});

describe("rowIndexToIndex", () => {
  it("converts proper row, index combo to slot index properly", () => {
    expect(common.rowIndexToIndex(0, 0)).toEqual(0);
    expect(common.rowIndexToIndex(0, 7)).toEqual(7);
    expect(common.rowIndexToIndex(4, 5)).toEqual(41);
    expect(common.rowIndexToIndex(7, 0)).toEqual(63);
    expect(common.rowIndexToIndex(8, 8)).toEqual(80);
  });
});

describe("colIndexToIndex", () => {
  it("converts proper col, index combo to slot index properly", () => {
    expect(common.colIndexToIndex(0, 0)).toEqual(0);
    expect(common.colIndexToIndex(0, 7)).toEqual(63);
    expect(common.colIndexToIndex(4, 5)).toEqual(49);
    expect(common.colIndexToIndex(7, 0)).toEqual(7);
    expect(common.colIndexToIndex(8, 8)).toEqual(80);
  });
});

describe("blkIndexToIndex", () => {
  it("converts proper blk, index combo to slot index properly", () => {
    expect(common.blkIndexToIndex(0, 0)).toEqual(0);
    expect(common.blkIndexToIndex(0, 7)).toEqual(19);
    expect(common.blkIndexToIndex(4, 5)).toEqual(41);
    expect(common.blkIndexToIndex(7, 0)).toEqual(57);
    expect(common.blkIndexToIndex(8, 8)).toEqual(80);
  });
});

describe("rowIndices", () => {
  it("converts proper row, exclude combo to slot index properly", () => {
    expect(common.rowIndices(0)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(common.rowIndices(0, [])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(common.rowIndices(0, [3])).toEqual([0, 1, 2, 4, 5, 6, 7, 8]);
    expect(common.rowIndices(0, [0, 1, 2, 3, 4, 5, 6, 7, 8])).toEqual([]);
    expect(common.rowIndices(0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([]);
    expect(common.rowIndices(3)).toEqual([27, 28, 29, 30, 31, 32, 33, 34, 35]);
    expect(common.rowIndices(8)).toEqual([72, 73, 74, 75, 76, 77, 78, 79, 80]);
  });
});

describe("colIndices", () => {
  it("converts proper col, exclude combo to slot index properly", () => {
    expect(common.colIndices(0)).toEqual([0, 9, 18, 27, 36, 45, 54, 63, 72]);
    expect(common.colIndices(0, [])).toEqual([
      0,
      9,
      18,
      27,
      36,
      45,
      54,
      63,
      72,
    ]);
    expect(common.colIndices(0, [27])).toEqual([0, 9, 18, 36, 45, 54, 63, 72]);
    expect(common.colIndices(0, [0, 9, 18, 27, 36, 45, 54, 63, 72])).toEqual(
      []
    );
    expect(
      common.colIndices(0, [0, 9, 18, 27, 36, 45, 54, 63, 72, 81])
    ).toEqual([]);
    expect(common.colIndices(3)).toEqual([3, 12, 21, 30, 39, 48, 57, 66, 75]);
    expect(common.colIndices(8)).toEqual([8, 17, 26, 35, 44, 53, 62, 71, 80]);
  });
});

describe("blkIndices", () => {
  it("converts proper blk, exclude combo to slot index properly", () => {
    expect(common.blkIndices(0)).toEqual([0, 1, 2, 9, 10, 11, 18, 19, 20]);
    expect(common.blkIndices(0, [])).toEqual([0, 1, 2, 9, 10, 11, 18, 19, 20]);
    expect(common.blkIndices(0, [11])).toEqual([0, 1, 2, 9, 10, 18, 19, 20]);
    expect(common.blkIndices(0, [0, 1, 2, 9, 10, 11, 18, 19, 20])).toEqual([]);
    expect(common.blkIndices(0, [0, 1, 2, 9, 10, 11, 18, 19, 20, 81])).toEqual(
      []
    );
    expect(common.blkIndices(3)).toEqual([27, 28, 29, 36, 37, 38, 45, 46, 47]);
    expect(common.blkIndices(8)).toEqual([60, 61, 62, 69, 70, 71, 78, 79, 80]);
  });
});

describe("removeValuesFromGrp", () => {
  let state;
  let newState;
  beforeEach(() => {
    state = initialState;
    state.pencilMarks.fill([1, 3, 5]);
  });

  describe("removeValuesFromRow", () => {
    it("removes requested pencilMarks frow a specified row properly", () => {
      newState = common.removeValuesFromRow(state, 0, []);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (
          index >= 0 * constants.BOARD_WIDTH &&
          index < 1 * constants.BOARD_WIDTH
        ) {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromRow(state, 0, [2, 3, 4, 5]);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (
          index >= 0 * constants.BOARD_WIDTH &&
          index < 1 * constants.BOARD_WIDTH
        ) {
          expect(newState.pencilMarks[index]).toEqual([1]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromRow(state, 5, [0, 1, 2, 3, 4, 5, 10]);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (
          index >= 5 * constants.BOARD_WIDTH &&
          index < 6 * constants.BOARD_WIDTH
        ) {
          expect(newState.pencilMarks[index]).toEqual([]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromRow(
        state,
        5,
        [0, 1, 2, 3, 4, 5, 10],
        [46, 47, 48]
      );
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (
          index >= 5 * constants.BOARD_WIDTH &&
          index < 6 * constants.BOARD_WIDTH &&
          [46, 47, 48].indexOf(index) == -1
        ) {
          expect(newState.pencilMarks[index]).toEqual([]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }
    });
  });

  describe("removeValuesFromCol", () => {
    it("removes requested pencilMarks frow a specified col properly", () => {
      newState = common.removeValuesFromCol(state, 0, []);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (index % constants.BOARD_WIDTH == 0) {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromCol(state, 0, [2, 3, 4, 5]);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (index % constants.BOARD_WIDTH == 0) {
          expect(newState.pencilMarks[index]).toEqual([1]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromCol(state, 5, [0, 1, 2, 3, 4, 5, 10]);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (index % constants.BOARD_WIDTH == 5) {
          expect(newState.pencilMarks[index]).toEqual([]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromCol(
        state,
        5,
        [0, 1, 2, 3, 4, 5, 10],
        [14, 23, 32]
      );
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if (
          index % constants.BOARD_WIDTH == 5 &&
          [14, 23, 32].indexOf(index) == -1
        ) {
          expect(newState.pencilMarks[index]).toEqual([]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }
    });
  });

  describe("removeValuesFromBlk", () => {
    it("removes requested pencilMarks frow a specified blk properly", () => {
      newState = common.removeValuesFromBlk(state, 0, []);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if ([0, 1, 2, 9, 10, 11, 18, 19, 20].indexOf(index) !== -1) {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromBlk(state, 0, [2, 3, 4, 5]);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if ([0, 1, 2, 9, 10, 11, 18, 19, 20].indexOf(index) !== -1) {
          expect(newState.pencilMarks[index]).toEqual([1]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromBlk(state, 5, [0, 1, 2, 3, 4, 5, 10]);
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if ([33, 34, 35, 42, 43, 44, 51, 52, 53].indexOf(index) !== -1) {
          expect(newState.pencilMarks[index]).toEqual([]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }

      newState = common.removeValuesFromBlk(
        state,
        5,
        [0, 1, 2, 3, 4, 5, 10],
        [33, 43, 53]
      );
      for (let index = 0; index < constants.BOARD_SLOTS; index++) {
        if ([34, 35, 42, 44, 51, 52].indexOf(index) !== -1) {
          expect(newState.pencilMarks[index]).toEqual([]);
        } else {
          expect(newState.pencilMarks[index]).toEqual(state.pencilMarks[index]);
        }
      }
    });
  });
});
