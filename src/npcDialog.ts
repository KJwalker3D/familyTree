import *  as  npc from 'dcl-npc-toolkit'
import { QuestManager } from './questManager'
import { QuestType } from './classes/quest'
import { NPCManager } from './npcManager'
import { createEmoteReward, createWearableReward } from './claim-dropin/rewards'

let hasWearable: boolean = false
let hasEmote: boolean = false

export const lostDialog: npc.Dialog[] = [
    {
        text: "Oh, hey! I got a bit lost in the memories, you know? Totally lost track of time."
    },
    {
        text: "Did Tala send you to find me? Party at the Digital Nomad's Oasis?"
    },
    {
        text: "Count me in! By the way, I heard there's a dope show there soon. Check out the events page so we don't miss the vibe!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            QuestManager.nextStep()
            // Start following player
            NPCManager.startFollowLost()
        }
    }
]

export const talaDialog: npc.Dialog[] = [
    { // 0 TALA TALK QUEST
        text: "Hey there, adventurer! Welcome to our End-of-Year Bash in the heart of Decentraland.\n\nI'm Tala, your guide for this epic journey.",
        triggeredByNext: () => {
            QuestManager.nextStep()
        }
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
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
        }
    },
    { // 4
        text: "Time to hit the dance floor, my friend! Our parties are legendary, setting the vibe for our gatherings. But there's more to our hangouts, as you'll soon find in the upcoming tree houses.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            // Start dance quest
            if (QuestManager.currentQuestType() == QuestType.TALK_TALA) {
                QuestManager.endQuest()
                QuestManager.nextQuest()
            }
        }
    },
    { // 5 DANCE QUEST
        text: "Your first task: find the party area, and show me your sickest dance moves! There’s a dance-meter in the party area that will fill up as you dance, I’ll join you when it’s full. Let the celebrations kick off!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
        }
    },
    { // 6
        text: "Damn, those moves were fire! Here's a little something for your efforts.\n\nNow, follow me to the next part of our quest!",
        triggeredByNext: () => {
            if (!hasWearable) {
                createWearableReward(),
                hasWearable = true
            }
        }
    },
    { // 7
        text: "Next stop, our secret garden, where ideas take root and bloom. It’s a chill spot where we plant the seeds of growth.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTalaNoDialog()
            npc.followPath(NPCManager.talaNpc, {
                path: NPCManager.pathToGarden,
                totalDuration: 8,
                pathType: npc.NPCPathType.SMOOTH_PATH,
                curve: true,
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
            QuestManager.nextQuest()
        }
    },
    { // 9 SEED QUEST    
        text: "Your mission is to plant some seeds of your own! You’ll need to find the seeds first though, plant them in the middle here and water ‘em to watch the magic unfold.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
        }
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
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
        }
    },
    { // 12
        text: "Let's go!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTalaNoDialog()
            npc.followPath(NPCManager.talaNpc, {
                path: NPCManager.pathToWell,
                totalDuration: 12,
                pathType: npc.NPCPathType.SMOOTH_PATH,
                curve: true,
                onFinishCallback: () => {
                    NPCManager.createTala(NPCManager.talaPositions[5], talaDialog, 13)
                }
            })
        }
    },
    { // 13
        text: "As dreamers, we've got a Community Wishing Well. Collect the scrolls, jot down your wish, and toss it in the well. Who knows, maybe others are wishing for the same rad stuff!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            QuestManager.nextQuest()
        }
    },
    { // 14
        text: "May your wish vibe with the community dreams. Take this token as a reminder. Ready for the next adventure?",
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
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
          
        }
    },
    { // 16
        text: "Memories shape our journey, so we made Memory Lane to share some moments from 2023. There are so many more to add though, we could fill the whole tree!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            QuestManager.nextQuest()
            if (!hasEmote) {
                createEmoteReward()
            }
            hasEmote = true

        }
    },
    { // 17 unused
        text: "Anyway, hit up Memory Lane, answer questions about the past year, and you're almost at the Digital Nomad’s Oasis, where the real party's at!",
        isEndOfDialog: true,
        // triggeredByNext: () => {
        //     // give emote(?)
        //     QuestManager.nextQuest()
        //     NPCManager.createTala(NPCManager.talaPositions[6], talaDialog, 18)
        //     NPCManager.createTrivia(NPCManager.talaPositions[7], talaDialog, 19)
        // }
    },
    { // 18
        text: "Hit up Memory Lane, answer questions about the past year, and you're almost at the Digital Nomad’s Oasis, where the real party's at!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
        }
    },
    { // 19
        text: "Ready to start the trivia?",
        isQuestion: true,
        buttons: [
            {
                label: "Not yet.",
                goToDialog: 20
            },
            {
                label: "Yes!",
                goToDialog: 21
            },
        ]
    },
    { // 20
        text: "Come back when you're ready!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.playIdleAnim()
        }
    },
    { // 21
        text: "Who was the first official supermodel of the metaverse?",
        isQuestion: true,
        buttons: [
            {
                label: "Canessa",
                goToDialog: 22
            },
            {
                label: "Gisele",
                goToDialog: 22
            },
            {
                label: "Tangpoko",
                goToDialog: 23 //31 //HERE
            },
            {
                label: "Shibu",
                goToDialog: 22
            },
        ]
    },
    { // 22 incorrect trivia answer
        text: "That doesn't sound right. You can find the answers around Memory Lane!",
        isEndOfDialog: true
    },
    { // 23
        text: "That's correct! Now what was the theme of Metaverse Fashion Week 2023?",
        isQuestion: true,
        buttons: [
            {
                label: "Lucid Dreams",
                goToDialog: 22
            },
            {
                label: "Future Heritage",
                goToDialog: 24
            },
            {
                label: "Rebirth and Regeneration",
                goToDialog: 22
            },
            {
                label: "Dystopia",
                goToDialog: 22
            },
        ]
    },
    { // 24
        text: "Nice one! Tell me, what was the theme of Metaverse Art Week 2023 in Decentraland?",
        isQuestion: true,
        buttons: [
            {
                label: "The metaverse is dead. Long live the metaverse",
                goToDialog: 25
            },
            {
                label: "Creativity in the Age of Decentralization",
                goToDialog: 22
            },
            {
                label: "Conflict and Adversity",
                goToDialog: 22
            },
            {
                label: "Low Poly, High Art",
                goToDialog: 22
            },
        ]
    },
    { // 25
        text: "Wow you're on a roll! Next question, what was the main festival stage for Decentraland Music Festival 2023?",
        isQuestion: true,
        buttons: [
            {
                label: "Sugar Club",
                goToDialog: 22
            },
            {
                label: "MetaTokyo",
                goToDialog: 22
            },
            {
                label: "Bufalo Saloon",
                goToDialog: 22
            },
            {
                label: "TRU Band Room Stage",
                goToDialog: 26
            },
        ]
    },
    { // 26
        text: "You got this! In what month of 2023 did the AI World Fair take place in Decentraland?",
        isQuestion: true,
        buttons: [
            {
                label: "October",
                goToDialog: 27
            },
            {
                label: "September",
                goToDialog: 22
            },
            {
                label: "March",
                goToDialog: 22
            },
            {
                label: "December",
                goToDialog: 22
            },
        ]
    },
    { // 27
        text: "Wow! Do you know what new Wearable category was introduced in 2023 thanks to community members like Nikki and Doki and the Foundation?",
        isQuestion: true,
        buttons: [
            {
                label: "Tiara",
                goToDialog: 22
            },
            {
                label: "Mask",
                goToDialog: 22
            },
            {
                label: "Props",
                goToDialog: 22
            },
            {
                label: "Hands / Handwear",
                goToDialog: 28
            },
        ]
    },
    { // 28
        text: "Next! Which of these is not an AI NPC in Decentraland?",
        isQuestion: true,
        buttons: [
            {
                label: "Aisha",
                goToDialog: 22
            },
            {
                label: "Dodge",
                goToDialog: 22
            },
            {
                label: "Sonic",
                goToDialog: 29
            },
            {
                label: "Simone",
                goToDialog: 22
            },
        ]
    },
    { // 29
        text: "Almost there! What new feature was released this year combining Wearables and coding?",
        isQuestion: true,
        buttons: [
            {
                label: "Wearables 3.0",
                goToDialog: 22
            },
            {
                label: "Smart wearables",
                goToDialog: 30
            },
            {
                label: "Wearables 2.0",
                goToDialog: 22,
            },
            {
                label: "CodeWears",
                goToDialog: 22
            },
        ]
    },
    { // 30
        text: "Last one! What new Emote features did the Emotes 2.0 add?",
        isQuestion: true,
        buttons: [
            {
                label: "AI",
                goToDialog: 22
            },
            {
                label: "Programming",
                goToDialog: 22
            },
            {
                label: "Props",
                goToDialog: 22
            },
            {
                label: "Props and sounds",
                goToDialog: 31
            },
        ]
    },
    { // 31
        text: "Amazing! Our memories make us stronger. Ready for the final chapter?",
        isQuestion: true,
        buttons: [
            {
                label: "Not yet.",
                goToDialog: 32
            },
            {
                label: "Yes!",
                goToDialog: 33
            },
        ]
    },
    { // 32
        text: "Come back when you're ready!",
        isEndOfDialog: true,
        triggeredByNext: () => {
            NPCManager.createTrivia(NPCManager.talaPositions[7], talaDialog, 31)
        }
    },
    { // 33
        text: "The Digital Nomad's Oasis – a haven for creativity. But first, a mission.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            QuestManager.nextStep()
            QuestManager.endQuest()
            QuestManager.nextQuest()
        }
    },
    { // 34
        text: "Your job is to find a lost player from our quest and bring them here. In return, I’ll hook you both up with magic tokens for the special place.",
        isEndOfDialog: true
    },
    { // 35
        text: "You nailed it! The oasis is waiting. When you dive in, go ahead and add your creative touch to our virtual gallery."
    },
    { // 36
        text: "Take this POAP token – mint it on the POAP mobile app with secret word: you-are-awesome. Ready to create your pixel masterpiece in the Oasis?",
        isQuestion: true,
        buttons: [
            {
                label: "Not yet.",
                goToDialog: 37
            },
            {
                label: "Yes!",
                goToDialog: 38
            },
        ]
    },
    { // 37
        text: "Come back when you're ready.",
        isEndOfDialog: true
    },
    { // 38
        text: "Head up to the top of the tree where the oasis awaits.",
        isEndOfDialog: true,
        triggeredByNext: () => {
            QuestManager.nextQuest()
        }
    }
]