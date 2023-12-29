import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { addAssets } from './foliageTests'
import { setupUi } from './ui'
import { addDanceManager } from './danceManager'
import { addImagePlanes, imagePositions, imageRotations, imageLinks, blogLinks } from './blogImages'
import { engine, Transform, TextShape, executeTask, AudioSource } from '@dcl/ecs'
import { createPainterPlatform } from './painterPlatform'
import { createMemoryLaneAnim, createOasisAssets, createWishingWellAnim } from './treehouseAnimations'
import VLM from "vlm-dcl";
import { QuickCreator } from "vlm-dcl";
import { createEmoteReward, createReward, createWearableReward } from './claim-dropin/rewards'
import { addTestCube } from '@dcl-sdk/utils'
import { CanvasManager } from './canvasManager'


export function main() {
 
  //Box cover
  
  /*
  addTestCube({
    position: Vector3.create(48, 40, 48),
    scale: Vector3.create(60, 100, 60),
  }, undefined, undefined, Color4.create(0, 0, 0, 0), false, false)
  */
 
 setupUi()
 
  addAssets()
  addAmbientSound()
  addImagePlanes(imagePositions, imageRotations, imageLinks, blogLinks)
  createPainterPlatform()
  createMemoryLaneAnim()
  createWishingWellAnim()
  createOasisAssets()
  createReward() 
  //waiting on foundation dispenser

  CanvasManager.activate()

  addDanceManager() // TODO: adapt to dance-o-meter and place in party area

  VLM.init();
 

  new QuickCreator.VideoScreen({
    liveUrl: '',
    playlist: [''],
    position: { x: 15, y: 1, z: 1},
    scale: { x: 0, y: 0, z: 0},
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