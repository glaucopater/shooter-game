import { v4 } from "uuid"; // For version 3
import { getWindowDimensions } from "../../helpers";

export const default_size = 30;
export const default_damage = 5;
export const default_stride = 7;

//generate random rgb number in range
// r
// g
// b
export const getRandomRGBColor = () => {
  return `rgb(${~~(Math.random() * 105) + 150}, ${~~(Math.random() * 80)}, ${~~(
    Math.random() * 32
  )}`;
};

export const getRandomPosition = () => {
  const { height, width } = getWindowDimensions();
  const X = Math.random() < 0.5 ? 0 : width - grunt.size * 2;
  const Y = ~~(Math.random() * (height - grunt.size * 2));
  return [X, Y];
};

export const getRandomSpeed = () => {
  return grunt.stride + ~~(Math.random() * 10);
};

export const grunt = {
  size: default_size,
  pos: [],
  color: [],
  speed: [],
  keys: [],
  damage: default_damage,
  stride: default_stride,
  generateGrunts: (num) => {
    for (let i = 0; i < num; i++) {
      const [X, Y] = getRandomPosition();
      const color = getRandomRGBColor();
      const speed = getRandomSpeed();
      const key = v4();
      grunt.pos.push([X, Y]);
      grunt.color.push(color);
      grunt.speed.push(speed);
      grunt.keys.push(key);
    }
  },
  updateGruntPos: (index, newPos) => grunt.pos.splice(index, 1, newPos),
  removeGrunt: (index) => {
    grunt.pos.splice(index, 1);
    grunt.keys.splice(index, 1);
    grunt.color.splice(index, 1);
    grunt.speed.splice(index, 1);
  },
};
