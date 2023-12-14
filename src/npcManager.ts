import { Transform, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { talaDialog } from './npcDialog'


class NPC {
    talaNpc: any

    talaPositions: any[] = [
        { position: Vector3.create(74, 0, 32), rotation: Quaternion.fromEulerDegrees(0, 90, 0) }, // 0 start
        { position: Vector3.create(73.5, 20, 38) }, // 1 dance floor
        { position: Vector3.create(64.5, 29.3, 56) }, // 2 garden 1
        { position: Vector3.create(44, 30.2, 67) }, // 3 garden 2
        { position: Vector3.create(53, 29.3, 62.5) }, // 4 garden 3 (end quest)
        { position: Vector3.create(13, 40, 59) }, // 5 well 1
    ]

    pathToGarden: Vector3[] = [
        Vector3.create(74, 20.2, 42),
        Vector3.create(75, 22.5, 46),
        Vector3.create(72.5, 28, 52.5),
        Vector3.create(64.5, 29.3, 56)
    ]

    pathAtGarden: Vector3[] = [
        Vector3.create(63, 29.3, 64),
        Vector3.create(59, 29.3, 66),
        Vector3.create(44, 30.2, 67)
    ]

    pathToWell: Vector3[] = [
        Vector3.create(44, 30.2, 67),
        Vector3.create(34, 33, 74),
        Vector3.create(26, 36, 76),
        Vector3.create(18.5, 39, 70),
        Vector3.create(13, 40, 59),
    ]

    constructor() {
        this.createTala(this.talaPositions[0], talaDialog)
    }

    createTala(transform: { position: Vector3, rotation?: Quaternion }, dialog: npc.Dialog[], index: number = 0) {
        if (this.talaNpc) engine.removeEntity(this.talaNpc)

        this.talaNpc = npc.create(
            { ...transform, scale: Vector3.create(0.16, 0.16, 0.16) },
            {
                type: npc.NPCType.CUSTOM,
                model: "assets/Tala.glb",
                onActivate: () => {
                    npc.playAnimation(this.talaNpc, `Explain`, true)
                    npc.talk(this.talaNpc, dialog, index)
                },
                faceUser: true,
                hoverText: "Talk",
                portrait: "images/TalaPortrait.png",
                coolDownDuration: 3,
                walkingAnim: 'Walk'
            }
        )
    }

    createTalaNoDialog(pos: Vector3 = Transform.get(this.talaNpc).position) {
        if (this.talaNpc) engine.removeEntity(this.talaNpc)

        this.talaNpc = npc.create(
            { position: pos, rotation: Quaternion.Zero(), scale: Vector3.create(0.16, 0.16, 0.16) },
            {
                type: npc.NPCType.CUSTOM,
                model: 'assets/Tala.glb',
                onActivate: () => { },
                faceUser: true,
                hoverText: "Tala",
                portrait: "images/TalaPortrait.png",
                walkingAnim: 'Walk'
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
            case QuestType.DANCE:
                this.createTala(this.talaPositions[1], talaDialog, 6)
                Transform.getMutable(this.talaNpc).rotation = Quaternion.fromEulerDegrees(0, 180, 0)
                npc.talk(this.talaNpc, talaDialog, 6)
                break
            case QuestType.SEEDS:
                this.createTala(this.talaPositions[4], talaDialog, 10)
                npc.talk(this.talaNpc, talaDialog, 10)
                break

        }
    }
}

export const NPCManager = new NPC()