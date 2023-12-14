import { MessageBus } from '@dcl/sdk/message-bus'
import { COOLDOWN_TIME, DanceMeter, danceMeterFull } from './classes/danceMeter'
import * as utils from '@dcl-sdk/utils'
import { onPlayerExpressionObservable } from '@dcl/sdk/observables'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { Vector3 } from '@dcl/sdk/math'
import { GltfContainer, Transform, engine } from '@dcl/sdk/ecs'
import { mainTree } from './foliageTests'


export let isDancing: boolean = false

export function addDanceManager() {
    const lights = engine.addEntity()
    GltfContainer.create(lights, {
        src: "assets/partyArea/lights.glb",
    })
    Transform.create(lights, {
        parent: mainTree
    })


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
        if (expressionId == 'dance' || expressionId == 'robot' || expressionId == 'tik' || expressionId == 'hammer' || expressionId == 'tektonik' || expressionId == 'disco') {
            console.log('dance detected')
            if (QuestManager.currentQuestType() != QuestType.DANCE) return
            isDancing = true
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
                QuestManager.makeProgress()
            }
        }
    })
}