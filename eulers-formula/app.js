const {
  multiply: mul,
  complex: c,
  exp,
  sin,
  cos
} = math;
const I = c(0,1);

const board = JXG.JSXGraph.initBoard(
  'jxgbox',
  {
    boundingbox: [-4, 4, 4, -4],
    axis: true,
    showCopyright: false,
  }
);

let s1 = board.create('slider', [[-3,-3],[3,-3],[-5,1,5]])

let p1 = board.create('point', [1,1], {strokeWidth:8});

let p2 = board.create('point', [
  () => 1,
  () => 1,
])

let c1 = board.create('curve', [
  (t)=>exp(c(s1.Value(),t)).re,
  (t)=>exp(c(s1.Value(),t)).im,
]);

const readBtn = document.getElementById("read");

readBtn.onclick = () => {
  // console.log(p1.X(),p1.Y());
};

