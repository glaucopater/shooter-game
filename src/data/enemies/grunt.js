import { v4 } from "uuid"; // For version 3
import { getRandomSpeed, getRandomRGBColor, getRandomPosition } from "../../helpers";

export const default_size = 30;
export const default_damage = 5;
export const default_stride = 7;


export const grunt = {
  size: default_size,
  pos: [],
  color: [],
  speed: [],
  keys: [],
  damage: default_damage,
  stride: default_stride,
  generateGrunts: (num, size = default_size, stride = default_stride) => {
    console.log("generateGrunts", num, size, stride);
    for (let i = 0; i < num; i++) {
      const [X, Y] = getRandomPosition(size);
      const color = getRandomRGBColor();
      const speed = getRandomSpeed(stride);
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
