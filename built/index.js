"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var redux_thunk_1 = require("redux-thunk");
var reducers_1 = require("./store/reducers");
var App_1 = require("./App");
var serviceWorker = require("./serviceWorker");
require("bootstrap/dist/css/bootstrap.css");
require("./index.css");
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
var store = redux_1.createStore(reducers_1.default, composeEnhancers(redux_1.applyMiddleware(redux_thunk_1.default)));
react_dom_1.default.render(<react_redux_1.Provider store={store}>
    <react_1.default.StrictMode>
      <App_1.default />
    </react_1.default.StrictMode>
  </react_redux_1.Provider>, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
