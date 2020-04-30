import React from "react";
import "./App.css";
import Gameboard from "./containers/Gameboard/Gameboard";
import PlayerControls from "./containers/PlayerControls/PlayerControls";

function App() {
  return (
    <div className="App container">
      <div className="row">
        <header className="App-header"></header>
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
