import React from "react";
import "./App.css";

import "@ui5/webcomponents/dist/Panel";

function App() {
  return (
    <div className="app">
      <section className="app-content">
        <div className="dropdown-wrapper">
          <ui5-panel header-text="Maze creation">
            <p>Test</p>
          </ui5-panel>
        </div>
        <div className="dropdown-wrapper">
          <ui5-panel header-text="Solve the Maze Manually" collapsed={true}>
            <p>Test</p>
          </ui5-panel>
        </div>
        <div className="dropdown-wrapper">
          <ui5-panel
            header-text="Algorithmically Solve the Maze"
            collapsed={true}
          >
            <p>Test</p>
          </ui5-panel>
        </div>
      </section>
    </div>
  );
}

export default App;
