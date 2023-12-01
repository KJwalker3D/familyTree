import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Label, UiEntity } from "@dcl/sdk/react-ecs"


class questHud {
    questPlaceholder = [
        {
            label: "Talk to NPC",
            progress: 0,
            completion: 1
        },
        {
            label: "Collect Seeds",
            progress: 0,
            completion: 10
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
                {this.questPlaceholder.map((v, i) => {
                    return (
                        <Label
                            value={`${v.label}\t\t\t\t${v.progress}/${v.completion}`}
                            fontSize={18}
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