import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Pixel } from "./pixel"
import { Entity, engine, TransformType, Transform, PointerEventsResult, PointerEventType } from "@dcl/sdk/ecs"

export class PixelCanvas {
    root: Entity
    pixels: Pixel[] = []
    cols: number
    rows: number
    lastHoverOn: any

    constructor(parent: TransformType, cols: number, rows: number, scale: number = 0.5) {
        this.root = engine.addEntity()
        this.cols = cols
        this.rows = rows
        Transform.create(this.root, parent)
        for (let y = 0; y < rows; y++) {
            const row: any = []
            for (let x = 0; x < cols; x++) {
                row.push(new Pixel({
                    position: Vector3.create(x * scale, y * scale, 1),
                    rotation: Quaternion.Zero(),
                    scale: Vector3.create(scale, scale, scale),
                    parent: this.root
                },
                    { x: x, y: y }))
            }
            this.pixels.push(row)
        }
        engine.addSystem(this.PointerReadingSystem.bind(this))
    }

    PointerReadingSystem() {
        const c = engine.getEntitiesWith(PointerEventsResult)
        for (const [entity] of c) {
            const result = PointerEventsResult.get(entity)
            result.forEach(element => {
                if (element.hit) {
                    if (element.state == PointerEventType.PET_HOVER_ENTER) {
                        // select new pixel
                        if ((this.lastHoverOn && this.lastHoverOn.hit.entityId != element.hit.entityId) || !this.lastHoverOn) {
                            let p: any = this.findPixelById(element.hit.entityId!)
                            if (p) {
                                p.select()
                                this.lastHoverOn = element
                            }
                        }
                    }
                    else if (element.state == PointerEventType.PET_HOVER_LEAVE) {
                        // unselect last pixel
                        if (this.lastHoverOn && this.lastHoverOn.hit.entityId == element.hit.entityId) {
                            let p: any = this.findPixelById(element.hit.entityId!)
                            if (p) {
                                p.deselect()
                                this.lastHoverOn = null
                            }
                        }
                    }
                }
            })
        }
    }

    findPixelById(id: number) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const temp: any = this.pixels[y]
                const p: Pixel = temp[x]
                if (p.entity.valueOf() == id) {
                    return p
                }
            }
        }
        return null
    }
}