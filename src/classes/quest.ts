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
    complete: boolean = false

    steps: QuestStep[]

    constructor(type: QuestType, text: string, steps: QuestStep[]) {
        this.type = type
        this.text = text
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