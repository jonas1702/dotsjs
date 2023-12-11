import {Canvas, CanvasRandom} from './canvas.js'

const canvas1 = document.querySelector('.canvas2')
const canvas2 = document.querySelector('.canvas3')

let canvas1Class = new Canvas(canvas1, 600, 400)
let canvas2Class = new CanvasRandom(canvas2, 500, 500, 900)

// canvas

/* updates particle generation */
let lastUpdate = Date.now()

function update() {
    // let now = Date.now()
    // let dt = (now - lastUpdate) / 25
    // lastUpdate = now

    let dt = 1
    canvas1Class.update(dt)
    canvas2Class.update(dt)

    requestAnimationFrame(update)
}
window.requestAnimationFrame(update)