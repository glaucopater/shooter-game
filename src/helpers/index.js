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
