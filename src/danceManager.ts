import { MessageBus } from '@dcl/sdk/message-bus'
import { COOLDOWN_TIME, DanceMeter, danceMeterFull } from './classes/danceMeter'
import * as utils from '@dcl-sdk/utils'
import { onPlayerExpressionObservable } from '@dcl/sdk/observables'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { AudioSource, AvatarShape, Entity, GltfContainer, MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { mainTree } from './foliageTests'
import { NPCManager } from './npcManager'


export let isDancing: boolean = false
export let partyBGM: Entity = engine.addEntity()
export let partyBGMLoud: Entity = engine.addEntity()

let canDance: boolean = true
let lights: any
let danceNpcs: Entity[] = []
let danceNpcT: any = [
    // upper floor
    { position: Vector3.create(69.5, 26.2, 29), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },
    { position: Vector3.create(72.5, 26.9, 27.5), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },
    { position: Vector3.create(68, 26.5, 33.5), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },
    { position: Vector3.create(75.25, 27.25, 26.5), rotation: Quaternion.fromEulerDegrees(0, 270, 0), scale: Vector3.One() },
    { position: Vector3.create(70.5, 26.3, 32.5), rotation: Quaternion.fromEulerDegrees(0, 270, 0), scale: Vector3.One() },
    // ground floor
    { position: Vector3.create(57.5, 20.9, 36), rotation: Quaternion.fromEulerDegrees(0, 0, 0), scale: Vector3.One() },
    { position: Vector3.create(65, 20, 41.5), rotation: Quaternion.fromEulerDegrees(0, 90, 0), scale: Vector3.One() },
    { position: Vector3.create(63.5, 20, 26), rotation: Quaternion.fromEulerDegrees(0, -20, 0), scale: Vector3.One() },
    { position: Vector3.create(62, 20, 28.5), rotation: Quaternion.fromEulerDegrees(0, 160, 0), scale: Vector3.One() },

]
let dances: string[] = [
    "dance", "robot", "tik", "hammer", "tektonik", "disco"
]
let hasDanced: boolean = false

export function addDanceManager() {
    Transform.create(partyBGM, { position: Vector3.create(70, 23, 31) })
    AudioSource.create(partyBGM, {
        audioClipUrl: "sound/partyDance.mp3",
        playing: true,
        loop: true,
        volume: 0.2
    })

    Transform.create(partyBGMLoud, { position: Vector3.create(70, 23, 31) })
    AudioSource.create(partyBGMLoud, {
        audioClipUrl: "sound/partyDance.mp3",
        playing: false,
        loop: true,
        volume: 0.8
    })

    // add npcs to dance floor
    for (let i = 0; i < danceNpcT.length; i++) {
        let e = engine.addEntity()
        Transform.create(e, danceNpcT[i])
        const av = AvatarShape.create(e)
        danceNpcs.push(e)
        av.name = ""
    }

    // Multiplayer (p2p)
    const sceneMessageBus = new MessageBus()
    const danceMeter = new DanceMeter(
        Vector3.create(78.5, 21, 31), // Position
        Vector3.create(0, 90, 0), // Rotation in Euler degrees
        Vector3.create(.8, .8, .8), // Scale
        undefined // Parent entity
    )

    // Use a timer to control the cooldown
    let danceCooldownTimer: ReturnType<typeof utils.timers.setTimeout> | null = null
    // Listen for dancing
    onPlayerExpressionObservable.add(({ expressionId }) => {
        if (canDance &&
            dances.includes(expressionId)) {
            console.log('dance detected')
            if (QuestManager.currentQuestType() != QuestType.DANCE) return

            isDancing = true
            if (!hasDanced) {
                hasDanced = true
                startNpcDance()
            }
            sceneMessageBus.emit('updateDanceMeter', {})

            // Set a timer to reset isClapping after a certain duration
            danceCooldownTimer = utils.timers.setTimeout(() => {
                isDancing = false
                danceCooldownTimer = 0

                // Update needle when the timer expires
                sceneMessageBus.emit('updateDanceMeter', {})
            }, COOLDOWN_TIME)
        }
    })

    // Update the dance meter for all players
    sceneMessageBus.on('updateDanceMeter', () => {
        danceMeter.updateNeedle(10)
        console.log('updated message bus')

        if (danceMeterFull) {
            // Trigger an action when the dance meter is full
            if (QuestManager.currentQuestType() == QuestType.DANCE) {
                canDance = false
                engine.removeEntity(lights)
                danceMeter.stopUpdate()
                QuestManager.nextStep()
                QuestManager.endQuest()
            }
        }
    })
}

function startNpcDance() {
    danceNpcs.forEach(e => {
        const av = AvatarShape.getMutable(e)
        av.expressionTriggerId = dances[Math.floor(Math.random() * dances.length)]
    })
    AvatarShape.getMutable(NPCManager.lostNpc).expressionTriggerId = "dance"
}

export function removeDanceNpcs() {
    danceNpcs.forEach(e => {
        engine.removeEntity(e)
    })
}

export function startParty() {
    lights = engine.addEntity()
    GltfContainer.create(lights, {
        src: "assets/partyArea/lights.glb",
    })
    Transform.create(lights, {
        parent: mainTree
    })
    AudioSource.getMutable(partyBGM).playing = false
    AudioSource.getMutable(partyBGMLoud).playing = true

    // Add trigger for finding party area
    const trigger = engine.addEntity()
    // MeshRenderer.setBox(trigger)
    Transform.create(trigger, {
        position: Vector3.create(57, 21, 17),
        scale: Vector3.create(10, 5, 10)
    })

    utils.triggers.oneTimeTrigger(
        trigger,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box' }],
        function (otherEntity) {
            // console.log(`triggered by ${otherEntity}!`)
            QuestManager.nextStep()
        }
    )
}