import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Tween, Animator, ColliderLayer, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEventType, Transform, engine, inputSystem, pointerEventsSystem, EasingFunction, tweenSystem, Entity } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

let position = Vector3.create(48, 0, 48)
export let mainTree = engine.addEntity()

export function addAssets() {
    Transform.create(mainTree, {
        position: position
    })
     GltfContainer.create(mainTree, {
        src: 'assets/tree.glb',
         visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
     })

    

/*
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
    */

}





