import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Animator, ColliderLayer, GltfContainer, Transform, engine } from '@dcl/sdk/ecs'

export function addAssets() {
    let position = Vector3.create(48, 0, 48)

    const tree = engine.addEntity()
    Transform.create(tree, {
        position: position,
        scale: Vector3.create(1, 1, 1)
    })
    GltfContainer.create(tree, {
        src: 'assets/tree.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    const plantAnimation = engine.addEntity();
    Transform.create(plantAnimation, {
        position: position
    })
    GltfContainer.create(plantAnimation, {
        src: 'assets/garden/plantAnimation.glb'
    })
    Animator.create(plantAnimation, {
        states: [{
            clip: 'play',
            playing: true,
            loop: true, //looping for testing purposes
        }
        ]
    })


    // Can use this to highlight different areas for instance the wishing well, or a place to find or anything
    const sparklesAnimation = engine.addEntity();
    Transform.create(sparklesAnimation, {
        position: Vector3.create(10, 0.2, 10)
    })
    GltfContainer.create(sparklesAnimation, {
        src: 'assets/sparkles.glb'
    })
    Animator.create(sparklesAnimation, {
        states: [{
            clip: 'play',
            playing: true,
            loop: true, 
        }
        ]
    })

}
