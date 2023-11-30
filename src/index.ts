import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { PixelCanvas } from './classes/pixelCanvas'
import { addAssets } from './foliageTests'
import { PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS } from './utils'


export function main() {
  addAssets()
  new PixelCanvas({
    position: Vector3.create(2, 1, 2),
    rotation: Quaternion.Zero(),
    scale: Vector3.One()
  }, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS)
}
