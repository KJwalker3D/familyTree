import { Color4 } from "@dcl/sdk/math"

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

export const PIXEL_CANVAS_COLS = 80
export const PIXEL_CANVAS_ROWS = 40
export const MAX_WELL_MESSAGES = 20

export const UI_ATLAS = "images/UI-atlas.png"
export const UI_PALETTE = "images/ColourSwatches.png"

export const coords = {
  questBG: {
    sourceLeft: 0.25,
    sourceRight: 1,
    sourceTop: 0.53,
    sourceBottom: 0
  },
  questHeader: {
    sourceLeft: 0,
    sourceRight: 0.362,
    sourceTop: 1,
    sourceBottom: 0.85
  },
  quest: {
    sourceLeft: 0.364,
    sourceRight: 1,
    sourceTop: 1,
    sourceBottom: 0.84
  },
  quest_todo: {
    sourceLeft: 0,
    sourceRight: 0.122,
    sourceTop: 0.47,
    sourceBottom: 0.36
  },
  quest_done: {
    sourceLeft: 0.126,
    sourceRight: 0.248,
    sourceTop: 0.47,
    sourceBottom: 0.36
  },
  pixel_E_arrow: {
    sourceLeft: 0,
    sourceRight: 0.2,
    sourceTop: 0.34,
    sourceBottom: 0.17
  },
  pixel_F_arrow: {
    sourceLeft: 0,
    sourceRight: 0.2,
    sourceTop: 0.17,
    sourceBottom: 0
  }
}