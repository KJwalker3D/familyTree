import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs"
import { QuestManager } from "../questManager"


class questHud {
    questPlaceholder = [
        {
            label: "Talk to NPC",
            progress: 0,
            completion: 1
        }
    ]

    module() {
        return (
            <UiEntity
                uiTransform={{
                    width: '20%',
                    height: 230,
                    margin: '128px 0 8px 79%',
                    padding: 4,
                    flexDirection: 'column'
                }}
                uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
            >
                <Label
                    onMouseDown={() => { console.log('Player Position clicked !') }}
                    value={`Task List`}
                    fontSize={24}
                    uiTransform={{ width: '100%', height: 30 }}
                />
                {QuestManager.quests.map((v, i) => {
                    return (
                        v.hidden ? '' : <Label
                            value={`${v.text}${v.goal > 1 ? `\t\t${v.progress} / ${v.goal}` : ''}`}
                            fontSize={18}
                            color={v.complete ? Color4.Gray() : Color4.White()}
                            uiTransform={{ width: '100%', height: 30 }}
                            textAlign="middle-left"
                        />
                    )
                })}
            </UiEntity>
        )
    }
}


export const QuestHUD = new questHud()