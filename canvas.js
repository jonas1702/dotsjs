import { Particle } from "./particle.js"

export class Canvas {
    constructor(canvas, width, height) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.grid = {
            rows: height / 25,
            columns: width / 25,
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

export class CanvasRandom {
    constructor(canvas, width, height, amount) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.particles = []

        this.mouse = {
            x: null,
            y: null,
            radius: 40
        }

        this.createCanvas(width, height, amount)
    }

    createCanvas(width, height, amount) {
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.background = '#fff'
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);

        for(let i = 0; i < amount; i++) {
            // Generate random values between 0 and 1
            const u = Math.random();
            const v = Math.random();

            // Map the random values to a position with Gaussian distribution
            const radius = Math.sqrt(-2 * Math.log(u)) * maxDistance / 8;
            const angle = 2 * Math.PI * v;

            // Calculate particle coordinates
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            let particle = new Particle(x, y, this.ctx)
            this.particles.push(particle)
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