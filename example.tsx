/// <reference lib="dom" />
import React from "react";
import ReactDOM from "react-dom";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };

  return <div onClick={handleClick}>Hello</div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
