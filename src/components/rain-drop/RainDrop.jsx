import React, { Component } from "react";
import PropTypes from "prop-types";
import "./RainDrop.scss";

class RainDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xCoordinate: 0
    };
  }

  componentWillMount() {
    const { width } = this.props;
    const startingXCoordinate = Math.random() * (width - 100);
    this.setState({
      xCoordinate: startingXCoordinate
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWindowWidth);
  }

  render() {
    const { type, theme } = this.props;
    const { xCoordinate } = this.state;

    return (
      <div
        className={`${type}-${theme}`}
        style={{ left: `${xCoordinate}px` }}
      />
    );
  }
}

RainDrop.propTypes = {
  type: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

export default RainDrop;
