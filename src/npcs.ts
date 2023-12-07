import { Entity } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'

let placeholder: Entity

let NPCTalk: npc.Dialog[] = [
    {
        text: 'Greetings!'
    },
    {
        text: 'Could you help me fetch some seeds lying around?',
        isQuestion: true,
        buttons: [
            {
                label: `Yes!`,
                goToDialog: 2,
                triggeredActions: () => {
                    if (QuestManager.currentIndex == 0) {
                        QuestManager.makeProgress()
                    }
                },
            },
            {
                label: `I'm busy`,
                goToDialog: 2,
                triggeredActions: () => {
                }
            }
        ]
    },
    {
        text: 'See you!',
        isEndOfDialog: true
    }
]

export function addNPCs() {
    placeholder = npc.create(
        { position: Vector3.create(8, 0, 16), rotation: Quaternion.Zero(), scale: Vector3.create(0.16, 0.16, 0.16) },
        {
            type: npc.NPCType.CUSTOM,
            model: 'assets/Tala.glb',
            onActivate: () => { npc.talk(placeholder, NPCTalk) },
            faceUser: true,
            hoverText: "Talk",
        }
    )
}