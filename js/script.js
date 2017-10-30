"use strict";

/* CODE STRUCTURE:
 * CONSTRUCTORS
 * FUNCTIONS
 * MAIN VARIABLES
 * FUNCTION EXECUTION
 */

((canvas) => {
	/////////////////////////////////////////////////
	// CONSTRUCTORS
	/////////////////////////////////////////////////

	class Particle {
		constructor (x, y, vx, vy, r, color) {
			this.x = x
			this.y = y
			this.vx = vx
			this.vy = vy
			this.r = r
			this.color = color
		}

		draw () {
			c.beginPath()
			c.fillStyle = this.color
			c.lineWidth = 2
			c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
			c.fill()
		}

		update () {
			this.x += this.vx
			this.y += this.vy

			// bounce particle off the wall if it hits the wall
			if (this.x - this.r < 0 || this.x + this.r > innerWidth)
				this.vx *= -1
			if (this.y - this.r < 0 || this.y + this.r > innerHeight)
				this.vy *= -1

			this.draw()
		}
	}
})(document.getElementById('canvas'))