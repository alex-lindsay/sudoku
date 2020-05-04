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

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};

export const resetBoard = () => {
  return {
    type: actionTypes.RESET_BOARD,
  };
};

export const randomBoard = () => {
  console.log("randomBoard");
  return {
    type: actionTypes.RESET_BOARD,
  };
};

export const addPencilMarksAction = (slots) => {
  return {
    type: actionTypes.ADD_PENCIL_MARKS,
    slots,
  };
};

export const addPencilMarks = (slot) => {
  return (dispatch) => {
    if (slot === undefined) {
      dispatch(clearPencilMarks());
    }
    if (slot === undefined) {
      slot = 0;
    }

    setTimeout(() => {
      if (slot < 81) {
        dispatch(addPencilMarksAction([slot, slot + 1, slot + 2]));
        dispatch(addPencilMarks(slot + 3));
      }
    }, 500);
  };
};

export const clearPencilMarks = () => {
  return {
    type: actionTypes.CLEAR_PENCIL_MARKS,
  };
};
