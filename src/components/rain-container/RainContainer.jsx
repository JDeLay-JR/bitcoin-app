import React, { Component } from "react";
import socket from "../../stream-connection";
import RainDrop from "../rain-drop/RainDrop";
import Details from "../details/Details";

import "./RainContainer.scss";

class RainContainer extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      transactions: [],
      transactionCount: 0,
      blocks: [],
      blockCount: 0,
      theme: "light",
      windowWidth: 350
    };
  }

  componentWillMount() {
    // Calculate window width
    this.setState({ date: new Date().toLocaleString() });
    // Wait for connection to be established
    socket.addEventListener("open", () => {
      console.log("Connected to Bitcoin Stream");
      // Subscribe to new transactions
      socket.send(
        JSON.stringify({
          op: "unconfirmed_sub"
        })
      );
      // Subscribe to new blocks
      socket.send(
        JSON.stringify({
          op: "blocks_sub"
        })
      );
    });
  }

  componentDidMount() {
    socket.onmessage = evt => {
      const STREAM_DATA = JSON.parse(evt.data);
      if (STREAM_DATA.op === "block") {
        this.setState(prevState => ({
          blocks: [STREAM_DATA, ...prevState.blocks],
          blockCount: prevState.blockCount + 1
        }));
      } else {
        this.setState(prevState => ({
          transactions: [STREAM_DATA, ...prevState.transactions],
          transactionCount: prevState.transactionCount + 1
        }));
      }
    };
    this.getWindowWidth();
    window.addEventListener("resize", this.getWindowWidth());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWindowWidth);
  }

  getWindowWidth() {
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  toggleTheme() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.state.theme === "light"
      ? this.setState({ theme: "dark" })
      : this.setState({ theme: "light" });
  }

  render() {
    const {
      transactions,
      transactionCount,
      blocks,
      blockCount,
      theme,
      windowWidth,
      date
    } = this.state;

    return (
      <div className="rain-container">
        <Details
          transactionCount={transactionCount}
          blockCount={blockCount}
          date={date}
        />
        <div id="rainContainer">
          {transactions.map(data => (
            <RainDrop
              key={data.x.hash}
              id={data.x.hash}
              hash={data.x.hash}
              type="transaction"
              theme={theme}
              width={windowWidth}
            />
          ))}
          {blocks.map(data => (
            <RainDrop
              key={data.x.hash}
              id={data.x.hash}
              hash={data.x.hash}
              type="block"
              theme={theme}
              width={windowWidth}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RainContainer;
