import * as constants from "./constants";
import * as common from "./common";
import isEqual from "lodash/isEqual";
import difference from "lodash/difference";

const singleStrategy = (state) => {
  let index = state.currentStrategyStage;
  state.solverIsChecking = { [index]: true };
  state.messages = [
    `The solver is checking slot ${index + 1} for an Open Single.`,
  ];
  // If there is only one pencil mark for the square
  if (
    Array.isArray(state.pencilMarks) &&
    Array.isArray(state.pencilMarks[index]) &&
    state.pencilMarks[index].length === 1
  ) {
    // mark it as a guess
    state.guesses[index] = state.pencilMarks[index][0];
    // remove it as a pencil mark from the row, col, and blk
    state = common.removeValuesFromRow(
      state,
      common.rowFromIndex(index),
      [state.guesses[index]],
      index
    );
    state = common.removeValuesFromCol(
      state,
      common.colFromIndex(index),
      [state.guesses[index]],
      index
    );
    state = common.removeValuesFromBlk(
      state,
      common.blkFromIndex(index),
      [state.guesses[index]],
      index
    );

    state.solverHasChangedGuesses = true;
  }
  return state;
};

const nakedPairsStrategy = (state) => {
  let type = null;
  let index = null;
  let checking = [];
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
    `The solver is checking ${type} ${index + 1} for a Naked Pair.`,
  ];
  state.solverIsChecking = {};
  for (let checkingIndex of checking) {
    state.solverIsChecking[checkingIndex] = true;
  }

  //TODO add logic for checking the selected items for Naked Pairs.
  for (let index1 = 0; index1 < checking.length - 1; index1++) {
    console.log({
      index1,
      checking_index1: checking[index1],
      pencilMarks1: state.pencilMarks[checking[index1]],
    });
    if (state.pencilMarks[checking[index1]].length !== 2) {
      continue;
    }
    for (let index2 = index1 + 1; index2 < checking.length; index2++) {
      console.log({
        index1,
        index2,
        checking_index1: checking[index1],
        checking_index2: checking[index2],
        pencilMarks1: state.pencilMarks[checking[index1]],
        pencilMarks2: state.pencilMarks[checking[index2]],
      });
      if (state.pencilMarks[checking[index2]].length !== 2) {
        continue;
      }
      if (
        isEqual(
          state.pencilMarks[checking[index1]],
          state.pencilMarks[checking[index2]]
        )
      ) {
        for (let pencilMarkIndex of checking) {
          if (
            pencilMarkIndex !== checking[index1] &&
            pencilMarkIndex !== checking[index2]
          )
            state.pencilMarks[pencilMarkIndex] = difference(
              state.pencilMarks[pencilMarkIndex],
              state.pencilMarks[checking[index1]]
            );
          state.solverHasChangedGuesses = true;
        }
      }
    }
  }

  return state;
};

const strategies = [
  { title: "Singles", stages: constants.BOARD_SLOTS, fn: singleStrategy },
  {
    title: "Naked Pairs",
    stages: constants.BOARD_WIDTH * 3,
    fn: nakedPairsStrategy,
  },
];

export default strategies;
