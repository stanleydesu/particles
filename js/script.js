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

	/////////////////////////////////////////////////
	// FUNCTIONS
	/////////////////////////////////////////////////

	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const getRandomSign = () => Math.random() < 0.5 ? 1 : -1

	const init = () => {
		canvas.width = innerWidth
		canvas.height = innerHeight
		for (let i = 0; i < 100; ++i) {
			const r = 2
			const x = getRandomInt(0 + r, innerWidth - r)
			const y = getRandomInt(0 + r, innerHeight - r)
			const vx = getRandomInt(1, 4) * getRandomSign()
			const vy = getRandomInt(1, 4) * getRandomSign()
			const color = 'white'
			particles.push(new Particle(x, y, vx, vy, r, color))
		}
	}

	const animate = () => {
		requestAnimationFrame(animate)
		c.clearRect(0, 0, innerWidth, innerHeight)
		particles.forEach(particle => particle.update())
	}

	/////////////////////////////////////////////////
	// MAIN VARIABLES
	/////////////////////////////////////////////////

	const c = canvas.getContext('2d')
	const particles = []
})(document.getElementById('canvas'))