import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { addAssets } from './foliageTests'
import { setupUi } from './ui'
import { addDanceManager } from './danceManager'
import { addImagePlanes, imagePositions, imageRotations, imageLinks, blogLinks } from './blogImages'
import { engine, Transform, TextShape, executeTask, AudioSource } from '@dcl/ecs'
import { createPainterPlatform } from './painterPlatform'
import { getMessages, publishMessage } from './serverHandler'
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