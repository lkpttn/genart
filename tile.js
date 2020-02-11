const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const eases = require('eases');

const settings = {
  duration: 3,
  dimensions: [640, 640],
  scaleToView: true,
  playbackRate: 'throttle',
  animate: true,
  fps: 24,
};

const gridSize = 30;
const padding = 100;

// Create the grid
function createGrid() {
  var grid = [];

  // Create coordinates for each space on the grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      // get a 0..1 UV coordinate
      const u = gridSize <= 1 ? 0.5 : x / (gridSize - 1);
      const v = gridSize <= 1 ? 0.5 : y / (gridSize - 1);

      // Choose a starting rotation
      var leftToRight = Math.random() >= 0.5;
      if (leftToRight) {
        var rotation = Math.PI / 4;
      } else {
        var rotation = (Math.PI / 4) * -1;
      }

      grid.push({
        rotation: rotation,
        position: [u, v],
      });
    }
  }

  return grid;
}

const grid = createGrid();
console.log(grid);

// Start the sketch
canvasSketch(({ update }) => {
  return ({ context, frame, width, height, playhead }) => {
    // White background each frame
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const tileSize = width / gridSize;

    grid.forEach(point => {
      const { rotation, position } = point;
      const [u, v] = position;

      // Scale back up to padded widths
      const tx = lerp(padding, width - padding, u);
      const ty = lerp(padding, height - padding, v);

      // Rotation
      // Offset is effected by the uv values of each point

      // Can we start in the center of the grid, 0 is width/height / 2
      // and 1 is towards the margins
      const offset = u * 0.2 + v * 0.1;
      const t = (playhead + offset) % 1;

      // Ease in and out smoothly
      let mod = eases.expoInOut(t);

      // Continually updating rotation
      const rotate = rotation + mod * Math.PI;

      const length = tileSize;
      const thickness = tileSize * 0.1;

      draw(context, tx, ty, length, thickness, rotate);
    });
  };

  function draw(context, x, y, length, thickness, rotation) {
    context.save();
    context.fillStyle = 'black';

    // Rotate in place
    context.translate(x, y);
    context.rotate(rotation);
    context.translate(-x, -y);

    // Draw the line
    context.fillRect(x - length / 2, y - thickness / 2, length, thickness);
    context.restore();
  }
}, settings);
