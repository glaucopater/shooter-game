import { v4 } from "uuid"; // For version 3
import { getRandomSpeed, getRandomRGBColor, getRandomPosition } from "../../helpers";
import { DEFAULT_GRUNT_SIZE, DEFAULT_GRUNT_DAMAGE, DEFAULT_GRUNT_STRIDE } from "../../constants";


export const grunt = {
  size: DEFAULT_GRUNT_SIZE,
  pos: [],
  color: [],
  speed: [],
  keys: [],
  damage: DEFAULT_GRUNT_DAMAGE,
  stride: DEFAULT_GRUNT_STRIDE,
  generateGrunts: (num, size = DEFAULT_GRUNT_SIZE, stride = DEFAULT_GRUNT_STRIDE) => {
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
