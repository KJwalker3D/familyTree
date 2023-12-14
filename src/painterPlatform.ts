import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Tween, Animator, ColliderLayer, GltfContainer, InputAction, MeshCollider, MeshRenderer, PointerEventType, Transform, engine, inputSystem, pointerEventsSystem, EasingFunction, tweenSystem, Entity } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

/// data
let position = Vector3.create(48, 0, 48)
let isMoving: boolean = false
let atGroundLevel: boolean = true
let atMidLevel: boolean = false
let atTopLevel: boolean = false
let goingUp: boolean = false
let emergency: boolean = false
const up1 = 'AB'
const up2 = 'BC'
const down1 = 'BA'
const down2 = 'CB'

export function createPainterPlatform() {

    //pixel canvas height 82.78
    const platform = engine.addEntity()
    Transform.create(platform, {
        position: Vector3.create(47, 73.5, 75),
        rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    })
    GltfContainer.create(platform, {
        src: 'assets/oasis/painterPlatform.glb',
    })

    //collider for platform
    const platformCol = engine.addEntity()
    //MeshRenderer.setBox(platformCol) //debug
    MeshCollider.setBox(platformCol)
    Transform.create(platformCol, {
        position: Vector3.create(0, 0.6, 0),
        scale: Vector3.create(3.5, 1, 2),
        parent: platform
    })

    Animator.create(platform, {
        states: [{
            clip: up1,
            playing: false,
            loop: false
        },
        {
            clip: up2,
            playing: false,
            loop: false
        },
        {
            clip: down1,
            playing: false,
            loop: false
        },
        {
            clip: down2,
            playing: false,
            loop: false
        },

        ]

    })

    let colDestination: Vector3

    function toggleHeight() {
        if (isMoving && !emergency) {
            return; // if already moving ignore input
        }
        let currentColPosition = Transform.get(platformCol).position
        let delta = Vector3.Zero();
        isMoving = true

        if (atGroundLevel && goingUp) {
            Animator.stopAllAnimations(platform)
            Animator.getClip(platform, up1).playing = true
            delta.y = 5.25
            atGroundLevel = false
            atMidLevel = true
            atTopLevel = false
            console.log('goto mid')
        } else if (atMidLevel && goingUp) {
            Animator.stopAllAnimations(platform)
            Animator.getClip(platform, up2).playing = true
            delta.y = 6.07
            atGroundLevel = false
            atMidLevel = false
            atTopLevel = true
            console.log('goto top')
        } else if (atTopLevel && !goingUp) {
            Animator.stopAllAnimations(platform)
            Animator.getClip(platform, down2).playing = true
            delta.y = -6.07
            atGroundLevel = false
            atMidLevel = true
            atTopLevel = false
            console.log('goto mid')

        } else if (atMidLevel && !goingUp) {
            Animator.stopAllAnimations(platform)
            Animator.getClip(platform, down1).playing = true
            delta.y = -5.25
            console.log('goto ground')
            atGroundLevel = true
            atMidLevel = false
            atTopLevel = false
        } else if (emergency) {
            Animator.stopAllAnimations(platform)
            Animator.getClip(platform, down1).playing = true
            delta.y = -5.25
            console.log('goto ground')
            atGroundLevel = true
            atMidLevel = false
            atTopLevel = false
        }

        colDestination = Vector3.add(currentColPosition, delta);
        Tween.createOrReplace(platformCol, {
            mode: Tween.Mode.Move({
                start: currentColPosition,
                end: colDestination,
            }),
            duration: 3000,
            easingFunction: EasingFunction.EF_LINEAR,
        });
        isMoving = false
    }


    function createEmergencyButton() {
        const emergencyButton = engine.addEntity();
        Transform.create(emergencyButton, {
            position: Vector3.create(1.7, 1.5, -0.68),
            rotation: Quaternion.fromEulerDegrees(0, 0, 0),
            scale: Vector3.create(2, 2, 2),
            parent: platform
        })
        GltfContainer.create(emergencyButton, {
            src: 'assets/oasis/emergencyButton.glb',
            invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
        })
        //MeshCollider.setBox(emergencyButton)
        pointerEventsSystem.onPointerDown({
            entity: emergencyButton,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: 'Platform to Ground'
            }
        }, function () {
            if (!isMoving && !atGroundLevel) {
                console.log('emergency return to ground')
                emergency = true
                isMoving = true
                Animator.stopAllAnimations(platform)
                atGroundLevel = true
                Animator.playSingleAnimation(platform, down1)
                let currentColPosition = Transform.get(platformCol).position
                let targetColPosition = Vector3.create(0, -5.25, 0)
                colDestination = Vector3.add(currentColPosition, targetColPosition)
                Tween.createOrReplace(platformCol, {
                    mode: Tween.Mode.Move({
                        start: currentColPosition,
                        end: colDestination,
                    }),
                    duration: 3900,
                    easingFunction: EasingFunction.EF_LINEAR,
                });
                utils.timers.setTimeout(() => {
                    isMoving = false
                    emergency = false
                }, 2000)
            }
        })
    }
    createEmergencyButton()

    //remove this after testing
    const canvas = engine.addEntity()
    Transform.create(canvas, {
        position: position
    })
    GltfContainer.create(canvas, {
        src: 'assets/oasis/canvasDemo.glb',
        visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })

    function addPlatformButton(position: Vector3, rotation: Quaternion, scale: Vector3, action: string) {
        const platformButton = engine.addEntity()
        GltfContainer.create(platformButton, {
            src: 'assets/oasis/arrowButton.glb',
            invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
        })
        //MeshCollider.setBox(platformButton)
        Transform.createOrReplace(platformButton, {
            position: position,
            rotation: rotation,
            scale: scale,
            parent: platformCol
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
                    goingUp = true
                    toggleHeight()
                    isMoving = true
                } else if (action === 'down') {
                    //play down anim
                    console.log('down')
                    goingUp = false
                    toggleHeight()
                    isMoving = true
                } else if (action === 'left') {
                    console.log('left')
                    movePlatform(Vector3.create(5, 0, 0))
                    isMoving = true
                } else if (action === 'right') {
                    console.log('right')
                    movePlatform(Vector3.create(-5, 0, 0))
                    isMoving = true
                }
            } else {
                isMoving
                console.log('cant move again yet')
            }
        }
        )
        return platformButton
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
            easingFunction: EasingFunction.EF_LINEAR,
        })
        utils.timers.setTimeout(() => {
            isMoving = false
        }, 2000)
    }


    engine.addSystem(() => {
        if (tweenSystem.tweenCompleted(platform)) {
            isMoving = false
            console.log("platform stopped", Transform.get(platform).position) // there seems to be a bug with tweening ending in a different position
            Transform.getMutable(platform).position = destination // workaround the bug
            // Thank you Inihility :)
        }
        if (tweenSystem.tweenCompleted(platformCol)) {
            isMoving = false
            console.log("platform stopped", Transform.get(platformCol).position) // there seems to be a bug with tweening ending in a different position
            Transform.getMutable(platformCol).position = colDestination // workaround the bug
            // Thank you Inihility :)
        }
    })


    addPlatformButton(Vector3.create(0.01, 2.245, .35), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(.37, 1.3, 1), 'up')
    addPlatformButton(Vector3.create(0.01, 1.95, .35), Quaternion.fromEulerDegrees(0, 0, 180), Vector3.create(.37, 1.3, 1), 'down')
    addPlatformButton(Vector3.create(-0.038, 2.1, .35), Quaternion.fromEulerDegrees(0, 0, 90), Vector3.create(1.3, .37, 1), 'right')
    addPlatformButton(Vector3.create(0.059, 2.1, .35), Quaternion.fromEulerDegrees(0, 0, -90), Vector3.create(1.3, .37, 1), 'left')

}
