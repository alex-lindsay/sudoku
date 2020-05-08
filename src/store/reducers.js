import cloneDeep from "lodash/cloneDeep";

import * as actionTypes from "./actionTypes";
import * as constants from "../constants";
import * as common from "../common";

const initialState = {
  errorMessages: [],
  errorPositions: [],
  startingPosition: new Array(constants.BOARD_SLOTS).fill(null),
  guesses: new Array(constants.BOARD_SLOTS).fill(null),
  pencilMarks: new Array(constants.BOARD_SLOTS).fill(null),
  selectedSlot: null,
  clickMode: null,
  numberMode: null,
  isSolved: false,
  buildingBoard: false,
};

const checkForSolved = (state) => {
  //TODO change this to compare all guesses or starting positions to the finished state
  //TODO make the finished state remote only so it can't be peeked at in the state
  let isSolved = true;
  for (let index = 0; index < constants.BOARD_SLOTS; index++) {
    if (
      state.startingPosition[index] === null &&
      state.guesses[index] === null
    ) {
      isSolved = false;
      break;
    }
  }
  state.isSolved = isSolved;
  // console.log("checkForSolved result", isSolved);
  return state;
};

const validatePosition = (state) => {
  let validation = isValidPosition(state);
  state.errorPositions = cloneDeep(validation.errorPositions);
  state.errorMessages = cloneDeep(validation.errorMessages);
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

const isValidPosition = (state) => {
  let result = {
    isValid: true,
    errorMessages: [],
    errorPositions: [],
  };
  let rows = [];
  let cols = [];
  let blks = [];

  for (let index = 0; index < constants.BOARD_SLOTS; index++) {
    let val =
      state.startingPosition[index] !== null
        ? state.startingPosition[index]
        : state.guesses[index];
    if (val !== null) {
      let row = Math.floor(index / constants.BOARD_WIDTH);
      let col = index % constants.BOARD_WIDTH;
      let blk =
        Math.floor(row / constants.BOARD_ORDER) * constants.BOARD_ORDER +
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
        result.errorMessages.push(
          `${val} occurs more than once in row ${row + 1}`
        );
        result.isValid = false;
      } else {
        rows[row][val] = true;
      }

      if (cols[col][val]) {
        result.errorPositions.push(index);
        result.errorMessages.push(
          `${val} occurs more than once in column ${col + 1}`
        );
        result.isValid = false;
      } else {
        cols[col][val] = true;
      }

      if (blks[blk][val]) {
        result.errorPositions.push(index);
        result.errorMessages.push(
          `${val} occurs more than once in block ${blk + 1}`
        );
        result.isValid = false;
      } else {
        blks[blk][val] = true;
      }
    }
  }
  return result;
};

const setSelectedSlotAsStarterAsNeeded = (state) => {
  if (
    state.clickMode === constants.CLICKMODE_STARTERS &&
    state.numberMode !== null &&
    state.guesses[state.selectedSlot] === null
  ) {
    if (state.startingPosition[state.selectedSlot] !== state.numberMode) {
      state.startingPosition[state.selectedSlot] = state.numberMode;
      state.pencilMarks[state.selectedSlot] = [];
    } else {
      state.startingPosition[state.selectedSlot] = null;
    }
  }
  return state;
};

const setSelectedSlotAsGuessAsNeeded = (state) => {
  if (
    state.clickMode === constants.CLICKMODE_GUESSES &&
    state.numberMode !== null &&
    state.startingPosition[state.selectedSlot] === null
  ) {
    state.pencilMarks[state.selectedSlot] = [];
    if (state.guesses[state.selectedSlot] !== state.numberMode) {
      state.guesses[state.selectedSlot] = state.numberMode;
    } else {
      state.guesses[state.selectedSlot] = null;
    }
  }
  return state;
};

const setSelectedSlotAsPencilMarkAsNeeded = (state) => {
  if (
    state.clickMode === constants.CLICKMODE_PENCILMARKS &&
    state.numberMode !== null &&
    state.startingPosition[state.selectedSlot] === null
  ) {
    state.guesses[state.selectedSlot] = null;
    if (state.pencilMarks[state.selectedSlot] === null) {
      state.pencilMarks[state.selectedSlot] = [];
    }
    if (
      state.pencilMarks[state.selectedSlot].indexOf(state.numberMode) === -1
    ) {
      state.pencilMarks[state.selectedSlot].push(state.numberMode);
    } else {
      state.pencilMarks[state.selectedSlot] = state.pencilMarks[
        state.selectedSlot
      ].filter((val) => val !== state.numberMode);
    }
  }
  return state;
};

