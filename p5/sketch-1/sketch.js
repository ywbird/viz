/// <reference path="../node_modules/@types/p5/global.d.ts" />

p5.disableFriendlyErrors = true; // disables FES

let serifFont

function setup() {
  createCanvas(600, 800)

  angleMode(DEGREES);

  serifFont = loadFont("/p5/assets/Song_Myung/SongMyung-Regular.ttf")
}

const circleX = 150
const circleY = 150
const circleR = 100

function draw() {
  background(220)

  fill('black')
  textFont(serifFont, 18)
  text(`기하학에서, 원은 주어진 점에 이르는 거리가 일정한 점들로 이루어진 평면 도형이다. 주어진 한 점을 원의 중심이라고 한다. 중심과 원 위의 점 사이의 거리를 원의 반지름이라고 한다. 원이 둘러싸는 평면 영역을 원판이라고 한다.`,
    300, 300, 250)
  text(`원은 이차 곡선의 일종인 타원에서 이심률이 0인 경우이다. 이심률은 아핀 기하학적 성질이 아니므로, 원은 타원과 달리 아핀 변환에 의하여 보존되지 않는다.

역사 시대 이전부터 원은 인류에게 익숙한 개념이었다. 원은 보름달이나 둥근 과일의 단면에서처럼 자연적으로 흔하게 찾아볼 수 있다. 인류 역사의 중요한 발명 중 하나인 바퀴도 원의 모양을 이용한 것이며, 톱니바퀴 등의 발명은 현대 공학의 주축이 되었다. 수학에서, 원에 대한 연구는 기하학과 천문학, 미적분학 등의 발전에 기여하였다.

작도 시에도 굉장히 중요한 역할을 하는 도형으로, 원의 중심과 원 위의 한 점 사이의 거리가 일정하다는 사실을 이용하여, 일정한 길이의 선분을 옮길 때 사용한다.
    `,

    50, 500, 500)

  const angle = frameCount % 360

  const pointX = cos(angle) * circleR
  const pointY = sin(angle) * circleR


  noFill()
  strokeWeight(2)
  circle(circleX, circleY, 2 * circleR)
  circle(circleX + pointX, circleY + pointY, 10)
  circle(circleX, circleY + pointY, 10)

  circle(circleX + circleR, circleY + pointY, 10)
  circle(circleX + circleR + 275, circleY + sin(550 + angle) * circleR, 10)
  line(circleX, circleY - circleR, circleX, circleY + circleR)

  circle(circleX + pointX, circleY + circleR, 10)
  circle(circleX + cos(400 + angle) * circleR, circleY + circleR + 200, 10)
  line(circleX - circleR, circleY, circleX + circleR, circleY)

  noFill()
  strokeWeight(2)
  beginShape()
  for (let i = 0; i < 550; i++) {
    vertex(circleX + circleR + i / 2, circleY + sin(i + angle) * circleR)
  }
  endShape()

  beginShape()
  for (let i = 0; i < 400; i++) {
    vertex(circleX + cos(i + angle) * circleR, circleY + circleR + i / 2)
  }
  endShape()

}


