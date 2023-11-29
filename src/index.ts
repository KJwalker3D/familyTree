import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ColliderLayer, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { PixelCanvas } from './classes/pixelCanvas'


export function main() {

  const tree = engine.addEntity()
  Transform.create(tree, {
    position: Vector3.create(48, 0, 48)
  })
  GltfContainer.create(tree, {
    src: 'assets/tree.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })

  new PixelCanvas({
    position: Vector3.create(2, 1, 2),
    rotation: Quaternion.Zero(),
    scale: Vector3.One()
  }, 8, 8)
}
