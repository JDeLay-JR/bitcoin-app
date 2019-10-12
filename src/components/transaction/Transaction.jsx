import React, { Component } from "react";
import SmallCard from "../cards/SmallCard";
import "./Transaction.scss";
import socket from "../../stream-connection";

class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      count: 0
    };
  }

  componentWillMount() {
    // Wait for connection to be established
    socket.addEventListener("open", () => {
      console.log("Connected to Bitcoin stream");
      socket.send(
        JSON.stringify({
          op: "unconfirmed_sub"
        })
      );
    });
  }

  componentDidMount() {
    socket.onmessage = evt => {
      this.setState(prevState => ({
        transactions: [JSON.parse(evt.data), ...prevState.transactions],
        count: prevState.count + 1
      }));
    };
  }

  render() {
    const { transactions, count } = this.state;
    return (
      <>
        <h1>{count}</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {transactions.map(data => (
            <div key={data.x.hash} className="trans"></div>
          ))}
        </div>
      </>
    );
  }
}

export default Transaction;
