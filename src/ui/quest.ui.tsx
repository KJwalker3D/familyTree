import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs"
import { QuestManager } from "../questManager"
import { UiCanvasInformation, engine } from "@dcl/sdk/ecs"
import { THEME, UI_ATLAS, coords, getUVs } from "../utils"

class questHud {
    module() {
        const questSteps = QuestManager.getCurrentSteps()
        return (
            <UiEntity
                uiTransform={{
                    width: 380,
                    height: 100 + questSteps.length * 80,
                    // margin: '128px 0 0 0',
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
                        // margin: '128px 0 0 0',
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
                        // color: Color4.Black()
                    }}
                >
                    <Label
                        value={`QUEST`}
                        fontSize={24}
                        color={THEME.COLOR}
                        uiTransform={{ width: '100%', height: 30, margin: '22px 0 0 0' }}
                    />
                </UiEntity>

                {questSteps.map((v, i) => {
                    return (
                        <UiEntity
                            uiTransform={{
                                width: 260,
                                height: 80,
                                position: '35 0 0 80',
                                padding: 4,
                                flexDirection: 'column'
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
                            >
                            </UiEntity>
                            <Label
                                value={`${v.text}`}
                                fontSize={18}
                                color={THEME.COLOR}
                                uiTransform={{ width: '100%', height: '100%', margin: '-2 0 0 0' }}
                                textAlign="middle-center"
                            />
                        </UiEntity>
                    )
                })}
            </UiEntity>
        )
    }
}

export const QuestHUD = new questHud()