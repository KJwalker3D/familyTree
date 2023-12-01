import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { PixelCanvas } from './classes/pixelCanvas'
import { addAssets } from './foliageTests'
import { PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS } from './utils'
import { setupUi } from './ui'
import { addNPCs } from './npcs'
import { Seed } from './classes/seed'


export function main() {
  setupUi()
  addAssets()
  addNPCs()

  new PixelCanvas({
    position: Vector3.create(2, 1, 2),
    rotation: Quaternion.Zero(),
    scale: Vector3.One()
  }, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS)

  for (let i = 0; i < 20; i++) {
    new Seed({ position: Vector3.create(4 + (i * 2), 0, 4), rotation: Quaternion.fromEulerDegrees(i * 45, i * 45, i * 30), scale: Vector3.One() })
  }
}
