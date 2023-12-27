import { CanvasManager } from "./canvasManager"
import { createEmoteReward, createWearableReward } from "./claim-dropin/rewards"
import { Quest, QuestStep, QuestType } from "./classes/quest"
import { removeDanceNpcs, startParty } from "./danceManager"
import { GardenManager } from "./gardenManager"
import { NPCManager } from "./npcManager"
import { WishManager } from "./wishManager"
import *  as  ui from 'dcl-ui-toolkit'


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
                new QuestStep("Find 3 seed(s)"),
                new QuestStep("Plant the seeds"),
                new QuestStep("Water the seeds")
            ]
        ),
        new Quest(
            QuestType.WISHING_WELL,
            "Write a message at the wishing well",
            [
                new QuestStep("Find 8 scroll(s)"),
                new QuestStep("Make a wish at the well")
            ]
        ),
        new Quest(
            QuestType.TRIVIA,
            "Answer trivia questions",
            [
                new QuestStep("Answer trivia")
            ]

        ),
        new Quest(
            QuestType.GUIDE,
            "Guide the lost player back home",
            [
                new QuestStep("Find lost player"),
                new QuestStep("Return to Tala")
            ]
        ),
        new Quest(
            QuestType.PIXEL_ART,
            "Create pixel art!",
            [
                new QuestStep("Create pixel art!")
            ]
        ),
    ]

    questCompleteImage: ui.CenterImage

    constructor() {
        this.questCompleteImage = ui.createComponent(ui.CenterImage,
            {
                image: "images/QuestCompleteUI-min.png",
                duration: 3,
                startHidden: true
            }
        )
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
        else if (this.currentQuestType() == QuestType.PIXEL_ART) {
            CanvasManager.activate()
            this.nextStep()
            // give poap
        }
    }

    endQuest() {
    
       // this.questCompleteImage.show(2.5) testing without quest complete ui
        NPCManager.endQuest()
        if (this.currentQuestType() == QuestType.TALK_TALA) {
            startParty()
        }
        else if (this.currentQuestType() == QuestType.DANCE) {
            // give wearable(?)
           // createWearableReward() creating multiple instances
        }
        else if (this.currentQuestType() == QuestType.SEEDS) {
            WishManager.getInstance().activate()
        }
        else if (this.currentQuestType() == QuestType.WISHING_WELL) {
            // give emote(?)
           // createEmoteReward() creating multiple instances
        }
        else if (this.currentQuestType() == QuestType.TRIVIA) {
            removeDanceNpcs()
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