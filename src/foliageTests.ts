import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Tween, Animator, ColliderLayer, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEventType, Transform, engine, inputSystem, pointerEventsSystem, EasingFunction } from '@dcl/sdk/ecs'

let position = Vector3.create(48, 0, 48)
export function addAssets() {

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




/// painter platform WIP
// if theres a height change trigger the corresponding animation
let heights: number[] = [

    0,
    5,
    10,
]
const displacement: number = 5

const groundMid: string = 'anim';
const midGround: string = 'anim';
const groundMax: string = 'anim';
const maxGround: string = 'anim';
const midMax: string = 'anim';
const maxMid: string = 'anim';

//pixel canvas height 82.78

const platform = engine.addEntity();
Transform.create(platform, {
    position: Vector3.create(50, 0, 70),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})
GltfContainer.create(platform, {
    src: 'assets/oasis/painterPlatform.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
})


//remove this after testing
const canvas = engine.addEntity();
Transform.create(canvas, {
    position: position
})
GltfContainer.create(canvas, {
    src: 'assets/oasis/canvasDemo.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
})

function addPlatformButton(position: Vector3, rotation: Quaternion, action: string) {
    const platformButton = engine.addEntity();
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
            hoverText: 'Click'
        }
        }, function () {
            console.log(`Button clicked: ${action}`);
            //do stuff
            if (action === 'up') {
                //play up anim
                console.log('up')
                //increase height number from array, cycle through

            } else if ( action === 'down') {
                //play down anim
                console.log('down')

                //decrease height number from array, cycle through


            } else if ( action === 'left') {
                console.log('left')

                let currentPositionX = Transform.getMutable(platform).position.x
                let currentPositionZ = Transform.getMutable(platform).position.z
                let currentPositionY = Transform.getMutable(platform).position.y
                movePlatform(Vector3.create(-5, 0 ,0))

          
              

            } else if ( action === 'right') {
                console.log('right')

                let currentPositionX = Transform.getMutable(platform).position.x
                let currentPositionZ = Transform.getMutable(platform).position.z
                let currentPositionY = Transform.getMutable(platform).position.y
                movePlatform(Vector3.create(5, 0 ,0))
              
            }
        }
    )
}

function movePlatform(delta: Vector3) {
    let currentPosition = Transform.getMutable(platform).position;
    let targetPosition = Vector3.create(
      currentPosition.x + delta.x,
      currentPosition.y + delta.y,
      currentPosition.z + delta.z
    );
    Tween.createOrReplace(platform, {
      mode: Tween.Mode.Move({
        start: currentPosition,
        end: targetPosition,
      }),
      duration: 2000,
      easingFunction: EasingFunction.EF_EASECIRC,
    });
 
  }




addPlatformButton(Vector3.create(0, 1, 0), Quaternion.fromEulerDegrees(0,0,0), 'up')
addPlatformButton(Vector3.create(0, 0, 0), Quaternion.fromEulerDegrees(0,0,0), 'down')
addPlatformButton(Vector3.create(1, 0.5, 0), Quaternion.fromEulerDegrees(0,0,0), 'left')
addPlatformButton(Vector3.create(-1, 0.5, 0), Quaternion.fromEulerDegrees(0,0,0), 'right')







