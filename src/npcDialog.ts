import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { NPCManager } from './npcManager'
import { Vector3 } from '@dcl/sdk/math'


export const talaDialog: npc.Dialog[] = [
    { // 0 TALA TALK QUEST
        text: "Hey there, adventurer! Welcome to our End-of-Year Bash in the heart of Decentraland.\n\nI'm Tala, your guide for this epic journey."
    },
    { // 1
        text: "While you're exploring, you'll stumble upon our wild party zone, the chill garden, the wishing well, Memory Lane, and the ultra-cool Digital Nomad’s Oasis."
    },
    { // 2
        text: "Ready to dive into a quest filled with nostalgia and celebration?",
        isQuestion: true,
        buttons: [
            {
                label: "Not yet.",
                goToDialog: 3
            },
            {
                label: "Yes!",
                goToDialog: 4
            },
        ]
    },
    { // 3
        text: "See you!",
        isEndOfDialog: true
    },
    { // 4
        text: "Time to hit the dance floor, my friend! Our parties are legendary, setting the vibe for our gatherings. But there's more to our hangouts, as you'll soon find in the upcoming tree houses.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            // Start dance quest
            if (QuestManager.currentQuestType() == QuestType.TALK_TALA) {
                QuestManager.makeProgress()

            }
        }
    },
    { // 5 DANCE QUEST
        text: "Your first task: find the party area, and show me your sickest dance moves! There’s a dance-meter in the party area that will fill up as you dance, I’ll join you when it’s full. Let the celebrations kick off!",
        isEndOfDialog: true,
    },
    { // 6
        text: "Damn, those moves were fire! Here's a little something for your efforts.\n\nNow, follow me to the next part of our quest!",

    },
    { // 7
        text: "Next stop, our secret garden, where ideas take root and bloom. It’s a chill spot where we plant the seeds of growth.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTalaNoDialog()
            npc.followPath(NPCManager.talaNpc, {
                path: NPCManager.pathToGarden,
                totalDuration: 6,
                onFinishCallback: () => {
                    NPCManager.createTala(NPCManager.talaPositions[2], talaDialog, 8)
                }
            })
        }
    },
    { // 8 SEED QUEST
        text: "Your mission is to plant some seeds of your own! You’ll need to find the seeds first though, plant them in the middle here and water ‘em to watch the magic unfold.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTalaNoDialog()
            npc.followPath(NPCManager.talaNpc, {
                path: NPCManager.pathAtGarden,
                totalDuration: 6,
                onFinishCallback: () => {
                    NPCManager.createTala(NPCManager.talaPositions[3], talaDialog, 9)
                }
            })
        }
    },
    { // 9 SEED QUEST    
        text: "Your mission is to plant some seeds of your own! You’ll need to find the seeds first though, plant them in the middle here and water ‘em to watch the magic unfold.",
        isEndOfDialog: true,
    },
    { // 10
        text: "Your plants are thriving! From tiny seeds to this beauty – impressive, right?\nReady for the next chapter?",
        isQuestion: true,
        buttons: [
            {
                label: "Not yet.",
                goToDialog: 11
            },
            {
                label: "Yes!",
                goToDialog: 12
            },
        ]
    },
    { // 11
        text: "See you!",
        isEndOfDialog: true
    },
    { // 12
        text: "Let's go!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTalaNoDialog()
            npc.followPath(NPCManager.talaNpc, {
                path: NPCManager.pathToWell,
                totalDuration: 10,
                onFinishCallback: () => {
                    NPCManager.createTala(NPCManager.talaPositions[5], talaDialog, 13)
                }
            })
        }
    },
    { // 13
        text: "As dreamers, we've got a Community Wishing Well. Collect the scrolls, jot down your wish, and toss it in the well. Who knows, maybe others are wishing for the same rad stuff!",
        isEndOfDialog: true
    },
    { // 14
        text: "May your wish vibe with the community dreams. Take this token as a reminder.\nReady for the next adventure?",
        isQuestion: true,
        buttons: [
            {
                label: "Not yet.",
                goToDialog: 15
            },
            {
                label: "Yes!",
                goToDialog: 16
            },
        ]
    },
    { // 15
        text: "See you!",
        isEndOfDialog: true
    },
    { // 16
        text: "Memories shape our journey, so we made Memory Lane to share some moments from 2023. There are so many more to add though, we could fill the whole tree!"
    },
    { // 17
        text: "Anyway, hit up Memory Lane, answer questions about the past year, and you're almost at the Digital Nomad’s Oasis, where the real party's at!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTala(NPCManager.talaPositions[5], talaDialog, 18)
        }
    },
    { // 18
        text: "Hit up Memory Lane, answer questions about the past year, and you're almost at the Digital Nomad’s Oasis, where the real party's at!",
        isEndOfDialog: true
    }



]