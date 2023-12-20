import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { addAssets } from './foliageTests'
import { setupUi } from './ui'
import { addDanceManager } from './danceManager'
import { addImagePlanes, imagePositions, imageRotations, imageLinks, blogLinks } from './blogImages'
import { engine, Transform, TextShape, executeTask, AudioSource } from '@dcl/ecs'
import { createPainterPlatform } from './painterPlatform'
import { createMemoryLaneAnim, createOasisAssets, createWishingWellAnim } from './treehouseAnimations'
import { CanvasManager } from './canvasManager'
import VLM from "vlm-dcl";
import { QuickCreator } from "vlm-dcl";


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

  VLM.init();

  new QuickCreator.VideoScreen({
    liveUrl: 'https://player.vimeo.com/external/884357758.m3u8?s=172724121da5409c84cd3c61110e463e117ff000&logging=false',
    playlist: ['https://player.vimeo.com/external/846377397.m3u8?s=e10760f6550f98b124bef4fc8c0367b7e0e20d1e&logging=false'],
    position: { x: 15, y: 1, z: 1},
    scale: { x: 1.92+3, y: 1.08+3, z: 1},
    rotation: { x: 0, y: 0, z: 0}
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