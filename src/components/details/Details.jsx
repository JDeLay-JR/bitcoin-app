import React from "react";
import "./Details.scss";

const Details = props => {
  const { transactionCount, blockCount, date } = props;
  return (
    <div className="card centered">
      <h1 style={{ textAlign: "center" }}>BTC Transactions</h1>
      <hr></hr>
      <h2>
        Transactions:
        <span className="transactionCount count">{transactionCount}</span>
      </h2>
      <h2>
        Blocks: <span className="blockCount count">{blockCount}</span>
      </h2>
      <p className="date">As of: {date}</p>
      <hr></hr>
      <div className="details">
        <div className="transaction">
          <p className="detail-headline">Most Valuable Transaction</p>
          <p>Time Generated:</p>
          <p>Value:</p>
          <p>Hash:</p>
        </div>
        <div className="block">
          <p className="detail-headline">Most Valuable Block</p>
          <p>Time Generated:</p>
          <p>Value:</p>
          <p>Hash:</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
