export function getRandomHexColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const PIXEL_CANVAS_COLS = 40
export const PIXEL_CANVAS_ROWS = 20
export const MAX_WELL_MESSAGES = 20