const toggleSelectedSlotNewState = (selectedSlot, state) => {
  //   console.log({ at: "toggleSelectedSlotNewState", selectedSlot, state });
  if (state.selectedSlot === selectedSlot) {
    state.selectedSlot = null;
  } else {
    state.selectedSlot = selectedSlot;
  }
  state = setSelectedSlotAsStarterAsNeeded(state);
  state = setSelectedSlotAsGuessAsNeeded(state);
  state = setSelectedSlotAsPencilMarkAsNeeded(state);
  state = validatePosition(state);
  state = checkForSolved(state);
  return state;
};

const setClickModeNewState = (clickMode, state) => {
  state.clickMode = clickMode;
  return state;
};

const setNumberModeNewState = (numberMode, state) => {
  if (state.numberMode === numberMode) {
    state.numberMode = null;
  } else {
    state.numberMode = numberMode;
  }
  return state;
};

const clearErrors = (state) => {
  state.errorMessages = [];
  state.errorPositions = [];
  return state;
};

const resetBoard = () => {
  return cloneDeep(initialState);
};

const randomBoard = () => {
  // pick a position
  // pick a number
  // check to see if puzzle is still valid and solvable
  // if there are enough clues to solve it, unset the add clue flag else set the clue flag
};

const addPencilMarks = (state, action) => {
  if (action.slots === undefined) {
    return state;
  }
  for (let slot of action.slots) {
    if (state.startingPosition[slot] !== null || state.guesses[slot] !== null) {
      continue;
    }
    let row = common.rowFromIndex(slot);
    let col = common.colFromIndex(slot);
    let blk = common.blkFromIndex(slot);
    let allMarks = [];
    for (let i = 1; i <= constants.BOARD_WIDTH; i++) {
      allMarks.push(i);
    }
    let notMarks = []
      .concat(
        common
          .rowIndices(row, slot)
          .map((index) => state.startingPosition[index]),
        common.rowIndices(row, slot).map((index) => state.guesses[index]),
        common
          .colIndices(col, slot)
          .map((index) => state.startingPosition[index]),
        common.colIndices(col, slot).map((index) => state.guesses[index]),
        common
          .blkIndices(blk, slot)
          .map((index) => state.startingPosition[index]),
        common.blkIndices(blk, slot).map((index) => state.guesses[index])
      )
      .filter((val) => val !== null);
    // console.log({
    //   slot,
    //   rowIndices: common.rowIndices(row, slot),
    //   colIndices: common.colIndices(col, slot),
    //   blkIndices: common.blkIndices(blk, slot),
    //   notMarks,
    // });
    let marks = allMarks.filter((val) => notMarks.indexOf(val) === -1);

    state.pencilMarks[slot] = marks;
  }

  return state;
};

const clearPencilMarks = (state) => {
  state.pencilMarks = cloneDeep(initialState.pencilMarks);
  return state;
};

export default function (oldState = initialState, action) {
  let state = cloneDeep(oldState);
  switch (action.type) {
    case actionTypes.TOGGLE_SELECTED_SLOT:
      return toggleSelectedSlotNewState(action.selectedSlot, state);
    case actionTypes.SET_CLICK_MODE:
      return setClickModeNewState(action.clickMode, state);
    case actionTypes.SET_NUMBER_MODE:
      return setNumberModeNewState(action.numberMode, state);
    case actionTypes.CLEAR_ERRORS:
      return clearErrors(state);
    case actionTypes.RESET_BOARD:
      return resetBoard();
    case actionTypes.RANDOM_BOARD:
      return randomBoard();
    case actionTypes.ADD_PENCIL_MARKS:
      return addPencilMarks(state, action);
    case actionTypes.CLEAR_PENCIL_MARKS:
      return clearPencilMarks(state);
    default:
      return state;
  }
}
