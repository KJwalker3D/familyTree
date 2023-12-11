import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { PixelCanvas } from './classes/pixelCanvas'
import { addAssets } from './foliageTests'
import { PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS } from './utils'
import { setupUi } from './ui'
import { addNPCs } from './npcs'
import { Seed } from './classes/seed'
import { ColliderLayer, GltfContainer, InputAction, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { addDanceManager } from './danceManager'
import { addImagePlanes, imagePositions, imageRotations, imageLinks, blogLinks } from './blogImages'
import { GardenManager } from './gardenManager'
// Asset update explanation just in case
// Garden folder contains garden assets positioned (will work with the tree transform) including glow effects for seeds
// Haven't removed previous garden assets, but renamed with -0,0 extension as they are not positioned - we can delete them if not needed
// Party area contains lights as we'll add these in separately without colliders
// Wishing well folder contains scrolls to collect positioned (with the tree transform) and toonshaders for each in case we can implement them :)
// In process of adding blog images to memory lane area in blogimages.ts

export function main() {
  setupUi()
  addAssets()
  addNPCs()
  addImagePlanes(imagePositions, imageRotations, imageLinks, blogLinks)

  GardenManager.getInstance().activate()


  new PixelCanvas({
    position: Vector3.create(2, 1, 2),
    rotation: Quaternion.Zero(),
    scale: Vector3.One()
  }, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS)

  for (let i = 0; i < 20; i++) {
    new Seed({ position: Vector3.create(4 + (i * 2), 0, 4), rotation: Quaternion.fromEulerDegrees(i * 45, i * 45, i * 30), scale: Vector3.One() })
  }

  // adding in clap meter and needle models which we can adapt to be a dance-o-meter for the first party area
  addDanceManager() // TODO: adapt to dance-o-meter and place in party area


}
