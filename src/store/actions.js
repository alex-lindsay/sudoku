import * as actionTypes from "./actionTypes";
import * as constants from "../constants";

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

export const clearMessages = () => {
  return {
    type: actionTypes.CLEAR_MESSAGES,
  };
};

export const resetBoard = () => {
  return {
    type: actionTypes.RESET_BOARD,
  };
};

export const randomBoardAction = () => {
  return {
    type: actionTypes.RANDOM_BOARD,
  };
};

export const randomBoard = () => {
  return {
    type: actionTypes.RANDOM_BOARD,
  };
};

export const testBoard = () => {
  return {
    type: actionTypes.TEST_BOARD,
  };
};

export const addingPencilMarks = (val) => {
  return {
    type: actionTypes.ADDING_PENCIL_MARKS,
    val,
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
      dispatch(addingPencilMarks(true));
      slot = 0;
    }

    setTimeout(() => {
      if (slot < constants.BOARD_SLOTS) {
        dispatch(addPencilMarksAction([slot, slot + 1, slot + 2]));
        dispatch(addPencilMarks(slot + 3));
      } else {
        dispatch(addingPencilMarks(false));
      }
    }, constants.DELAY_PENCIL_MARKS);
  };
};

export const clearPencilMarks = () => {
  return {
    type: actionTypes.CLEAR_PENCIL_MARKS,
  };
};

export const solveBoardAction = () => {
  return {
    type: actionTypes.SOLVE_BOARD,
  };
};

export const resetSolverAction = () => {
  return {
    type: actionTypes.RESET_SOLVER,
  };
};

export const solveBoard = () => {
  return (dispatch, getState) => {
    let state = getState();
    if (state.currentStrategy === null) {
      if (!state.solverHasChangedGuesses) {
        dispatch(addPencilMarks(0));
      }
      dispatch(resetSolverAction());
    }
    if (state.errorMessages.length === 0 && !state.isSolved) {
      dispatch(solveBoardAction());
      setTimeout(() => {
        dispatch(solveBoard());
      }, constants.DELAY_SOLVE_STAGE);
    }
  };
};
