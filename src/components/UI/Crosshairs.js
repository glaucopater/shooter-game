import React, { Component } from "react";
import { gameData } from "../../data/game/gameData";
import { FIRE_AVATAR } from "../../constants/index";

class Crosshairs extends Component {
  interval;

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), gameData.frameRate);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <div
          className="outerCrosshair"
          style={{
            top: this.props.crosshairPos[1],
            left: this.props.crosshairPos[0],
          }}
        />
        <div
          className="spark"
          style={{
            display: this.props.crosshairDisplay,
            top: this.props.crosshairPos[1],
            left: this.props.crosshairPos[0],
          }}
        >
          <span aria-label="fire" role="img" style={{ fontSize: 30 }}>
            {FIRE_AVATAR}
          </span>
        </div>
        <div
          className="innerCrosshair"
          style={{
            top: this.props.crosshairPos[1],
            left: this.props.crosshairPos[0],
          }}
        />
      </>
    );
  }
}

export default Crosshairs;
