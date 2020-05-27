import React, { PureComponent } from "react";
import { gameData } from "../../data/game/gameData";
import { getWindowDimensions } from "../../helpers";

export default class Player extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { map: getWindowDimensions() };
  }

  handlePlayerMove = (index, orientation) => {
    let newPos = this.handleDiagonalMovements(index, orientation);
    newPos = this.handleBoundaryCheck(newPos);
    this.props.playerMove(newPos);
  };

  handleDiagonalMovements = (index, orientation) => {
    const newPos = [...this.props.pos],
      willMove = this.props.willMove,
      stride = this.props.stride;

    if (willMove.right && willMove.up) {
      newPos.splice(0, 1, newPos[0] + stride / 2);
      newPos.splice(1, 1, newPos[1] - stride / 2);
    } else if (willMove.right && willMove.down) {
      newPos.splice(0, 1, newPos[0] + stride / 2);
      newPos.splice(1, 1, newPos[1] + stride / 2);
    } else if (willMove.left && willMove.up) {
      newPos.splice(0, 1, newPos[0] - stride / 2);
      newPos.splice(1, 1, newPos[1] - stride / 2);
    } else if (willMove.left && willMove.down) {
      newPos.splice(0, 1, newPos[0] - stride / 2);
      newPos.splice(1, 1, newPos[1] + stride / 2);
    } else newPos.splice(index, 1, newPos[index] + orientation);

    return newPos;
  };

  handleBoundaryCheck = (oldPos) => {
    const newPos = [...oldPos];
    const playerSize = this.props.size + 60;
    const width = this.state.map.width;
    const height = this.state.map.height;

    if (newPos[0] < 0) newPos.splice(0, 1, 0);
    if (newPos[1] < 0) newPos.splice(1, 1, 0);
    if (newPos[0] > width - playerSize) newPos.splice(0, 1, width - playerSize);
    if (newPos[1] > height - playerSize)
      newPos.splice(1, 1, height - playerSize);

    return newPos;
  };

  handleKeyDown = (e) => {
    e.preventDefault();
    if (!this.props.isReady) return;

    return this.handleDirections(e);
  };

  // using intervals for continous movement as a workaround to avoid key repeat from the operating system.
  // only the first keypress is registered and the interval continues until the key registers a 'keyup'.
  handleDirections = (e) => {
    e.preventDefault();
    const canMove = this.props.canMove;
    let stride = this.props.stride,
      index = 0,
      direction;
    switch (e.key) {
      case "ArrowRight":
      case "d":
        if (canMove.right) {
          canMove.right = false;
          direction = "right";
        }
        break;
      case "ArrowLeft":
      case "a":
        if (canMove.left) {
          canMove.left = false;
          stride = -stride;
          direction = "left";
        }
        break;
      case "ArrowDown":
      case "s":
        if (canMove.down) {
          canMove.down = false;
          index = 1;
          direction = "down";
        }
        break;
      case "ArrowUp":
      case "w":
        if (canMove.up) {
          canMove.up = false;
          index = 1;
          stride = -stride;
          direction = "up";
        }
        break;
      default:
        break;
    }

    return direction && this.handleDetermineMove(index, stride, direction);
  };

  handleDetermineMove = (index, stride, direction) => {
    if (!index) {
      this.props.clearMovementIntervals("right");
      this.props.clearMovementIntervals("left");
    }
    if (index) {
      this.props.clearMovementIntervals("down");
      this.props.clearMovementIntervals("up");
    }
    this.handlePlayerMove(index, stride);
    const speed = this.props.speed,
      willMove = this.props.willMove,
      interval = setInterval(() => this.handlePlayerMove(index, stride), speed);
    switch (direction) {
      case "right":
        willMove.right = interval;
        break;
      case "left":
        willMove.left = interval;
        break;
      case "down":
        willMove.down = interval;
        break;
      case "up":
        willMove.up = interval;
        break;
      default:
        break;
    }
  };

  //removes the interval set to a key to stop movement and allows the key input to register again.  Also handles opposing directions.
  handleKeyUp = (e) => {
    e.preventDefault();
    const stride = this.props.stride,
      canMove = this.props.canMove;
    switch (e.key) {
      case "ArrowRight":
      case "d":
        this.props.clearMovementIntervals("right");
        canMove.right = true;
        if (!canMove.left) return this.handleDetermineMove(0, -stride, "left");
        break;
      case "ArrowLeft":
      case "a":
        this.props.clearMovementIntervals("left");
        canMove.left = true;
        if (!canMove.right) return this.handleDetermineMove(0, stride, "right");
        break;
      case "ArrowDown":
      case "s":
        this.props.clearMovementIntervals("down");
        canMove.down = true;
        if (!canMove.up) return this.handleDetermineMove(1, -stride, "up");
        break;
      case "ArrowUp":
      case "w":
        this.props.clearMovementIntervals("up");
        canMove.up = true;
        if (!canMove.down) return this.handleDetermineMove(1, stride, "down");
        break;
      default:
        break;
    }
  };

  updateMapDimension() {
    this.setState({ map: getWindowDimensions() });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), gameData.frameRate);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);

    this.updateMapDimension();
    window.addEventListener("resize", this.updateMapDimension.bind(this));
  }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.map !== this.state.map) {
  //     this.setState({ map: getWindowDimensions() });
  //   }
  // }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    return (
      <>
        <div
          className="player"
          style={{
            color: "white",
            padding: 0,
            position: "absolute",
            left: this.props.pos[0],
            top: this.props.pos[1],
          }}
        >
          <span aria-label="player" role="img" style={{ fontSize: 30 }}>
            🤨
          </span>
        </div>
      </>
    );
  }
}
