const {
  multiply: mul,
  complex: c,
  exp,
  sin,
  cos,
  abs
} = math;
const I = c(0,1);

const board = JXG.JSXGraph.initBoard(
  'jxgbox',
  {
    boundingbox: [-10, 10, 10, -10],
    axis: false,
    showCopyright: false,
  }
);

const box = [-10, 10];
let view = board.create('view3d',
    [
        [-4, -4], [8, 8],
        [box, box, box]
    ],
    {
        xPlaneRear: {visible: false},
        yPlaneRear: {visible: false},
    });

let s1 = board.create('slider', [[-9,-9],[9,-9],[10,20,100]], {name:"UV"})

// 3D surface
let g = view.create('functiongraph3d', [
    (x, y) => sin(c(x,y)).re+sin(c(x,y)).im,
    box, // () => [-s.Value()*5, s.Value() * 5],
    box, // () => [-s.Value()*5, s.Value() * 5],
], {
    strokeWidth: 0.5,
    stepsU: () => Math.floor(s1.Value()),
    stepsV: () => Math.floor(s1.Value()),
});

