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

    // const plantAnimation = engine.addEntity();
    // Transform.create(plantAnimation, {
    //     position: position
    // })
    // GltfContainer.create(plantAnimation, {
    //     src: 'assets/garden/plantAnimation.glb'
    // })
    // Animator.create(plantAnimation, {
    //     states: [{
    //         clip: 'play',
    //         playing: true,
    //         loop: true, //looping for testing purposes
    //     }
    //     ]
    // })


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



/// painter platform WIP
// Why isn't this working right? :(

let isMoving: boolean = false

//pixel canvas height 82.78

const platform = engine.addEntity()
Transform.create(platform, {
    position: Vector3.create(50, 0, 70),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})
GltfContainer.create(platform, {
    src: 'assets/oasis/painterPlatform.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
})


//remove this after testing
const canvas = engine.addEntity()
Transform.create(canvas, {
    position: position
})
GltfContainer.create(canvas, {
    src: 'assets/oasis/canvasDemo.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
})

function addPlatformButton(position: Vector3, rotation: Quaternion, action: string) {
    const platformButton = engine.addEntity()
    MeshRenderer.setBox(platformButton)
    MeshCollider.setBox(platformButton)
    Transform.createOrReplace(platformButton, {
        position: position,
        rotation: rotation,
        scale: Vector3.create(1.2, 1.2, 1.2),
        parent: platform
    })
    pointerEventsSystem.onPointerDown({
        entity: platformButton,
        opts: {
            button: InputAction.IA_POINTER,
            hoverText: action.toUpperCase()
        }
    }, function () {
        console.log(`Button clicked: ${action}`)
        //do stuff
        if (!isMoving) {
            if (action === 'up') {
                //play up anim
                console.log('up')
                isMoving = true
                //increase height number from array, cycle through

            } else if (action === 'down') {
                //play down anim
                console.log('down')
                isMoving = true

                //decrease height number from array, cycle through
            } else if (action === 'left') {
                console.log('left')
                isMoving = true
                movePlatform(Vector3.create(1, 0, 0))

            } else if (action === 'right') {
                console.log('right')
                isMoving = true
                movePlatform(Vector3.create(-1, 0, 0))
            }
        }
    }
    )
}

let destination: Vector3

function movePlatform(delta: Vector3) {
    let currentPosition = Transform.get(platform).position
    let targetPosition = destination = Vector3.add(currentPosition, delta)
    console.log("MOVING PLATFORM", currentPosition, targetPosition)
    Tween.createOrReplace(platform, {
        mode: Tween.Mode.Move({
            start: currentPosition,
            end: targetPosition,
        }),
        duration: 2000,
        easingFunction: EasingFunction.EF_EASECIRC
    })
}


engine.addSystem(() => {
    if (tweenSystem.tweenCompleted(platform)) {
        isMoving = false
        console.log("platform stopped", Transform.get(platform).position) // there seems to be a bug with tweening ending in a different position
        Transform.getMutable(platform).position = destination // workaround the bug
    // Thank you Inihility :)
    }
})


addPlatformButton(Vector3.create(0, 1, 0), Quaternion.fromEulerDegrees(0, 0, 0), 'up')
addPlatformButton(Vector3.create(0, 0, 0), Quaternion.fromEulerDegrees(0, 0, 0), 'down')
addPlatformButton(Vector3.create(1, 0.5, 0), Quaternion.fromEulerDegrees(0, 0, 0), 'left')
addPlatformButton(Vector3.create(-1, 0.5, 0), Quaternion.fromEulerDegrees(0, 0, 0), 'right')







