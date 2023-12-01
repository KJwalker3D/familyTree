import { Entity, engine } from "@dcl/ecs"
import { MeshCollider, MeshRenderer, TransformType, Transform, pointerEventsSystem, InputAction } from "@dcl/sdk/ecs"
import { QuestHUD } from "../ui/quest.ui"

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
                if (QuestHUD.questPlaceholder.length > 1 && QuestHUD.questPlaceholder[1].progress < QuestHUD.questPlaceholder[1].completion)
                    QuestHUD.questPlaceholder[1].progress += 1
                engine.removeEntity(this.entity)
            }
        )
    }
}