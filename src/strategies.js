import * as constants from "./constants";
import * as common from "./common";

const singleStrategy = (state) => {
  let index = state.currentStrategyStage;
  state.solverIsChecking = { [index]: true };
  state.messages = [
    `The solver is checking slot ${index + 1} for an Open Single.`,
  ];
  if (
    Array.isArray(state.pencilMarks) &&
    Array.isArray(state.pencilMarks[state.currentStrategyStage]) &&
    state.pencilMarks[state.currentStrategyStage].length === 1
  ) {
    state.guesses[state.currentStrategyStage] =
      state.pencilMarks[state.currentStrategyStage][0];
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
    case 2:
      type = "block";
      index = state.currentStrategyStage - 2 * constants.BOARD_WIDTH;
      checking = common.blkIndices(index);
      break;
  }
  state.messages = [
    `The solver is checking ${type} ${index + 1} for an Naked Pairs.`,
  ];
  state.solverIsChecking = {};
  for (let checkingIndex of checking) {
    state.solverIsChecking[checkingIndex] = true;
  }

  //TODO add logic for checking the selected items for Naked Pairs.
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
