import React from "react";

import Errors from "./containers/Errors/Errors";
import Gameboard from "./containers/GameBoard/GameBoard";
import PlayerControls from "./containers/PlayerControls/PlayerControls";

import "./App.css";

function App() {
  return (
    <div className="App container" data-testid="app">
      <div className="row">
        <header className="App-header">
          <h1>Sudoku Builder/Solver</h1>
          <Errors />
        </header>
      </div>
      <div className="row">
        <div className="col-8">
          <Gameboard />
        </div>
        <div className="col-4">
          <PlayerControls />
        </div>
      </div>
    </div>
  );
}

export default App;
