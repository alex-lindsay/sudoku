import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import appReducer from "./store/reducers";

it("renders App without crashing", () => {
  const store = createStore(appReducer);
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByTestId("app")).toBeInTheDocument();
});
