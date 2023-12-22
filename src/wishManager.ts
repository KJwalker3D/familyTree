import { ColliderLayer, Entity, GltfContainer, InputAction, MeshCollider, TextShape, Transform, engine, executeTask, pointerEventsSystem } from "@dcl/sdk/ecs"
import { mainTree } from "./foliageTests"
import { getMessages, publishMessage } from "./serverHandler"
import { MAX_WELL_MESSAGES } from "./utils"
import { Color4, Quaternion, Vector3 } from "@dcl/ecs-math"
import * as utils from '@dcl-sdk/utils'
import *  as  ui from 'dcl-ui-toolkit'
import { QuestManager } from "./questManager"
import { QuestType } from "./classes/quest"

export class WishManager {
    scrolls: Entity[] = []
    scrollsCollected: number = 0
    well: any

    messagePrompt: ui.CustomPrompt
    messageWritten: boolean = false
    message: string = ""

    static instance: WishManager

    static getInstance() {
        if (!this.instance)
            this.instance = new WishManager()
        return this.instance
    }

    constructor() {
        for (let i = 1; i <= 8; i++) {
            const e = engine.addEntity()
            GltfContainer.create(e, {
                src: `assets/wishingWell/scroll${i}.glb`,
                visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
            })
            Transform.create(e, { parent: mainTree })

            this.scrolls.push(e)
        }

        this.messagePrompt = ui.createComponent(ui.CustomPrompt, {
            style: ui.PromptStyles.DARK,
            height: 300
        })

        const header = this.messagePrompt.addText({
            value: "Make a wish",
            xPosition: 0,
            yPosition: 100,
            size: 24
        })

        const button = this.messagePrompt.addButton({
            style: ui.ButtonStyles.RED,
            text: 'Submit',
            xPosition: 0,
            yPosition: -70,
            onMouseDown: () => {
                const msg = input.fillInBoxElement.value ? input.fillInBoxElement.value : ""
                console.log(msg)
                if (this.message != "" && this.message.length <= 50) {
                    this.messageWritten = true
                    this.messagePrompt.hide()
                    publishMessage(this.message).then(() => {
                        pointerEventsSystem.removeOnPointerDown(this.well)
                        this.showMessages()
                        QuestManager.endQuest()
                        QuestManager.nextStep()
                    })
                }
            },
        })
        button.grayOut()

        const input = this.messagePrompt.addTextBox({
            placeholder: '50 char limit',
            xPosition: 0,
            yPosition: 15,
            onChange: (value) => {
                console.log('textbox changed:', value)
                this.message = value
                if (value.length > 50) {
                    header.value = "Over 50 characters!"
                    header.color = Color4.Red()
                    button.grayOut()
                } else if (value == "") {
                    button.grayOut()
                } else {
                    header.value = "Make a wish"
                    header.color = Color4.White()
                    button.enable()
                }
            },
        })


    }

    hasAllScrolls() {
        return this.scrollsCollected == 8
    }

    activateWell() {
        this.well = engine.addEntity()
        // MeshRenderer.setBox(e)
        MeshCollider.setBox(this.well)
        Transform.create(this.well, {
            position: Vector3.create(20.4, 42.5, 47.8),
            scale: Vector3.create(2.5, 4, 2.5)
        })
        pointerEventsSystem.onPointerDown(
            {
                entity: this.well,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: `Make A Wish`,
                }
            },
            () => {
                if (!this.messageWritten && !this.messagePrompt.isVisible()) {
                    this.messagePrompt.show()
                }
            }
        )
    }

    activate() {
        this.scrolls.forEach((e, i) => {
            pointerEventsSystem.onPointerDown(
                {
                    entity: e,
                    opts: {
                        button: InputAction.IA_POINTER,
                        hoverText: `Scroll ${i + 1}`,
                    }
                },
                () => {
                    engine.removeEntity(e)
                    this.scrollsCollected++
                    QuestManager.quests.forEach(q => {
                        if (q.type == QuestType.WISHING_WELL) {
                            if (this.scrollsCollected < 8) {
                                q.steps[0].text = `Find ${8 - this.scrollsCollected} scroll(s)`
                            } else {
                                q.steps[0].text = `Found scrolls`
                            }
                            return
                        }
                    })
                    if (this.hasAllScrolls()) {
                        this.activateWell()
                        QuestManager.nextStep()
                    }
                }
            )
        })
    }

    showMessages() {
        executeTask(async () => {
            let messages = await getMessages()
            let wellAnchors = []
            let maxMessages = messages.length < MAX_WELL_MESSAGES ? messages.length : MAX_WELL_MESSAGES
            for (let i = 0; i < maxMessages; i++) {
                const e = engine.addEntity()
                wellAnchors.push(e)
                // MeshRenderer.setBox(e)
                Transform.create(e, {
                    position: Vector3.create(20.4, 42.5, 47.8)
                })
                utils.perpetualMotions.startRotation(e, Quaternion.fromEulerDegrees(0, (Math.floor(Math.random() * 36) + 1) * (Math.floor(Math.random() * 2) ? -1 : 1), 0))

                const ts = engine.addEntity()
                Transform.create(ts, {
                    position: Vector3.create(1.8, 1.5 - Math.random() * 2.5, 1.8),
                    rotation: Quaternion.fromEulerDegrees(0, 35, 0),
                    parent: e
                })

                TextShape.create(ts, {
                    text: messages[i].msg,
                    fontSize: 4 - Math.min(3, messages[i].msg.length / 50 * 3)
                })
            }
        })
    }

}