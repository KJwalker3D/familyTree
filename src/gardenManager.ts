import { Animator, AudioSource, ColliderLayer, Entity, GltfContainer, InputAction, PointerEventType, PointerEvents, PointerEventsResult, Transform, engine, executeTask, pointerEventsSystem } from "@dcl/sdk/ecs"
import { mainTree } from "./foliageTests"
import { Vector3 } from "@dcl/sdk/math"
import { QuestManager } from "./questManager"
import { AudioManager } from "./audioManager"

const gardenAssets = {
    brownSeeds: {
        normal: "assets/brownSeeds-0,0.glb",
        positioned: "assets/garden/brownSeeds-positioned.glb",
        glow: "assets/garden/brownSeeds-positioned-glow.glb"
    },
    greenSeeds: {
        normal: "assets/greenSeeds-0,0.glb",
        positioned: "assets/garden/greenSeeds-positioned.glb",
        glow: "assets/garden/greenSeeds-positioned-glow.glb"
    },
    redSeeds: {
        normal: "assets/redSeeds-0,0.glb",
        positioned: "assets/garden/redSeeds-positioned.glb",
        glow: "assets/garden/redSeeds-positioned-glow.glb"
    },
    plant: {
        normal: "assets/garden/plantAnimation.glb"
    },
    waterTrough: {
        normal: "assets/waterTrough-0,0.glb",
        positioned: "assets/garden/waterTrough-positioned.glb",
        glow: "assets/garden/waterTrough-positioned-glow.glb"
    },
    wateringCan: {
        normal: "assets/wateringCan-0,0.glb",
        positioned: "assets/garden/wateringCan-positioned.glb",
        glow: "assets/garden/wateringCan-positioned-glow.glb"
    },
}

enum GardenItem {
    NONE,
    BROWN_SEEDS,
    GREEN_SEEDS,
    RED_SEEDS,
    WATER_TROUGH,
    WATERING_CAN
}

export class GardenManager {
    brownSeeds: Entity
    greenSeeds: Entity
    redSeeds: Entity
    plant: Entity
    waterTrough: Entity
    wateringCan: Entity

    collectedSeeds: GardenItem[] = []
    currentItem: GardenItem = GardenItem.NONE

    seedsPlanted: boolean = false
    active: boolean = false

    growingSound: Entity

    static instance: GardenManager

    static getInstance() {
        if (!this.instance)
            this.instance = new GardenManager()
        return this.instance
    }

    constructor() {
        this.brownSeeds = engine.addEntity()
        this.greenSeeds = engine.addEntity()
        this.redSeeds = engine.addEntity()
        this.plant = engine.addEntity()
        this.waterTrough = engine.addEntity()
        this.wateringCan = engine.addEntity()

        GltfContainer.create(this.brownSeeds, {
            src: gardenAssets.brownSeeds.positioned,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        })
        GltfContainer.create(this.greenSeeds, {
            src: gardenAssets.greenSeeds.positioned,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        })

        GltfContainer.create(this.redSeeds, {
            src: gardenAssets.redSeeds.positioned,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        })
        GltfContainer.create(this.plant, {
            src: gardenAssets.plant.normal,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        })
        GltfContainer.create(this.waterTrough, {
            src: gardenAssets.waterTrough.positioned,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        })
        GltfContainer.create(this.wateringCan, {
            src: gardenAssets.wateringCan.positioned,
            visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
        })

        Transform.create(this.brownSeeds, { parent: mainTree }
        )
        Transform.create(this.greenSeeds, { parent: mainTree }
        )
        Transform.create(this.redSeeds, { parent: mainTree }
        )
        Transform.create(this.plant, { parent: mainTree }
        )
        Transform.create(this.waterTrough,
            {
                position: Vector3.create(-1, 0, 0),
                parent: mainTree
            }
        )
        Transform.create(this.wateringCan, { parent: mainTree }
        )

        Animator.create(this.plant, {
            states: [{
                clip: 'play',
                playing: false,
                loop: false, //looping for testing purposes
            }
            ]
        })

        this.growingSound = engine.addEntity()
        Transform.create(this.growingSound, {
            position: Vector3.create(59, 30.5, 60)
        })
        AudioSource.create(this.growingSound, {
            audioClipUrl: "sound/plantGrow.mp3",
            playing: false,
            loop: false,
            volume: 0.8
        })
    }

    playGrowing() {
        AudioSource.getMutable(this.growingSound).playing = true
    }

