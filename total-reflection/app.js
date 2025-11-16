const container = document.getElementById("container")
const canvas = document.createElement("canvas")

canvas.width = 400
canvas.height = 400

container.appendChild(canvas)

const ctx = canvas.getContext("2d")

const PI = Math.PI

const n_21 = 1.4

canvas.addEventListener("mousemove", (e) => {
  const { offsetX: x, offsetY: y } = e

  if (y < 200) return

  ctx.clearRect(0, 0, 400, 400)

  const dx = x - 200
  const dy = y - 200

  const theta = Math.atan2(dy, dx) - PI / 2

  const r = Math.asin(Math.sin(theta) * n_21) + PI / 2

  ctx.beginPath()

  ctx.arc(200, 200, 40, PI / 2, theta + PI / 2, x > 200)
  ctx.stroke()

  ctx.moveTo(200, 200)
  ctx.lineTo(200 + 300 * Math.cos(theta + PI / 2), 200 + 300 * Math.sin(theta + PI / 2))
  ctx.stroke()

  ctx.strokeStyle = "black"
  ctx.moveTo(200, 200)
  ctx.lineTo(200 - 300 * Math.cos(r), 200 - 300 * Math.sin(r))
  ctx.stroke()

  ctx.moveTo(200, 200 - 100)
  ctx.lineTo(200, 200 + 100)
  ctx.stroke()

  ctx.moveTo(0, 200)
  ctx.lineTo(400, 200)
  ctx.stroke()
  ctx.closePath()

  ctx.font = "20px monospace"
  ctx.fillText(`${Math.round((theta) * 100) / 100}`, 200 + 5, 200 - 5)
  ctx.fillText(`${Math.round((r) * 100) / 100}`, 200 + 5, 200 + 25)

  ctx.fillRect(x - 5, y - 5, 10, 10)
})
