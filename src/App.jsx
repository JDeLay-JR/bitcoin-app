import React from "react";
import socket from "./bitcoin/stream-connection";
import "./App.css";

const pingWebSocket = () => {
  socket.send(
    JSON.stringify({
      op: "ping"
    })
  );
};

const App = () => (
  <div className="App">
    <button onClick={() => pingWebSocket()}>Ping!</button>
  </div>
);

export default App;
