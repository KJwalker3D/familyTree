import { Entity, engine } from "@dcl/ecs"
import { MeshCollider, MeshRenderer, TransformType, Transform, pointerEventsSystem, InputAction } from "@dcl/sdk/ecs"
import { QuestManager } from "../questManager"

export class Seed {
    entity: Entity

    constructor(t: TransformType) {
        this.entity = engine.addEntity()
        MeshRenderer.setBox(this.entity)
        MeshCollider.setBox(this.entity)
        Transform.create(this.entity, t)

        pointerEventsSystem.onPointerDown(
            {
                entity: this.entity,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: 'Collect Seed'
                }
            },
            () => {
                if (QuestManager.currentIndex == 1) {
                    QuestManager.makeProgress()
                }
                engine.removeEntity(this.entity)
            }
        )
    }
}