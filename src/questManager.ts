import { Quest, QuestStep, QuestType } from "./classes/quest"
import { startParty } from "./danceManager"
import { GardenManager } from "./gardenManager"
import { NPCManager } from "./npcManager"


class QuestM {
    currentIndex: number = 0
    quests: Quest[] = [
        new Quest(
            QuestType.TALK_TALA,
            "Talk to Tala",
            [
                new QuestStep("Talk to Tala")
            ]
        ),
        new Quest(
            QuestType.DANCE,
            "Dance at treehouse",
            [
                new QuestStep("Find party area"),
                new QuestStep("Dance your heart out")
            ]
        ),
        new Quest(
            QuestType.SEEDS,
            "Find, plant and water seeds",
            [
                new QuestStep("Find the seeds"),
                new QuestStep("Plant the seeds"),
                new QuestStep("Water the seeds")
            ]
        ),
        new Quest(
            QuestType.WISHING_WELL,
            "Write a message at the wishing well",
            [
                new QuestStep("Talk to Tala")
            ]
        ),
        new Quest(
            QuestType.TRIVIA,
            "Answer trivia questions",
            [
                new QuestStep("Talk to Tala")
            ]

        ),
        new Quest(
            QuestType.GUIDE,
            "Guide the lost player back home",
            [
                new QuestStep("Talk to Tala")
            ]
        ),
        new Quest(
            QuestType.PIXEL_ART,
            "Create pixel art!",
            [
                new QuestStep("Talk to Tala")
            ]
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
                this.endQuest()
                currenqtQ.progress = currenqtQ.goal
                currenqtQ.complete = true
                if (this.currentIndex + 1 < this.quests.length) {
                    this.quests[this.currentIndex + 1].hidden = false
                }
                this.currentIndex++
                this.startQuest()
            }
            // check if all quests complete
            if (this.currentIndex + 1 >= this.quests.length) {

            }
        } else {
            console.log("No quests left!")
        }
    }

    startQuest() {
        NPCManager.startQuest()
        if (this.currentQuestType() == QuestType.SEEDS) {
            GardenManager.getInstance().activate()
        }
    }

    endQuest() {
        NPCManager.endQuest()
        if (this.currentQuestType() == QuestType.TALK_TALA) {

            startParty()
        }
        else if (this.currentQuestType() == QuestType.DANCE) {
            // give wearable(?)
        }
    }

    getCurrentSteps() {
        return this.quests[this.currentIndex].steps
    }

    nextStep() {
        const steps = this.getCurrentSteps()
        for (let i = 0; i < steps.length; i++) {
            if (!steps[i].complete) {
                steps[i].complete = true
                if (i + 1 == steps.length) this.makeProgress()
                return
            }
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