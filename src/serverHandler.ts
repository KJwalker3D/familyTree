import { getUserData } from "~system/UserIdentity"

export const fireBaseServer = "https://familytree-93b77-default-rtdb.firebaseio.com/"

// get latest messages data from server
export async function getMessages() {
    const url = fireBaseServer + 'messages.json'
    try {
        const response = await fetch(url)
        let json = await response.json()
        json = Object.keys(json)
            .map(key => ({ name: json[key].name, msg: json[key].msg, date: json[key].date }))
        json.sort(function (a: any, b: any) { return b.date - a.date })
        console.log("getMessages", json)
        return json
    } catch (e) {
        console.log('error fetching messages from server ', e)
    }
}

// add message to server
export async function publishMessage(message: string) {
    if (message.length > 50) return
    const userData = await getUserData({})
    const url = fireBaseServer + 'messages.json'
    const body: any = {}
    body[userData.data!.userId] = {
        name: userData.data!.displayName,
        msg: message,
        date: new Date().getTime()
    }
    // console.log("body", body)
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        return response.json()
    } catch (e) {
        console.log('error posting to server ', e)
    }
}