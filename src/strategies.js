import * as constants from "./constants";

const singleStrategy = (state) => {
  if (state.pencilMarks[state.currentStrategyStage].length === 1) {
    state.guesses[state.currentStrategyStage] =
      state.pencilMarks[state.currentStrategyStage][0];
  }
  return state;
};

const strategies = [
  { title: "Singles", stages: constants.BOARD_SLOTS, fn: singleStrategy },
];

export default strategies;
