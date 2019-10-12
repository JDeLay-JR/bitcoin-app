import React from "react";
import PropTypes from "prop-types";

const SmallCard = props => {
  const { transaction } = props;
  return (
    <div>
      <div>{new Date(transaction.time)}</div>
      <div>{transaction.hash}</div>
      <div>{transaction.value}</div>
    </div>
  );
};

SmallCard.propTypes = {
  transaction: PropTypes.shape({
    time: PropTypes.object,
    hash: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default SmallCard;
