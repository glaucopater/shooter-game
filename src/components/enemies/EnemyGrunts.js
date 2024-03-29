import React, { Component } from "react";
import { gameData } from "../../data/game/gameData";
import { grunt } from "../../data/enemies/grunt";
import Enemy from "./EnemyGrunt";
import { ENEMY_INITIAL_COUNT, ENEMY_INCREMENT_PER_STAGE } from "../../constants";


class Enemies extends Component {
  grunts;
  interval;
  numberEnemies = ENEMY_INITIAL_COUNT;
  handlePopulateEnemies = () => {
    if (grunt.pos.length <= 0) return;

    this.grunts = grunt.pos.map((item, index) => {
      return (
        <Enemy
          playerTakeDamage={this.props.takeDamage}
          playerPos={this.props.pos}
          playerSize={this.props.size}
          playerScore={this.props.score}
          updateScore={this.props.updateScore}
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
      //each 5 stage increment the number of enemies
      const increment =
        this.props.stage > 1 && this.props.stage % 5 === 0 ? ENEMY_INCREMENT_PER_STAGE : 0;
      this.props.updateStage(+this.props.stage + 1);
      this.numberEnemies += increment;

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
      <div className="gameInfoHud">
        <div>{this.grunts}</div>
      </div>
    );
  }
}

export default Enemies;
