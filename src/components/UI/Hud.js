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

  handleOnRestart = () => {
    console.log("Restart");
    this.props.resetPlayer();
  }

  render() {
    return (
      <div className="hud">
        {this.props.health === 0 ?
          <div>Game over! <button onClick={this.handleOnRestart}>Restart</button></div> :
          <div>Health: {this.props.health}</div>}
        <div>Stage: {this.props.stage}</div>
        <div>Score: {this.props.score}</div>
      </div>
    );
  }
}

export default Hud;
