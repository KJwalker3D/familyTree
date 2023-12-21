import { AvatarShape, Entity, MeshCollider, Transform, TransformType, engine } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { lostDialog, talaDialog } from './npcDialog'
import * as utils from '@dcl-sdk/utils'


class NPC {
    talaNpc: any
    triviaNpc: any
    lostNpc: any

    lostUpdateId: number = -1
    lostFollowId: number = -1

    talaPositions: any[] = [
        { position: Vector3.create(78, 0.075, 32), rotation: Quaternion.fromEulerDegrees(0, 120, 0) }, // 0 start
        { position: Vector3.create(73.5, 20, 38) }, // 1 dance floor
        { position: Vector3.create(64.5, 29.3, 56) }, // 2 garden 1
        { position: Vector3.create(44, 30.2, 67) }, // 3 garden 2
        { position: Vector3.create(53, 29.3, 62.5) }, // 4 garden 3 (end quest)
        { position: Vector3.create(13, 40, 59) }, // 5 well 1
        { position: Vector3.create(12, 40.25, 44) }, // 6 well 2 (end quest)
        { position: Vector3.create(44.5, 54.5, 36), rotation: Quaternion.fromEulerDegrees(0, 180, 0) }, // 7 trivia

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

    lostStartingPos: TransformType = { position: Vector3.create(66.6, 26.2, 30.5), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() }
    lostFollowPath: Vector3[] = []
    lostCanTalk: boolean = true// false
    lostToTalaSystemInstance: any
    hasLostReachedTala: boolean = false

    constructor() {
        this.createTala(this.talaPositions[0], talaDialog)
        this.createLost(this.lostStartingPos)
    }

    initLost() {
        this.lostCanTalk = true
        AvatarShape.getMutable(this.lostNpc).name = "Where am I?"
    }

    createLost(t: TransformType) {
        if (this.lostNpc) engine.removeEntity(this.lostNpc)
        this.lostNpc = npc.create(
            t,
            {
                type: npc.NPCType.AVATAR,
                onActivate: () => {
                    if (this.lostCanTalk)
                        npc.talk(this.lostNpc, lostDialog)
                },
                coolDownDuration: 3,
                reactDistance: 2
            }
        )
        AvatarShape.getMutable(this.lostNpc).name = ""
    }

    startFollowLost() {
        AvatarShape.getMutable(this.lostNpc).name = "Following"
        this.lostCanTalk = false
        this.lostUpdateId = utils.timers.setInterval(() => {
            const p = Transform.get(engine.PlayerEntity).position
            if (this.lostFollowPath.length == 0 || !Vector3.equals(this.lostFollowPath[this.lostFollowPath.length - 1], p))
                if (Vector3.distanceSquared(p, Transform.get(this.lostNpc).position) > 30)
                    if (this.lostFollowPath.length == 0 || Vector3.distanceSquared(p, this.lostFollowPath[this.lostFollowPath.length - 1]) > 20)
                        this.lostFollowPath.push(Vector3.create(p.x, p.y - .9, p.z))
        }, 500)

        this.lostFollowId = utils.timers.setInterval(() => {
            if (this.lostFollowPath.length > 0 && !Vector3.equals(Transform.get(this.lostNpc).position, this.lostFollowPath[this.lostFollowPath.length - 1])) {
                npc.followPath(this.lostNpc, {
                    path: this.lostFollowPath,
                    totalDuration: 2,
                    pathType: npc.NPCPathType.SMOOTH_PATH,
                    curve: true,
                    onFinishCallback: () => {
                        // console.log("FINISHED AT", Transform.get(this.lostNpc).position)
                    }
                })
                this.lostFollowPath = []
            }
        }, 2000)

        this.lostToTalaSystemInstance = engine.addSystem(this.lostToTalaSystem.bind(this))
    }

    stopFollowLost() {
        utils.timers.clearInterval(this.lostUpdateId)
        utils.timers.clearInterval(this.lostFollowId)
        engine.removeSystem(this.lostToTalaSystemInstance)
        AvatarShape.getMutable(this.lostNpc).name = "Thank you!"
    }

    lostToTalaSystem(dt: number) {
        if (this.hasLostReachedTala) return
        const dist = Vector3.distanceSquared(Transform.get(engine.PlayerEntity).position, Transform.get(this.talaNpc).position)
        if (dist < 100) {
            // returned to tala
            QuestManager.nextStep()
            QuestManager.endQuest()
            this.stopFollowLost()
            this.hasLostReachedTala = true
        }
    }

    removeTrivia() {
        engine.removeEntity(this.triviaNpc)
    }

    createTrivia(t: TransformType, dialog: npc.Dialog[], index: number = 0, onActivateAnim: string = "Explain") {
        if (this.triviaNpc) engine.removeEntity(this.triviaNpc)

        this.triviaNpc = npc.create(
            { ...t, scale: Vector3.create(0.16, 0.16, 0.16) },
            {
                type: npc.NPCType.CUSTOM,
                model: "assets/Tala.glb",
                onActivate: () => {
                    npc.playAnimation(this.triviaNpc, onActivateAnim, false)
                    npc.talk(this.triviaNpc, dialog, index)
                },
                onWalkAway: () => {
                    this.playIdleAnim()
                },
                faceUser: true,
                hoverText: "Talk",
                portrait: "images/TalaPortrait.png",
                coolDownDuration: 3,
                idleAnim: 'ShortIdle',
                walkingAnim: 'Walk'
            }
        )
    }

    createTala(t: TransformType, dialog: npc.Dialog[], index: number = 0, onActivateAnim: string = "Explain") {
        if (this.talaNpc) engine.removeEntity(this.talaNpc)

        this.talaNpc = npc.create(
            { ...t, scale: Vector3.create(0.16, 0.16, 0.16) },
            {
                type: npc.NPCType.CUSTOM,
                model: "assets/Tala.glb",
                onActivate: () => {
                    npc.playAnimation(this.talaNpc, onActivateAnim, false)
                    npc.talk(this.talaNpc, dialog, index)
                },
                onWalkAway: () => {
                    this.playIdleAnim()
                },
                faceUser: true,
                hoverText: "Talk",
                portrait: "images/TalaPortrait.png",
                coolDownDuration: 3,
                idleAnim: 'ShortIdle',
                walkingAnim: 'Walk'
            }
        )
    }

    playIdleAnim() {
        npc.playAnimation(this.talaNpc, 'ShortIdle', false)
    }

    playCoolAnim() {
        npc.playAnimation(this.talaNpc, 'Cool', false)
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
                idleAnim: 'ShortIdle',
                walkingAnim: 'Walk',
            }
        )
    }

    startQuest() {
        const currentQuest = QuestManager.currentQuestType()
        switch (currentQuest) {
            case QuestType.TALK_TALA:
                break
            case QuestType.DANCE:

                break
            case QuestType.SEEDS:
                NPCManager.createTalaNoDialog()
                npc.followPath(NPCManager.talaNpc, {
                    path: NPCManager.pathAtGarden,
                    totalDuration: 8,
                    pathType: npc.NPCPathType.SMOOTH_PATH,
                    curve: true,
                    onFinishCallback: () => {
                        NPCManager.createTala(NPCManager.talaPositions[3], talaDialog, 9)
                    }
                })
                break
            case QuestType.WISHING_WELL:
                NPCManager.playIdleAnim()
                break
            case QuestType.TRIVIA:
                NPCManager.createTala(NPCManager.talaPositions[6], talaDialog, 18)
                NPCManager.createTrivia(NPCManager.talaPositions[7], talaDialog, 19)
                break
        }
    }

    endQuest() {
        const currentQuest = QuestManager.currentQuestType()
        switch (currentQuest) {
            case QuestType.TALK_TALA:
                this.createTala(this.talaPositions[0], talaDialog, 5)
                break
            case QuestType.DANCE:
                this.createTala(this.talaPositions[1], talaDialog, 6, "Cool")
                Transform.getMutable(this.talaNpc).rotation = Quaternion.fromEulerDegrees(0, 180, 0)
                npc.talk(this.talaNpc, talaDialog, 6)
                break
            case QuestType.SEEDS:
                this.createTala(this.talaPositions[4], talaDialog, 10, "Cool")
                npc.talk(this.talaNpc, talaDialog, 10,)
                break
            case QuestType.WISHING_WELL:
                this.createTala(this.talaPositions[6], talaDialog, 14, "Cool")
                npc.talk(this.talaNpc, talaDialog, 14)
                break
            case QuestType.TRIVIA:
                NPCManager.removeTrivia()
                NPCManager.initLost()
                NPCManager.createTala(NPCManager.talaPositions[7], talaDialog, 34)
                break
            case QuestType.GUIDE:
                NPCManager.createTala(NPCManager.talaPositions[7], talaDialog, 35)
                break
        }
    }
}

export const NPCManager = new NPC()