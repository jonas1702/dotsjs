export class Particle {
    constructor(x, y, ctx) {
        this.x = x
        this.y = y
        this.startX = this.x
        this.startY = this.y
        this.size = 3
        this.velocity = (Math.random() * (1 - .5) + .5)

        this.color = {
            hue: 343,
            saturation: 100, 
            lightness: 38
        }

        this.colorPrev = this.color.hue

        this.draw(ctx)
    }

    /* draws particle */
    draw(ctx) {
        ctx.fillStyle = `hsl(${this.color.hue}, ${this.color.saturation}%, ${this.color.lightness}%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }

    move(mouse, dt) {
        /* calculates the direction to the particle from the current mouse position and creates a vector */
        let direction = {
            x: mouse.x - this.x,
            y: mouse.y - this.y
        }

        let directionStart = {
            x: this.startX - this.x,
            y: this.startY - this.y
        }
        
        /* calculates the distance to the particle */
        const distance = (x, y) => {
            return (Math.sqrt(x * x + y * y))
        }
        
        /* normalizes values from 0 to 1 */
        // const normalizeDistance = (distance, min, max) => {
        //     return ((distance - min) / (max - min))
        // }
        // console.log(normalizeDistance(distance(direction.x, direction.y), 0, mouse.radius))
        // console.log((mouse.radius - distance(direction.x, direction.y)) / mouse.radius)

        /* normalizes values from 1 to 0 */
        const normalizeDistance = (distance, max) => {
            return ((max - distance) / max)
        }

        /* checks if particle is in range of 100 of current mouse position */
        if (distance(direction.x, direction.y) <= mouse.radius) {
            this.x -= 3 * (direction.x / distance(direction.x, direction.y)) * this.velocity * (Math.sin(Math.PI * normalizeDistance(distance(direction.x, direction.y), mouse.radius))) * dt
            this.y -= 3 * (direction.y / distance(direction.x, direction.y)) * this.velocity * (Math.sin(Math.PI * normalizeDistance(distance(direction.x, direction.y), mouse.radius))) * dt
            
            this.color.hue = normalizeDistance(distance(direction.x, direction.y), mouse.radius) * 50 * dt + 200 * this.velocity
        
        } else {
            if (this.x !== this.startX) {
                this.x += directionStart.x / distance(directionStart.x, directionStart.y) * this.velocity * dt
                if (this.color.hue !== this.colorPrev) {
                    this.color.hue = this.colorPrev
                }
            }
            
            if (this.y !== this.startY) {
                this.y += directionStart.y / distance(directionStart.x, directionStart.y) * this.velocity * dt
                if (this.color !== this.colorPrev) {
                    this.color.hue = this.colorPrev
                }
            }
            
            
        }
    }
}

 
/* BUG!!!: particles glitch on mouse move which did not occur previously => because of dt */

/* accelerates speed with increased distance instead of following the sin wave function*/
// normalizeDistance(distance(direction.x, direction.y), mouse.radius)