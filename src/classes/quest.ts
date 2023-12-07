export class Quest {
    text: string
    progress: number = 0
    goal: number
    complete: boolean = false
    hidden: boolean = true

    constructor(text: string, goal: number = 1) {
        this.text = text
        this.goal = goal
    }
}