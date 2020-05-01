import cloneDeep from "lodash/cloneDeep";

import * as actionTypes from "./actionTypes";

const initialState = {
  startingPosition: new Array(81).fill([]),
  currentPosition: new Array(81).fill([]),
  selectedSlot: null,
  clickMode: null,
  numberMode: null,
};

const toggleSelectedSlotNewState = (selectedSlot, state) => {
  //   console.log({ at: "toggleSelectedSlotNewState", selectedSlot, state });
  if (state.selectedSlot === selectedSlot) {
    state.selectedSlot = null;
  } else {
    state.selectedSlot = selectedSlot;
  }
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

export default function (oldState = initialState, action) {
  let state = cloneDeep(oldState);
  switch (action.type) {
    case actionTypes.TOGGLE_SELECTED_SLOT:
      return toggleSelectedSlotNewState(action.selectedSlot, state);
    case actionTypes.SET_CLICK_MODE:
      return setClickModeNewState(action.clickMode, state);
    case actionTypes.SET_NUMBER_MODE:
      return setNumberModeNewState(action.numberMode, state);
    default:
      return state;
  }
}
