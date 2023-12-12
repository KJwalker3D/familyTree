import { Entity, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { talaDialog } from './npcDialog'


class NPC {
    talaNpc: Entity

    constructor() {
        this.talaNpc = npc.create(
            { position: Vector3.create(8, 0, 16), rotation: Quaternion.Zero(), scale: Vector3.create(0.16, 0.16, 0.16) },
            {
                type: npc.NPCType.CUSTOM,
                model: 'assets/Tala.glb',
                onActivate: () => { npc.talk(this.talaNpc, talaDialog) },
                faceUser: true,
                hoverText: "Talk",
                portrait: "images/TalaPortrait.png"
            }
        )
    }

    startQuest() {


    }

    endQuest() {
        const currentQuest = QuestManager.currentQuestType()
        if (currentQuest == QuestType.SEEDS) {
            Transform.getMutable(this.talaNpc).position = Vector3.create(53, 29.3, 62.5)
        }
    }
}

export const NPCManager = new NPC()