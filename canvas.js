import { Particle } from "./particle.js"

export class Canvas {
    constructor(canvas, width, height) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.grid = {
            rows: height / 35,
            columns: width / 35,
            padding: 20
        }
        this.particles = []
        this.cellWidth = (width - 2 * this.grid.padding) / this.grid.columns
        this.cellHeight = (height - 2 * this.grid.padding) / this.grid.rows
        // this.particlePos = {
        //     x: null,
        //     y: null
        // }
        this.mouse = {
            x: null,
            y: null,
            radius: 80
        }

        this.createCanvas(width, height)
    }

    createCanvas(width, height) {
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.background = '#fff'

        for (let i = 0; i <= this.grid.columns; i++) {
            for (let j = 0; j <= this.grid.rows; j++) {
                
                let particlePos = {
                    x: this.grid.padding + i * this.cellWidth,
                    y: this.grid.padding + j * this.cellHeight
                }
                let particle = new Particle(particlePos.x, particlePos.y, this.ctx)
                this.particles.push(particle)
            }  
        }
    }

    update(dt) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        /* calles move function for each particle */
        this.particles.forEach(particle => {
            particle.move(this.mouse, dt)
            particle.draw(this.ctx)
        })

        const mousePos = (evt) => {
            let canvasSize = this.canvas.getBoundingClientRect()
            this.mouse.x = evt.clientX - canvasSize.left
            this.mouse.y = evt.clientY - canvasSize.top
            return this.mouse
        }
        document.addEventListener('mousemove', (evt) => {
            mousePos(evt)
        })
    }
}