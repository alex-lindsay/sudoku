import * as actionTypes from "./actionTypes";

export const toggleSelectedSlot = (selectedSlot) => {
  return {
    type: actionTypes.TOGGLE_SELECTED_SLOT,
    selectedSlot,
  };
};
