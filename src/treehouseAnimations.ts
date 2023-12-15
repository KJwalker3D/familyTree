import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Tween, Animator, ColliderLayer, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEventType, Transform, engine, inputSystem, pointerEventsSystem, EasingFunction, tweenSystem, Entity } from '@dcl/sdk/ecs'

let position = Vector3.create(48, 0, 48);

export function createMemoryLaneAnim() {

    const memoryFire = engine.addEntity()
    GltfContainer.create(memoryFire, {
        src: 'assets/memoryLane/campfire.glb'
    })
    Transform.create(memoryFire, {
        position: position
    })
    Animator.create(memoryFire, {
        states: [{
            clip: 'IdleSmallSmoke',
            playing: true,
            loop: true
        }]
    })
}

export function createWishingWellAnim() {

    const coin = engine.addEntity()
    GltfContainer.create(coin, {
        src: 'assets/wishingWell/coin.glb'
    })
    Transform.create(coin, {
        position: position
    })
   // Animator.create(coin, {
   //     states: [{
   //         clip: 'play',
   //         playing: true,
   //         loop: false
   //     }]
   // })

   const swing = engine.addEntity()
   GltfContainer.create(swing, {
       src: 'assets/wishingWell/swing.glb'
   })
   Transform.create(swing, {
       position: position
   })

   const fire = engine.addEntity()
   GltfContainer.create(fire, {
       src: 'assets/wishingWell/fire.glb'
   })
   Transform.create(fire, {
       position: position
   })
   Animator.create(fire, {
       states: [{
           clip: 'IdleSmallSmoke',
           playing: true,
           loop: true
       }]
   })
}

export function createOasisAssets() {
    const water = engine.addEntity();
    Transform.create(water, {
        position: position
    });
    GltfContainer.create(water, {
        src: 'assets/oasis/noColls.glb'
    })
}