import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math"
import { PixelCanvas } from "./classes/pixelCanvas"
import { PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS } from "./utils"
import { InputAction, PointerEventType, engine, inputSystem } from "@dcl/sdk/ecs"


class Canvas {

    colors = [ // x size 0.15, y size 0.23
        { // yellow
            rgba: Color4.create(1, 217 / 255, 0),
            sourceLeft: 0.06,
            sourceRight: 0.21,
            sourceTop: 0.91,
            sourceBottom: 0.68
        },
        { // magenta
            rgba: Color4.create(1, 0, 113 / 255),
            sourceLeft: 0.31,
            sourceRight: 0.46,
            sourceTop: 0.91,
            sourceBottom: 0.68
        },
        { // blue
            rgba: Color4.create(0, 33 / 255, 1),
            sourceLeft: 0.55,
            sourceRight: 0.70,
            sourceTop: 0.91,
            sourceBottom: 0.68
        },
        { // white
            rgba: Color4.create(1, 1, 1),
            sourceLeft: 0.79,
            sourceRight: 0.94,
            sourceTop: 0.91,
            sourceBottom: 0.68
        },
        { // orange
            rgba: Color4.create(1, 106 / 255, 0),
            sourceLeft: 0.06,
            sourceRight: 0.21,
            sourceTop: 0.6,
            sourceBottom: 0.37
        },
        { // purple
            rgba: Color4.create(207 / 255, 0, 1),
            sourceLeft: 0.31,
            sourceRight: 0.46,
            sourceTop: 0.6,
            sourceBottom: 0.37
        },
        { // neon green
            rgba: Color4.create(0, 1, 0),
            sourceLeft: 0.55,
            sourceRight: 0.70,
            sourceTop: 0.6,
            sourceBottom: 0.37
        },
        { // grey
            rgba: Color4.create(170 / 255, 170 / 255, 170 / 255),
            sourceLeft: 0.79,
            sourceRight: 0.94,
            sourceTop: 0.6,
            sourceBottom: 0.37
        },
        { // red
            rgba: Color4.create(1, 0, 0),
            sourceLeft: 0.06,
            sourceRight: 0.21,
            sourceTop: 0.30,
            sourceBottom: 0.07
        },
        { // light blue
            rgba: Color4.create(0, 149 / 255, 1),
            sourceLeft: 0.31,
            sourceRight: 0.46,
            sourceTop: 0.3,
            sourceBottom: 0.07
        },
        { // dark green
            rgba: Color4.create(0, 128 / 255, 0),
            sourceLeft: 0.55,
            sourceRight: 0.70,
            sourceTop: 0.3,
            sourceBottom: 0.07
        },
        { // black
            rgba: Color4.create(0, 0, 0),
            sourceLeft: 0.79,
            sourceRight: 0.94,
            sourceTop: 0.3,
            sourceBottom: 0.07
        },
    ]

    canvas: any
    isActive: boolean = false
    colorIndex: number = 0

    constructor() {

    }

    activate() {
        this.isActive = true
        this.canvas = new PixelCanvas({
            position: Vector3.create(61.75, 75.2, 87),
            rotation: Quaternion.fromEulerDegrees(0, 177, 0),
            scale: Vector3.create(1.5, 1.5, 1.5)
        }, PIXEL_CANVAS_COLS, PIXEL_CANVAS_ROWS)

        // E/F keys to cycle colors
        engine.addSystem(() => {
            if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN)) {
                if (this.colorIndex == -1) {
                    this.colorIndex = 0
                }
                else if (this.colorIndex - 1 < 0) {
                    this.colorIndex = this.colors.length - 1
                } else {
                    this.colorIndex--
                }
            }
            if (inputSystem.isTriggered(InputAction.IA_SECONDARY, PointerEventType.PET_DOWN)) {
                if (this.colorIndex == -1) {
                    this.colorIndex = 0
                }
                else if (this.colorIndex + 1 >= this.colors.length) {
                    this.colorIndex = 0
                } else {
                    this.colorIndex++
                }
            }
        })
    }
}


export const CanvasManager = new Canvas()