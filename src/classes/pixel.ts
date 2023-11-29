import { Entity, InputAction, Material, MeshCollider, MeshRenderer, Transform, TransformType, engine, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"
import { Vector2 } from "~system/EngineApi"

export class Pixel {
    entity: Entity
    color: Color4 = Color4.White()
    index: Vector2 = { x: -1, y: -1 }

    constructor(transform: TransformType, index: Vector2) {
        this.entity = engine.addEntity()
        MeshRenderer.setBox(this.entity)
        MeshCollider.setBox(this.entity)
        Transform.create(this.entity, transform)
        this.index = index
        this.paint()

        pointerEventsSystem.onPointerDown({
            entity: this.entity,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: `Paint (${index.x}, ${index.y})`,
                maxDistance: 12
            }
        },
            () => {
                this.paint(this.color.r == Color4.White().r ? Color4.Black() : Color4.White())
            }
        )
    }

    paint(c: Color4 = Color4.White()) {
        this.color = c
        Material.setPbrMaterial(this.entity, {
            albedoColor: c
        })
    }
}