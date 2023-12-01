import { Entity } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'
import { QuestHUD } from './ui/quest.ui'

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
                    QuestHUD.questPlaceholder.push(
                        {
                            label: "Collect Seeds",
                            progress: 0,
                            completion: 10
                        }
                    )
                    QuestHUD.questPlaceholder[0].progress = 1
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
        { position: Vector3.create(8, 0, 8), rotation: Quaternion.Zero() },
        {
            type: npc.NPCType.AVATAR,
            onActivate: () => { npc.talk(placeholder, NPCTalk) },
            faceUser: true,
            hoverText: "Talk",
        }
    )
}