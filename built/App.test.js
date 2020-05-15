"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var App_1 = require("./App");
var reducers_1 = require("./store/reducers");
it("renders App without crashing", function () {
    var store = redux_1.createStore(reducers_1.default);
    var getByTestId = react_2.render(<react_redux_1.Provider store={store}>
      <App_1.default />
    </react_redux_1.Provider>).getByTestId;
    expect(getByTestId("app")).toBeInTheDocument();
});
