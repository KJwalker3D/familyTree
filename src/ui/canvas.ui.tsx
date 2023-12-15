import { UiCanvasInformation, engine } from "@dcl/sdk/ecs"
import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs"
import { coords, getUVs, THEME, UI_ATLAS, UI_PALETTE } from "../utils"
import { CanvasManager } from "../canvasManager"


class canvasHud {
    module() {
        return (
            <UiEntity
                uiTransform={{
                    width: 250,
                    height: 150,
                    // margin: '128px 0 0 0',
                    padding: 4,
                    flexDirection: 'column',
                    positionType: "absolute",
                    position: `${UiCanvasInformation.get(engine.RootEntity).height - 170} 0 0 ${UiCanvasInformation.get(engine.RootEntity).width - 270}`
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
                        width: 150,
                        height: 70,
                        // margin: '128px 0 0 0',
                        padding: 4,
                        flexDirection: 'column',
                        positionType: "absolute",
                        position: '-40px 0 0 50px'
                    }}
                    uiBackground={{
                        textureMode: "stretch",
                        uvs: getUVs(coords.questHeader),
                        texture: {
                            src: UI_ATLAS
                        }
                        // color: Color4.Black()
                    }}
                >
                    <Label
                        value={`PIXEL ART`}
                        fontSize={18}
                        color={THEME.COLOR}
                        uiTransform={{ width: '100%', height: 30, margin: '12px 0 0 0' }}
                    />
                    {CanvasManager.colors.map((v, i) => {
                        return (
                            <UiEntity
                                uiTransform={{
                                    width: CanvasManager.colorIndex == i ? 45 : 35,
                                    height: CanvasManager.colorIndex == i ? 45 : 35,
                                    positionType: 'absolute',
                                    position: `${65 + (Math.floor(i / 4) * 33) - (CanvasManager.colorIndex == i ? 5 : 0)} 0 0 ${0 + i * 40 - (CanvasManager.colorIndex == i ? 5 : 0) - (Math.floor(i / 4) * 160)}`,
                                    padding: 4,
                                    flexDirection: 'column'
                                }}
                                uiBackground={{
                                    textureMode: "stretch",
                                    uvs: getUVs(v),
                                    texture: {
                                        src: UI_PALETTE
                                    }
                                }}
                                onMouseDown={() => { CanvasManager.colorIndex = i }}
                            >
                            </UiEntity>
                        )
                    })
                    }
                </UiEntity>
            </UiEntity>
        )
    }
}

export const CanvasHUD = new canvasHud()