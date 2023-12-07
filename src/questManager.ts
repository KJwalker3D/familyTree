import { Quest } from "./classes/quest"

class QuestM {
    currentIndex: number = 0
    quests: Quest[] = [
        new Quest(
            "Talk to Tala"
        ),
        // new Quest(
        //     "Dance at treehouse"
        // ),
        new Quest(
            "Find, plant and water seeds",
            10
        ),
        new Quest(
            "Write a message at the wishing well",
        ),
        new Quest(
            "Answer trivia questions",
            5
        ),
        new Quest(
            "Guide the lost player back home",
        ),
        new Quest(
            "Create pixel art!",
        ),
    ]

    constructor() {
        this.quests[0].hidden = false
    }

    checkProgress() {
        if (this.currentIndex < this.quests.length) {
            const currenqtQ = this.quests[this.currentIndex]
            // check if current quest is complete
            if (currenqtQ.progress >= currenqtQ.goal || currenqtQ.complete) {
                currenqtQ.progress = currenqtQ.goal
                currenqtQ.complete = true
                if (this.currentIndex + 1 < this.quests.length) {
                    this.quests[this.currentIndex + 1].hidden = false
                }
                this.currentIndex++
            }
            // check if all quests complete
            if (this.currentIndex + 1 >= this.quests.length) {

            }
        } else {
            console.log("No quests left!")
        }
    }

    makeProgress() {
        if (this.currentIndex < this.quests.length) {
            const currenqtQ = this.quests[this.currentIndex]
            if (currenqtQ.progress < currenqtQ.goal || !currenqtQ.complete) {
                currenqtQ.progress++
            }
            this.checkProgress()
        } else {
            console.log("No quests left!")
        }
    }
}

export const QuestManager = new QuestM()