import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { addAssets } from './foliageTests'
import { MAX_WELL_MESSAGES } from './utils'
import { setupUi } from './ui'
import { addDanceManager } from './danceManager'
import { addImagePlanes, imagePositions, imageRotations, imageLinks, blogLinks } from './blogImages'
import { engine, Transform, TextShape, executeTask, AudioSource } from '@dcl/ecs'
import { createPainterPlatform } from './painterPlatform'
import { getMessages, publishMessage } from './serverHandler'
import * as utils from '@dcl-sdk/utils'
import { createMemoryLaneAnim, createOasisAssets, createWishingWellAnim } from './treehouseAnimations'
import { CanvasManager } from './canvasManager'


export function main() {
  setupUi()
  addAssets()
  addAmbientSound()
  addImagePlanes(imagePositions, imageRotations, imageLinks, blogLinks)
  createPainterPlatform()
  createMemoryLaneAnim()
  createWishingWellAnim()
  createOasisAssets()

  CanvasManager.activate()

  addDanceManager() // TODO: adapt to dance-o-meter and place in party area


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


  // publishMessage("test123")
}


function addAmbientSound() {
  const ambientEntity = engine.addEntity()
  AudioSource.create(ambientEntity, {
    audioClipUrl: "sound/ambient.mp3",
    playing: true,
    volume: 0.3,
  })
  Transform.create(ambientEntity, {
    position: Vector3.create(0, 1, 0),
    parent: engine.CameraEntity
  })
}