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

	const drawLine = (x1, y1, x2, y2) => {
		c.beginPath()
		c.moveTo(x1, y1)
		c.lineWidth = 1
		c.lineTo(x2, y2)
		c.strokeStyle = 'rgba(255, 255, 255, 0.1)'
		c.stroke()
	}

	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const getRandomSign = () => Math.random() < 0.5 ? 1 : -1

	const getDistance = (x1, y1, x2, y2) => {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
	}

	const init = () => {
		canvas.width = innerWidth
		canvas.height = innerHeight
		particles.length = 0
		for (let i = 0; i < 250; ++i) {
			const r = 1
			const x = getRandomInt(0 + r, innerWidth - r)
			const y = getRandomInt(0 + r, innerHeight - r)
			const vx = getRandomSign()
			const vy = getRandomSign()
			const color = 'white'
			particles.push(new Particle(x, y, vx, vy, r, color))
		}
	}

	const animate = () => {
		requestAnimationFrame(animate)
		c.clearRect(0, 0, innerWidth, innerHeight)
		particles.forEach(p1 => {
			p1.update()

			// loop through other particles, and if they are close enough to 
			// p1 particle, draw a line
			particles.forEach(p2 => {
				if (p1 !== p2 && getDistance(p1.x, p1.y, p2.x, p2.y) < 100) {
					drawLine(p1.x, p1.y, p2.x, p2.y)
				}
			})
		})
	}

	/////////////////////////////////////////////////
	// EVENT LISTENERS
	/////////////////////////////////////////////////

	window.addEventListener('resize', init)

	/////////////////////////////////////////////////
	// MAIN VARIABLES
	/////////////////////////////////////////////////

	const c = canvas.getContext('2d')
	const particles = []

	/////////////////////////////////////////////////
	// FUNCTION EXECUTION
	/////////////////////////////////////////////////

	init()
	animate()
})(document.getElementById('canvas'))