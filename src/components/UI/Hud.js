import React, { Component } from "react";

class Hud extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.health === this.props.health &&
      nextProps.score === this.props.score
    )
      return false;

    return true;
  }

  render() {
    return (
      <div className="hud">
        <div>Player Health: {this.props.health}</div>
        <div>Score: {this.props.score}</div>
      </div>
    );
  }
}

export default Hud;
