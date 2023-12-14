import { Color4 } from "@dcl/sdk/math"

export function getRandomHexColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const THEME = {
  COLOR: Color4.create(1, 1, 191 / 255, 1)
}

export function getUVs(sprite: any) {
  return [
    sprite.sourceLeft, sprite.sourceBottom,
    sprite.sourceLeft, sprite.sourceTop,
    sprite.sourceRight, sprite.sourceTop,
    sprite.sourceRight, sprite.sourceBottom
  ]
}

export const PIXEL_CANVAS_COLS = 40
export const PIXEL_CANVAS_ROWS = 20
export const MAX_WELL_MESSAGES = 20

export const UI_ATLAS = "images/UI-atlas.png"