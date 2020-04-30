import cloneDeep from "lodash/cloneDeep";

import * as actionTypes from "./actionTypes";

const initialState = {
  startingPosition: new Array(81).fill([]),
  currentPosition: new Array(81).fill([]),
  selectedSlot: null,
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

export default function (oldState = initialState, action) {
  let state = cloneDeep(oldState);
  switch (action.type) {
    case actionTypes.TOGGLE_SELECTED_SLOT:
      return toggleSelectedSlotNewState(action.selectedSlot, state);
    default:
      return state;
  }
}
