import ReactEcs, { Label, UiEntity, Button } from "@dcl/sdk/react-ecs"
import { QuestManager } from "../questManager"
import { UiCanvasInformation, engine } from "@dcl/sdk/ecs"
import { THEME, UI_ATLAS, coords, getUVs } from "../utils"
import { Color4, Vector3 } from "@dcl/sdk/math"
import VLM from "vlm-dcl"
import { refreshStream } from "../claim-dropin/rewards"
import { movePlayerTo } from "~system/RestrictedActions"

let icon = 'images/thumbnail.png'

class questHud {
    module() {
        const questSteps = QuestManager.getCurrentSteps();
        return (
            <UiEntity
                uiTransform={{
                    width: 380,
                    height: 100 + questSteps.length * 80,
                    padding: 4,
                    flexDirection: 'column',
                    positionType: "absolute",
                    position: `10% 0 0 ${UiCanvasInformation.get(engine.RootEntity).width - 400}`
                }}
                uiBackground={{
                    textureMode: "stretch",
                    uvs: getUVs(coords.questBG),
                    texture: {
                        src: UI_ATLAS
                    }
                }}
                onMouseDown={() => { }}
            >
                <UiEntity
                    uiTransform={{
                        width: 230,
                        height: 90,
                        padding: 4,
                        flexDirection: 'column',
                        positionType: "absolute",
                        position: '-50px 0 0 75px'
                    }}
                    uiBackground={{
                        textureMode: "stretch",
                        uvs: getUVs(coords.questHeader),
                        texture: {
                            src: UI_ATLAS
                        }
                    }}
                >
                    <Label
                        value={`QUEST`}
                        fontSize={24}
                        color={THEME.COLOR}
                        uiTransform={{ width: '100%', height: 30, margin: '22px 0 0 0' }}
                    />
                </UiEntity>

                {questSteps.map((v, i) => (
    <UiEntity
        key={i}
        uiTransform={{
            width: 260, // Set the width explicitly
            height: 350,
            position: '35 0 0 80',
            padding: 4,
            flexDirection: 'row'
        }}
        uiBackground={{
            textureMode: "stretch",
            uvs: getUVs(coords.quest),
            texture: {
                src: UI_ATLAS
            }
        }}
    >
        <UiEntity
            uiTransform={{
                width: 80,
                height: 80,
                positionType: 'absolute',
                position: '0 0 0 -90',
                padding: 4,
            }}
            uiBackground={{
                textureMode: "stretch",
                uvs: getUVs(v.complete ? coords.quest_done : coords.quest_todo),
                texture: {
                    src: UI_ATLAS
                }
            }}
        ></UiEntity>
        <Label
            value={`${v.text}`}
            fontSize={18}
            color={THEME.COLOR}
            uiTransform={{ width: '100%', height: '100%', margin: '-2 0 0 0' }}
            textAlign="middle-center"
        />
    </UiEntity>
))}
                
                <UiEntity
                    uiTransform={{
                        positionType: 'relative',
                        width: '28.5%',
                        height: 575,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        position: {
                            top: '0%',
                            right: '0%',
                            bottom: '0%',
                            left: '70%'
                        },
                        padding: 4,
                    }}
                >
                    <UiEntity
                        uiTransform={{
                            margin: '8px 8px 0 0', // Push to the bottom-right corner
                            flexDirection: 'column', // Stack in reverse order
                            justifyContent: 'space-evenly',
                            alignItems: 'flex-end', // Align items to the right
                        }}
                    >
                       
                        <Button
                            uiTransform={{ width: 100, height: 60, margin: '150 0 -400px 100' }}
                            value='Teleport \n to Party'
                            variant='primary'
                            fontSize={16}
                            color={Color4.White()}
                            uiBackground={{
                                color: Color4.Black()
                            }}
                            onMouseDown={() => {
                                
                                refreshStream()
                                console.log('clicked refresh')
                                movePlayerTo(
                                                {
                                                   newRelativePosition: Vector3.create(48, 74, 68) // oasis
                                                 }
                                               )
                            }}
                            
                        />
                         <Button
                            uiTransform={{ width: 100, height: 60, margin: '420 0 -800px 100' }}
                            value='Refresh \n Music'
                            variant='primary'
                            fontSize={16}
                            color={Color4.White()}
                            uiBackground={{
                                color: Color4.Black()
                            }}
                            onMouseDown={() => {
                                
                                refreshStream()
                                console.log('clicked refresh')
                                movePlayerTo(
                                                {
                                                   newRelativePosition: Vector3.create(48, 74, 68) // oasis
                                                 }
                                               )
                            }}
                            />
                    </UiEntity>
                    
                </UiEntity>
            </UiEntity>
        )
    }
}
<Button value={""}/>


export const QuestHUD = new questHud();
