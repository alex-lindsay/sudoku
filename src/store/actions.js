import * as actionTypes from "./actionTypes";

export const toggleSelectedSlot = (selectedSlot) => {
  return {
    type: actionTypes.TOGGLE_SELECTED_SLOT,
    selectedSlot,
  };
};

export const setClickMode = (clickMode) => {
  return {
    type: actionTypes.SET_CLICK_MODE,
    clickMode,
  };
};

export const setNumberMode = (numberMode) => {
  return {
    type: actionTypes.SET_NUMBER_MODE,
    numberMode,
  };
};
