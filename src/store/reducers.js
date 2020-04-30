import * as actionTypes from "./actionTypes";

const initialState = {
  startingPosition: new Array(81).fill([]),
  currentPosition: new Array(81).fill([]),
  selectedSlot: null,
};

export default function (state = initialState, action) {
  return state;
}
