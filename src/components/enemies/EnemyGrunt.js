import React, { Component } from "react";
import { audio } from "../../data/audio/audio";
import { gameData } from "../../data/game/gameData";
import { grunt } from "../../data/enemies/grunt";

//min is 2 for movement
export const maxSpeed = 2;
export const damageAreaSize = 5;

export const getRandomMove = () => {
  return ~~(Math.random() * maxSpeed);
};

class Enemy extends Component {
  movementInterval = null;
  damageInterval = null;
  key = grunt.keys[this.props.index];

  handleEnemyMovement = () => {
    const index = this.props.index;
    if (!grunt.keys[index]) return;

    let gruntX = grunt.pos[index][0],
      gruntY = grunt.pos[index][1];

    const move = getRandomMove(),
      playerX = this.props.playerPos[0],
      playerY = this.props.playerPos[1];

    gruntX = gruntX > playerX ? gruntX - move : gruntX + move;
    gruntY = gruntY > playerY ? gruntY - move : gruntY + move;

    grunt.updateGruntPos(index, [gruntX, gruntY]);
    this.handleCheckPlayerCollision(gruntX, gruntY, playerX, playerY);
    this.handleCheckCrosshairPos(gruntX, gruntY);
  };

  handleCheckPlayerCollision = (gruntX, gruntY, playerX, playerY) => {
    const gruntSize = grunt.size * 2,
      playerSize = this.props.playerSize * 2;
    if (
      ((gruntX <= playerX && gruntX + gruntSize >= playerX) ||
        (gruntX + gruntSize >= playerX + playerSize &&
          gruntX <= playerX + playerSize) ||
        (gruntX >= playerX && gruntX + gruntSize <= playerX + playerSize)) &&
      ((gruntY <= playerY && gruntY + gruntSize >= playerY) ||
        (gruntY + gruntSize >= playerY + playerSize &&
          gruntY <= playerY + playerSize) ||
        (gruntY >= playerY && gruntY + gruntSize <= playerY + playerSize))
    ) {
      if (!this.damageInterval) {
        this.damageInterval = setInterval(
          () => this.props.playerTakeDamage(grunt.damage),
          1000
        );
        this.props.playerTakeDamage(grunt.damage);
      }
    } else {
      clearInterval(this.damageInterval);
      this.damageInterval = false;
    }
  };

  handleCheckCrosshairPos = (gruntX, gruntY) => {
    if (!gameData.isShooting) return;

    const crosshairX = this.props.crosshairPos[0];
    const crosshairY = this.props.crosshairPos[1];
    const gruntSize = grunt.size * damageAreaSize;

    if (
      crosshairX >= gruntX &&
      crosshairX <= gruntX + gruntSize &&
      crosshairY >= gruntY &&
      crosshairY <= gruntY + gruntSize
    ) {
      this.handleDamageGrunt();
      gameData.isShooting = false;
    }
  };

  handleDamageGrunt = () => {
    if (this.key === grunt.keys[this.props.index]) {
      audio.hit1.volume = 0.1;
      audio.hit1.currentTime = 0;
      audio.hit1.play();
      clearInterval(this.movementInterval);
      this.movementInterval = false;
      grunt.removeGrunt(this.props.index);
      this.props.updateScore(+this.props.playerScore + 10);
    }
  };

  componentDidMount() {
    this.movementInterval = setInterval(
      () => this.handleEnemyMovement(),
      grunt.speed[0]
    );
  }

  componentWillUnmount() {
    clearInterval(this.movementInterval);
    clearInterval(this.damageInterval);
    this.movementInterval = false;
    this.damageInterval = false;
  }

  render() {
    return (
      <div
        className="enemy"
        style={{
          left: grunt.pos[this.props.index][0],
          top: grunt.pos[this.props.index][1],
          padding: grunt.size,
        }}
      >
        <span aria-label="enemy" role="img" style={{ fontSize: 30 }}>
          👽
        </span>
      </div>
    );
  }
}

export default Enemy;
