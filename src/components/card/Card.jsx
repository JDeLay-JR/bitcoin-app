import React from "react";
import "./Card.scss";

const Card = props => {
  const { children } = props;
  return <div className="card centered">{children}</div>;
};

export default Card;
