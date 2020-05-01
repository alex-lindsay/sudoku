import cloneDeep from "lodash/cloneDeep";

import * as actionTypes from "./actionTypes";
import * as constants from "../constants";

const initialState = {
  errorMessages: [],
  errorPositions: [],
  startingPosition: new Array(81).fill(null),
  guesses: new Array(81).fill(null),
  selectedSlot: null,
  clickMode: null,
  numberMode: null,
};

const validatePosition = (state) => {
  state.errorMessages = [];
  state.errorPositions = [];
  let rows = [];
  let cols = [];
  let blks = [];

  for (let index = 0; index < 81; index++) {
    let val =
      state.startingPosition[index] !== null
        ? state.startingPosition[index]
        : state.guesses[index];
    if (val !== null) {
      let row = Math.floor(index / 9);
      let col = index % 9;
      let blk = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      console.log({ index, val, row, col, blk });

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
        state.errorPositions.push(index);
        state.errorMessages.push(
          `${val} occurs more than once in row ${row + 1}`
        );
      } else {
        rows[row][val] = true;
      }

      if (cols[col][val]) {
        state.errorPositions.push(index);
        state.errorMessages.push(
          `${val} occurs more than once in column ${col + 1}`
        );
      } else {
        cols[col][val] = true;
      }

      if (blks[blk][val]) {
        state.errorPositions.push(index);
        state.errorMessages.push(
          `${val} occurs more than once in block ${blk + 1}`
        );
      } else {
        blks[blk][val] = true;
      }
    }
  }
  return state;
};

const setSelectedSlotAsStarter = (state) => {
  if (
    state.clickMode === constants.CLICKMODE_STARTERS &&
    state.numberMode !== null
  ) {
    if (state.startingPosition[state.selectedSlot] !== state.numberMode) {
      state.startingPosition[state.selectedSlot] = state.numberMode;
    } else {
      state.startingPosition[state.selectedSlot] = null;
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
  state = setSelectedSlotAsStarter(state);
  state = validatePosition(state);
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
  return initialState;
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
    default:
      return state;
  }
}