    activate() {
        this.active = true
        pointerEventsSystem.onPointerDown(
            {
                entity: this.brownSeeds,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: "Brown Seeds",
                }
            },
            () => {
                this.addSeed(GardenItem.BROWN_SEEDS)
                pointerEventsSystem.removeOnPointerDown(this.brownSeeds)
            }
        )
        pointerEventsSystem.onPointerDown(
            {
                entity: this.greenSeeds,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: "Green Seeds",
                }
            },
            () => {
                this.addSeed(GardenItem.GREEN_SEEDS)
                pointerEventsSystem.removeOnPointerDown(this.greenSeeds)
            }
        )
        pointerEventsSystem.onPointerDown(
            {
                entity: this.redSeeds,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: "Red Seeds",
                }
            },
            () => {
                this.addSeed(GardenItem.RED_SEEDS)
                pointerEventsSystem.removeOnPointerDown(this.redSeeds)
            }
        )
        this.setGardenClick()

        // engine.addSystem(this.PointerReadingSystem.bind(this))
    }

    setGardenHoverText(s: string = "Garden") {
        PointerEvents.getMutable(this.plant).pointerEvents.forEach(e => {
            if (e.eventType == PointerEventType.PET_DOWN)
                e.eventInfo!.hoverText = s
        })
    }

    setGardenClick(hoverText: string = "Garden") {
        pointerEventsSystem.removeOnPointerDown(this.plant)
        pointerEventsSystem.onPointerDown(
            {
                entity: this.plant,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: hoverText,
                }
            },
            () => {
                if (!this.seedsPlanted) {
                    if (this.hasAllSeeds()) {
                        this.seedsPlanted = true
                        pointerEventsSystem.onPointerDown(
                            {
                                entity: this.wateringCan,
                                opts: {
                                    button: InputAction.IA_POINTER,
                                    hoverText: "Watering Can",
                                }
                            },
                            () => {
                                this.updateGardenItem(GardenItem.WATERING_CAN)
                                pointerEventsSystem.removeOnPointerDown(this.wateringCan)
                                pointerEventsSystem.onPointerDown(
                                    {
                                        entity: this.waterTrough,
                                        opts: {
                                            button: InputAction.IA_POINTER,
                                            hoverText: "Watering Trough",
                                        }
                                    },
                                    () => {
                                        if (this.currentItem = GardenItem.WATERING_CAN) {
                                            this.updateGardenItem(GardenItem.WATER_TROUGH)
                                            pointerEventsSystem.removeOnPointerDown(this.waterTrough)
                                            this.setGardenHoverText("Water Seeds")
                                            AudioManager.playSFXPing()
                                        }
                                    }
                                )
                                AudioManager.playSFXPing()
                            }
                        )
                        this.setGardenHoverText()
                        AudioManager.playSFXPing()
                    }
                }
                else if (this.currentItem == GardenItem.WATER_TROUGH) {
                    Animator.playSingleAnimation(this.plant, 'play')
                    pointerEventsSystem.removeOnPointerDown(this.plant)
                    this.setGardenHoverText("Happy Plant")
                    QuestManager.nextStep()
                    this.playGrowing()
                }
            }
        )

    }

    deactivate() {
        this.active = false
        pointerEventsSystem.removeOnPointerDown(this.brownSeeds)
        pointerEventsSystem.removeOnPointerDown(this.greenSeeds)
        pointerEventsSystem.removeOnPointerDown(this.redSeeds)
        pointerEventsSystem.removeOnPointerDown(this.wateringCan)
        pointerEventsSystem.removeOnPointerDown(this.waterTrough)

        // engine.removeSystem(this.PointerReadingSystem)
    }

    addSeed(s: GardenItem) {
        if (!this.collectedSeeds.includes(s)) {
            this.collectedSeeds.push(s)
            AudioManager.playSFXPing()
        }
        if (this.hasAllSeeds()) {
            this.setGardenHoverText("Plant Seeds")
        }
    }

    updateGardenItem(item: GardenItem) {
        this.currentItem = item
        // update UI
    }

    hasAllSeeds(): boolean {
        return this.collectedSeeds.includes(GardenItem.BROWN_SEEDS) && this.collectedSeeds.includes(GardenItem.GREEN_SEEDS) && this.collectedSeeds.includes(GardenItem.RED_SEEDS)
    }

    // Pointer reading system doesn't seem to work with .glb
    // lastHoverOn: any

    // PointerReadingSystem() {
    //     const c = engine.getEntitiesWith(PointerEventsResult)
    //     for (const [entity] of c) {
    //         const result = PointerEventsResult.get(entity)
    //         result.forEach(element => {
    //             if (element.hit) {
    //                 if (element.state == PointerEventType.PET_HOVER_ENTER) {
    //                     // select new pixel
    //                     if ((this.lastHoverOn && this.lastHoverOn.hit.entityId != element.hit.entityId) || !this.lastHoverOn) {
    //                         if (element.hit.entityId! == this.wateringCan.valueOf()) {
    //                             this.lastHoverOn = element
    //                             GltfContainer.createOrReplace(this.wateringCan,
    //                                 {
    //                                     src: gardenAssets.wateringCan.glow,
    //                                     visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    //                                 }
    //                             )

    //                         }
    //                         // let p: any = this.findPixelById(element.hit.entityId!)
    //                         // if (p) {
    //                         //     p.select()
    //                         //     this.lastHoverOn = element
    //                         // }
    //                     }
    //                 }
    //                 else if (element.state == PointerEventType.PET_HOVER_LEAVE) {
    //                     // unselect last pixel
    //                     if (this.lastHoverOn && this.lastHoverOn.hit.entityId == element.hit.entityId) {
    //                         if (element.hit.entityId! == this.wateringCan.valueOf()) {
    //                             this.lastHoverOn = null
    //                             GltfContainer.createOrReplace(this.wateringCan,
    //                                 {
    //                                     src: gardenAssets.wateringCan.positioned,
    //                                     visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
    //                                 }
    //                             )
    //                         }
    //                         //     let p: any = this.findPixelById(element.hit.entityId!)
    //                         //     if (p) {
    //                         //         p.deselect()
    //                         //         this.lastHoverOn = null
    //                         //     }
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // }
}