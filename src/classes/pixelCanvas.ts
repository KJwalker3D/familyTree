import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { Pixel } from "./pixel"
import { Entity, engine, TransformType, Transform } from "@dcl/sdk/ecs"

export class PixelCanvas {

    root: Entity
    pixels: Pixel[] = []

    constructor(parent: TransformType, cols: number, rows: number, scale: number = 0.5) {
        this.root = engine.addEntity()
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
    }
}