import {  ColliderLayer, engine, GltfContainer, Transform, VideoState, MeshCollider, MeshRenderer, pointerEventsSystem, PointerEvents, InputAction } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math';
import { CONFIG } from "../config";
import { claimToken } from "./claim";
import { ClaimConfig } from "./claimConfig";
import { openUI } from '../ui/claim.ui';
import * as utils from '@dcl-sdk/utils'


  export function createReward() {

      console.log('creating reward')
      CONFIG.init()

      let dispenser = engine.addEntity()
      Transform.create(dispenser, {
        position: Vector3.create(48, 73.4, 48),
        scale: Vector3.create(2, 2, 2)
      })

      GltfContainer.create(dispenser, {
        src: 'assets/dispenser.glb',
        invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER,
      })
    
      utils.perpetualMotions.startRotation(dispenser, Quaternion.fromEulerDegrees(0, 25, 0))
      pointerEventsSystem.onPointerDown(
        {
          entity: dispenser,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Claim Gift',
            maxDistance: 16
          }
        },
        function () {
          openUI('images/star.png', 'Surprise Gift!')
          let camp = ClaimConfig.campaign.CAMPAIGN_TEST
          claimToken(camp, camp.campaignKeys.KEY_0)
          console.log('claimed gift 1')
          utils.timers.setTimeout(() => {engine.removeEntity(dispenser)}, 5000)
        }
      )
    
      
      
      }
    