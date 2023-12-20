export enum QuestType {
    TALK_TALA, // 0
    DANCE, // 1 
    SEEDS, // 2
    WISHING_WELL, // 3
    TRIVIA, // 4
    GUIDE, // 5
    PIXEL_ART // 6
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