import { Entity, InputAction, Material, MeshCollider, MeshRenderer, PointerEventType, PointerEvents, Transform, TransformType, engine, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Color4, Vector3 } from "@dcl/sdk/math"
import { syncEntity } from "@dcl/sdk/network"
import { Vector2 } from "~system/EngineApi"
import { CanvasManager } from "../canvasManager"
import * as utils from '@dcl-sdk/utils'

export class Pixel {
    entity: Entity
    color: Color4 = Color4.White()
    index: Vector2 = { x: -1, y: -1 }
    selected: boolean = false

    constructor(transform: TransformType, index: Vector2) {
        this.entity = engine.addEntity()
        MeshRenderer.setBox(this.entity)
        MeshCollider.setBox(this.entity)
        Transform.create(this.entity, transform)
        this.index = index
        this.paint()

        utils.timers.setTimeout(() => {
            syncEntity(this.entity, [Material.componentId])
        }, 1000)

        PointerEvents.createOrReplace(this.entity, {
            pointerEvents: [
                {
                    eventType: PointerEventType.PET_HOVER_ENTER,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                    }
                },
                {
                    eventType: PointerEventType.PET_HOVER_LEAVE,
                    eventInfo: {
                        button: InputAction.IA_POINTER,
                        showFeedback: true,
                    }
                }
            ]
        })

        pointerEventsSystem.onPointerDown({
            entity: this.entity,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: `Paint (${index.x}, ${index.y})`,
                maxDistance: 32
            }
        },
            () => {
                if (CanvasManager.colorIndex >= 0 && CanvasManager.colorIndex < CanvasManager.colors.length) {
                    const c = CanvasManager.colors[CanvasManager.colorIndex].rgba
                    this.paint(this.color.r == c.r && this.color.g == c.g && this.color.b == c.b ? Color4.White() : c)
                }
            }
        )
    }

    paint(c: Color4 = Color4.White()) {
        this.color = c
        Material.setPbrMaterial(this.entity, {
            albedoColor: c,
            metallic: 0.25
        })
    }

    select() {
        if (this.selected) return
        this.selected = true
        let t = Transform.getMutable(this.entity)
        t.position = Vector3.create(t.position.x, t.position.y, t.position.z - t.scale.z * .4)
    }

    deselect() {
        if (!this.selected) return
        this.selected = false
        let t = Transform.getMutable(this.entity)
        t.position = Vector3.create(t.position.x, t.position.y, t.position.z + t.scale.z * .4)
    }
}