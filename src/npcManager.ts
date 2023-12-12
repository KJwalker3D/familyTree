import { Entity, Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { talaDialog } from './npcDialog'


class NPC {
    talaNpc: any

    talaPositions: Vector3[] = [
        Vector3.create(8, 0, 16)
    ]

    constructor() {
        this.createTala(this.talaPositions[0], talaDialog)
    }

    createTala(pos: Vector3, dialog: npc.Dialog[], index: number = 0) {
        if (this.talaNpc) engine.removeEntity(this.talaNpc)

        this.talaNpc = npc.create(
            { position: pos, rotation: Quaternion.Zero(), scale: Vector3.create(0.16, 0.16, 0.16) },
            {
                type: npc.NPCType.CUSTOM,
                model: 'assets/Tala.glb',
                onActivate: () => { npc.talk(this.talaNpc, dialog, index) },
                faceUser: true,
                hoverText: "Talk",
                portrait: "images/TalaPortrait.png",
                coolDownDuration: 2
            }
        )
    }

    startQuest() {


    }

    endQuest() {
        const currentQuest = QuestManager.currentQuestType()
        switch (currentQuest) {
            case QuestType.TALK_TALA:
                this.createTala(this.talaPositions[0], talaDialog, 5)
                break
            case QuestType.SEEDS:
                Transform.getMutable(this.talaNpc).position = Vector3.create(53, 29.3, 62.5)
                break

        }
    }
}

export const NPCManager = new NPC()