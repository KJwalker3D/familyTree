export enum QuestType {
    TALK_TALA,
    DANCE,
    SEEDS,
    WISHING_WELL,
    TRIVIA,
    GUIDE,
    PIXEL_ART
}

export class Quest {
    type: QuestType
    text: string
    progress: number = 0
    goal: number
    complete: boolean = false
    hidden: boolean = true

    steps: QuestStep[]

    constructor(type: QuestType, text: string, steps: QuestStep[], goal: number = 1) {
        this.type = type
        this.text = text
        this.goal = goal
        this.steps = steps
    }
}

export class QuestStep {
    text: string
    complete: boolean = false

    constructor(text: string) {
        this.text = text
    }
}