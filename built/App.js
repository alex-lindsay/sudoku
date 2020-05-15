"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Errors_1 = require("./containers/Errors/Errors");
var GameBoard_1 = require("./containers/GameBoard/GameBoard");
var PlayerControls_1 = require("./containers/PlayerControls/PlayerControls");
require("./App.css");
function App() {
    return (<div className="App container" data-testid="app">
      <div className="row">
        <header className="App-header">
          <h1>Sudoku Builder/Solver</h1>
          <Errors_1.default />
        </header>
      </div>
      <div className="row">
        <div className="col-8">
          <GameBoard_1.default />
        </div>
        <div className="col-4">
          <PlayerControls_1.default />
        </div>
      </div>
    </div>);
}
exports.default = App;
