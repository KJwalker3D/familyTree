import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ColliderLayer, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { PixelCanvas } from './classes/pixelCanvas'
import { addAssets } from './foliageTests'


export function main() {

  addAssets()
  new PixelCanvas({
    position: Vector3.create(2, 1, 2),
    rotation: Quaternion.Zero(),
    scale: Vector3.One()
  }, 8, 8)




}
