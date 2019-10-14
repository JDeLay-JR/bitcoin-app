import React from "react";
import PropTypes from "prop-types";
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
    </div>
  );
};

Details.propTypes = {
  transactionCount: PropTypes.number.isRequired,
  blockCount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired
};

export default Details;
