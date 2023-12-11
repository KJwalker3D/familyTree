import { Quest, QuestType } from "./classes/quest"
import { NPCManager } from "./npcManager"

class QuestM {
    currentIndex: number = 0
    quests: Quest[] = [
        // new Quest(
        //     QuestType.TALK_TALA,
        //     "Talk to Tala"
        // ),
        // new Quest(
        // QuestType.DANCE,
        //     "Dance at treehouse"
        // ),
        new Quest(
            QuestType.SEEDS,
            "Find, plant and water seeds"
        ),
        new Quest(
            QuestType.WISHING_WELL,
            "Write a message at the wishing well",
        ),
        new Quest(
            QuestType.TRIVIA,
            "Answer trivia questions",
            5
        ),
        new Quest(
            QuestType.GUIDE,
            "Guide the lost player back home",
        ),
        new Quest(
            QuestType.PIXEL_ART,
            "Create pixel art!",
        ),
    ]

    constructor() {
        this.quests[0].hidden = false
    }

    currentQuestType(): QuestType {
        return this.quests[this.currentIndex].type
    }

    checkProgress() {
        if (this.currentIndex < this.quests.length) {
            const currenqtQ = this.quests[this.currentIndex]
            // check if current quest is complete
            if (currenqtQ.progress >= currenqtQ.goal || currenqtQ.complete) {
                NPCManager.endQuest()
                currenqtQ.progress = currenqtQ.goal
                currenqtQ.complete = true
                if (this.currentIndex + 1 < this.quests.length) {
                    this.quests[this.currentIndex + 1].hidden = false
                }
                this.currentIndex++
                NPCManager.startQuest()
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