import { CONFIG } from "../config"

export type ClaimConfigInstType = {
    campaign: string,
    campaignKeys: Record<string, string>
}

const TEST_CAMPAIGN_ID = '91b33aec-8afd-48fe-a3e4-04882ef66d7b'
//non captcha
const TEST_CAMPAIGN_KEY = 'qpb9r3ttTAGTnDopTqjBMpGzOuyK/Uj+o+QEiC72bXs=.3/i0YE0m8TeRjUppz2+xkXt5o/wjQJhYOcgeyc6GWB4='


export const ClaimConfig = {
    rewardsServer: 'https://rewards.decentraland.org',
    campaign: {
        CAMPAIGN_TEST: {
            campaign: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : '91b33aec-8afd-48fe-a3e4-04882ef66d7b',
            campaignKeys: {
                KEY_0: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : "qpb9r3ttTAGTnDopTqjBMpGzOuyK/Uj+o+QEiC72bXs=.3/i0YE0m8TeRjUppz2+xkXt5o/wjQJhYOcgeyc6GWB4=",
                KEY_1: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : "4/cHQIphQ52BgRzFYXQGqJGzOuyK/Uj+o+QEiC72bXs=.UxCJ+FsZW50HGWraMBYS86fMUkBgOjCOIMxfw0jXoTY="
            },
        },
    },
 
}