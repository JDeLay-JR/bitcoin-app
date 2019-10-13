import React, { Component } from "react";
import socket from "../../stream-connection";
import RainDrop from "../rain-drop/RainDrop";
import Details from "../details/Details";

class RainContainer extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      transactions: [],
      transactionCount: 0,
      blocks: [],
      blockCount: 0,
      mostValuedBlock: {},
      mostValuedTransaction: {},
      theme: "light"
    };
  }

  componentWillMount() {
    // Calculate window width
    this.setState({ date: new Date().toLocaleString() });
    // Wait for connection to be established
    socket.addEventListener("open", () => {
      console.log("Connected to Bitcoin Stream");
      // Subscrube to new transactions
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
      date,
      mostValuedBlock,
      mostValuedTransaction
    } = this.state;

    return (
      <div>
        <Details
          transactionCount={transactionCount}
          blockCount={blockCount}
          date={date}
          mostValuedBlock={mostValuedBlock}
          mostValuedTransaction={mostValuedTransaction}
        />
        <div id="rainContainer">
          {transactions.map(data => (
            <RainDrop
              key={data.x.hash}
              hash={data.x.hash}
              type="transaction"
              theme={theme}
            />
          ))}
          {blocks.map(data => (
            <RainDrop
              key={data.x.hash}
              hash={data.x.hash}
              type="block"
              theme={theme}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RainContainer;
