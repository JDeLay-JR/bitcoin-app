import React, { Component } from "react";
import "./RainDrop.scss";

class RainDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 1000,
      xCoordinate: 0
    };
    this.getWindowWidth = this.getWindowWidth.bind(this);
  }

  componentDidMount() {
    this.getWindowWidth();
    this.generateXCoordinate();
    this.cleanUpRain(this.props.hash);
    window.addEventListener("resize", this.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWindowWidth);
  }

  getWindowWidth() {
    this.setState({
      windowWidth: window.innerWidth
    });
    this.generateXCoordinate();
  }

  generateXCoordinate() {
    const { windowWidth } = this.state;
    const startingXCoordinate = Math.random() * windowWidth;
    this.setState({
      xCoordinate: startingXCoordinate
    });
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUpRain(hash) {
    const rainNode = document.getElementById(hash);
    rainNode.addEventListener("animationend", () => {
      rainNode.removeEventListener("animationend", () =>
        setTimeout(() => rainNode.parentNode.removeChild(rainNode), 10000)
      );
    });
  }

  render() {
    const { type, theme, hash } = this.props;
    const { xCoordinate } = this.state;

    return (
      <div
        id={hash}
        className={`${type}-${theme}`}
        style={{ left: `${xCoordinate}px` }}
      />
    );
  }
}

export default RainDrop;
