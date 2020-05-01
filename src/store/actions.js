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

export const addPencilMarksAction = (pencilMarks) => {
  return {
    type: actionTypes.ADD_PENCIL_MARKS,
    pencilMarks,
  };
};

export const addPencilMarks = (slot) => {
  return (dispatch) => {
    let pencilMarks = [];
    if (slot === undefined) {
      slot = 0;
    }
    console.log(slot);
    for (let index = 0; index < 3; index++) {
      pencilMarks.push({ slot, pencilMarks: [1, 3, 5] });
      slot++;
    }
    setTimeout(() => {
      dispatch(addPencilMarksAction(pencilMarks));
      if (slot < 81) {
        dispatch(addPencilMarks(slot));
      }
    }, 500);
  };
};

export const clearPencilMarks = () => {
  return {
    type: actionTypes.CLEAR_PENCIL_MARKS,
  };
};
