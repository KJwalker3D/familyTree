import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { PixelCanvas } from "./classes/pixelCanvas"
import { PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS } from "./utils"


class Canvas {

    canvas: any

    constructor() {

    }

    activate() {
        this.canvas = new PixelCanvas({
            position: Vector3.create(62, 75.2, 83),
            rotation: Quaternion.fromEulerDegrees(0, 177, 0),
            scale: Vector3.create(1.5, 1.5, 1.5)
        }, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS)
    }
}


export const CanvasManager = new Canvas()