"use strict";
// import React from "react";
// import { render } from "@testing-library/react";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
Object.defineProperty(exports, "__esModule", { value: true });
// import App from "./App";
// import appReducer from "./store/reducers";
// it("renders App without crashing", () => {
//   const store = createStore(appReducer);
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   expect(getByTestId("app")).toBeInTheDocument();
// });
var common = require("./common");
var constants = require("./constants");
describe("rowFromIndex", function () {
    it("has proper input guards", function () {
        expect(common.rowFromIndex()).toBeUndefined();
        expect(common.rowFromIndex("test")).toBeUndefined();
        expect(common.rowFromIndex(-1)).toBeUndefined();
        expect(common.rowFromIndex(constants.BOARD_SLOTS)).toBeUndefined();
        expect(common.rowFromIndex(0.5)).toBeUndefined();
    });
    it("converts indices to rows properly", function () {
        expect(common.rowFromIndex(0)).toEqual(0);
        expect(common.rowFromIndex(8)).toEqual(0);
        expect(common.rowFromIndex(9)).toEqual(1);
        expect(common.rowFromIndex(18)).toEqual(2);
        expect(common.rowFromIndex(80)).toEqual(8);
    });
});
describe("colFromIndex", function () {
    it("has proper input guards", function () {
        expect(common.colFromIndex()).toBeUndefined();
        expect(common.colFromIndex("test")).toBeUndefined();
        expect(common.colFromIndex(-1)).toBeUndefined();
        expect(common.colFromIndex(constants.BOARD_SLOTS)).toBeUndefined();
        expect(common.colFromIndex(0.5)).toBeUndefined();
    });
    it("converts indices to cols properly", function () {
        expect(common.colFromIndex(0)).toEqual(0);
        expect(common.colFromIndex(8)).toEqual(8);
        expect(common.colFromIndex(9)).toEqual(0);
        expect(common.colFromIndex(18)).toEqual(0);
        expect(common.colFromIndex(80)).toEqual(8);
    });
});
