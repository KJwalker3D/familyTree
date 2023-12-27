import {
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Cube } from './components'
import { QuestHUD } from './ui/quest.ui'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { movePlayerTo } from '~system/RestrictedActions'
import *  as  ui from 'dcl-ui-toolkit'
import { CanvasHUD } from './ui/canvas.ui'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => [
  (
    <UiEntity
      uiTransform={{
        width: 400,
        height: 80,
        margin: '16px 0 8px 270px',
        padding: 4,
        flexDirection: 'column'
      }}
      uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
      >
        <Button
          uiTransform={{ width: 100, height: 40, margin: 8 }}
          value='Dance'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            movePlayerTo(
              {
                newRelativePosition: Vector3.create(66, 21, 23) // dance
              }
            )
          }}
        />
        <Button
          uiTransform={{ width: 100, height: 40, margin: 8 }}
          value='Garden'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            movePlayerTo(
              {
                newRelativePosition: Vector3.create(63, 30, 59) // garden
              }
            )
          }}
        />
        <Button
          uiTransform={{ width: 100, height: 40, margin: 8 }}
          value='Well'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            movePlayerTo(
              {
                newRelativePosition: Vector3.create(15, 41, 56) // wishing well
              }
            )
          }}
        />
        <Button
          uiTransform={{ width: 100, height: 40, margin: 8 }}
          value='Trivia'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            movePlayerTo(
              {
                newRelativePosition: Vector3.create(45, 54, 16) // trivia
              }
            )
          }}
        />
        <Button
          uiTransform={{ width: 100, height: 40, margin: 8 }}
          value='Oasis'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            movePlayerTo(
              {
                newRelativePosition: Vector3.create(48, 74, 75) // oasis
              }
            )
          }}
        />
      </UiEntity>
    
    
    </UiEntity>
  )
  ,
  <NpcUtilsUi />,
  QuestHUD.module(),
  CanvasHUD.module(),
  ui.render()
]


function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

