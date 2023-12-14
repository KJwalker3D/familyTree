import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { PixelCanvas } from './classes/pixelCanvas'
import { addAssets } from './foliageTests'
import { MAX_WELL_MESSAGES, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS } from './utils'
import { setupUi } from './ui'
import { Seed } from './classes/seed'
import { addDanceManager } from './danceManager'
import { addImagePlanes, imagePositions, imageRotations, imageLinks, blogLinks } from './blogImages'
import { engine, Transform, TextShape, executeTask, AudioSource } from '@dcl/ecs'
import { createPainterPlatform } from './painterPlatform'
import { getMessages, publishMessage } from './serverHandler'
import * as utils from '@dcl-sdk/utils'
import { createMemoryLaneAnim, createOasisAssets, createWishingWellAnim } from './treehouseAnimations'

// Asset update explanation just in case
// Garden folder contains garden assets positioned (will work with the tree transform) including glow effects for seeds
// Haven't removed previous garden assets, but renamed with -0,0 extension as they are not positioned - we can delete them if not needed
// Party area contains lights as we'll add these in separately without colliders
// Wishing well folder contains scrolls to collect positioned (with the tree transform) and toonshaders for each in case we can implement them :)
// In process of adding blog images to memory lane area in blogimages.ts

export function main() {
  setupUi()
  addAssets()
  addAmbientSound()
  addImagePlanes(imagePositions, imageRotations, imageLinks, blogLinks)
  createPainterPlatform()
  createMemoryLaneAnim()
  createWishingWellAnim()
  createOasisAssets()

  new PixelCanvas({
    position: Vector3.create(62, 75.2, 83),
    rotation: Quaternion.fromEulerDegrees(0, 177, 0),
    scale: Vector3.create(1.5, 1.5, 1.5)
  }, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS)

  for (let i = 0; i < 20; i++) {
    new Seed({ position: Vector3.create(4 + (i * 2), 0, 4), rotation: Quaternion.fromEulerDegrees(i * 45, i * 45, i * 30), scale: Vector3.One() })
  }

  // adding in clap meter and needle models which we can adapt to be a dance-o-meter for the first party area
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