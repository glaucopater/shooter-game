import React, { Component } from "react";
import { gameData } from "../../data/game/gameData";
import { grunt } from "../../data/enemies/grunt";
import Enemy from "./EnemyGrunt";

const ENEMY_INCREMENT_PER_STAGE = 0;
const ENEMY_INITIAL_COUNT = 1;

class Enemies extends Component {
  grunts;
  interval;
  numberEnemies = ENEMY_INITIAL_COUNT;
  stage = 0;

  handlePopulateEnemies = () => {
    if (grunt.pos.length <= 0) return;

    this.grunts = grunt.pos.map((item, index) => {
      return (
        <Enemy
          playerTakeDamage={this.props.takeDamage}
          playerPos={this.props.pos}
          playerSize={this.props.size}
          index={index}
          isShooting={this.props.isShooting}
          crosshairPos={this.props.crosshairPos}
          key={grunt.keys[index]}
        />
      );
    });
  };

  handleGameState = () => {
    if (grunt.pos.length <= 0) {
      this.numberEnemies += ENEMY_INCREMENT_PER_STAGE;
      this.stage += 1;
      grunt.generateGrunts(this.numberEnemies);
    }
    this.handlePopulateEnemies();
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    setTimeout(
      () =>
        (this.interval = setInterval(
          () => this.forceUpdate(),
          gameData.frameRate
        )),
      1000
    );
  }

  componentWillUpdate() {
    this.handleGameState();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="tempHud">
        <div>{this.grunts}</div>
        <div className="stageCounter">Stage: {this.stage}</div>
      </div>
    );
  }
}

export default Enemies;
