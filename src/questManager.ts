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
                new QuestStep("Find 3 seeds"),
                new QuestStep("Plant the seeds"),
                new QuestStep("Water the seeds")
            ]
        ),
        new Quest(
            QuestType.WISHING_WELL,
            "Write a message at the wishing well",
            [
                new QuestStep("Find 8 scrolls"),
                new QuestStep("Make a wish at the well")
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
    }

    currentQuestType(): QuestType {
        return this.quests[this.currentIndex].type
    }

    checkProgress() {
        if (this.currentIndex < this.quests.length) {
            const currenqtQ = this.quests[this.currentIndex]
            // check if current quest is complete
            for (let i = 0; i < currenqtQ.steps.length; i++) {
                if (!currenqtQ.steps[i].complete) {
                    console.log("quest not complete")
                    return
                }
            }
            currenqtQ.complete = true
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
                this.checkProgress()
                return
            }
        }
    }

    nextQuest() {
        if (this.currentIndex + 1 < this.quests.length && this.quests[this.currentIndex].complete) {
            this.currentIndex++
            this.startQuest()
            // check if all quests complete
            if (this.currentIndex + 1 >= this.quests.length) {

            }
        } else {
            console.log("No quests left!")
        }
    }
}

export const QuestManager = new QuestM()