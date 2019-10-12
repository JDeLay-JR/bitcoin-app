import React from "react";
import SmallCard from "../cards/SmallCard";
import socket from "../../bitcoin/stream-connection";
import { formatTransaction } from "../../../utils";

const Transaction = props => {
  const { total } = props;
  return (
    <div>
      {socket.addEventListener("message", evt => {
        const { data } = evt;
        return <SmallCard transaction={formatTransaction(data)} />;
      })}
    </div>
  );
};

export default Transaction;
