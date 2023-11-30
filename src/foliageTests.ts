import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { ColliderLayer, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'

export function addAssets() {


    const tree = engine.addEntity()
    Transform.create(tree, {
        position: Vector3.create(48, 0, 48)
    })
    GltfContainer.create(tree, {
        src: 'assets/tree.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })


    const leaves = engine.addEntity()
    Transform.create(leaves, {
        position: Vector3.create(12, 5, 12),
        scale: Vector3.create(5, 5, 5)
    })
    GltfContainer.create(leaves, {
        src: 'assets/leaves6.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    const leaves2 = engine.addEntity()
    Transform.create(leaves2, {
        position: Vector3.create(50, 5, 15),
        scale: Vector3.create(5, 5, 5)
    })
    GltfContainer.create(leaves2, {
        src: 'assets/leaves7.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })


    const leaves5 = engine.addEntity()
    Transform.create(leaves5, {
        position: Vector3.create(38, 5, 12),
        scale: Vector3.create(10, 10, 10)
    })
    GltfContainer.create(leaves5, {
        src: 'assets/leaves5.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })
}
