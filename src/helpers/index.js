export const hasWindow = typeof window !== "undefined";

export function getWindowDimensions() {
  const width = hasWindow ? window.innerWidth : null;
  const height = hasWindow ? window.innerHeight : null;

  return {
    width,
    height,
  };
}

export const getWindowSize = () => {
  return { width: window.pageXOffset, height: window.pageYOffset };
};


//generate random rgb number in range
// r
// g
// b
export const getRandomRGBColor = () => {
  return `rgb(${~~(Math.random() * 105) + 150}, ${~~(Math.random() * 80)}, ${~~(
    Math.random() * 32
  )})`;
};

export const getRandomSpeed = (stride) => {
  return stride + ~~(Math.random() * 10);
};

export const getRandomPosition = (size) => {
  const { height, width } = getWindowDimensions();
  const X = Math.random() < 0.5 ? 0 : width - size * 2;
  const Y = ~~(Math.random() * (height - size * 2));
  return [X, Y];
};
