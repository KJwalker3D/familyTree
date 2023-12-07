import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ColliderLayer, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'

export function addAssets() {


    const tree = engine.addEntity()
    Transform.create(tree, {
        position: Vector3.create(48, 0, 48),
        scale: Vector3.create(1, 1, 1)
    })
    GltfContainer.create(tree, {
        src: 'assets/tree.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })


}
