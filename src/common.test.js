import * as common from "./common";
import * as constants from "./constants";

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
    expect(common.blkIndexToIndex(7, 0)).toEqual(67);
    expect(common.blkIndexToIndex(8, 8)).toEqual(80);
  });
});
