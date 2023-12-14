import { AudioSource, Entity, Transform, engine } from "@dcl/sdk/ecs"


class Audio {
    sfx: Entity
    ping: string = "sound/ping.mp3"

    constructor() {
        this.sfx = engine.addEntity()
        Transform.create(this.sfx, {
            parent: engine.CameraEntity
        })
        AudioSource.create(this.sfx, {
            audioClipUrl: '',
            playing: false,
            loop: false
        })
    }

    playSFXPing() {
        const audioSource = AudioSource.getMutable(this.sfx)
        audioSource.audioClipUrl = this.ping
        audioSource.playing = true
    }
}


export const AudioManager = new Audio()