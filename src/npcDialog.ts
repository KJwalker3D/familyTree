import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'


export const talaDialog: npc.Dialog[] = [
    { // 0
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
    { // 5
        text: "Your first task: find the party area, and show me your sickest dance moves! There’s a dance-meter in the party area that will fill up as you dance, I’ll join you when it’s full. Let the celebrations kick off!",
        isEndOfDialog: true,
    },


]