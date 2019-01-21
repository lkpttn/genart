const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const count = 15;
  const palette = random.pick(palettes);
  const points = [];
  const neighborDirs = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

  const getNeighbors = (x, y, neighbors, m) =>
    neighbors.map(([dX, dY]) => [x + dX, y + dY]);

  const createGrid = () => {
    // Nested for loop to create x and y coordinates
    for (let x = 0; x < count; x++) {
      points[x] = [];
      for (let y = 0; y < count; y++) {
        points[x][y] = {
          x: x,
          y: y,
        };
      }
    }
    return points;
  };

  const grid = createGrid();
  const margin = 300;
  let point = [];
  let neighborPoints = [];

  // Render
  return ({ context, width, height }) => {
    // Clear screen
    context.fillStyle = palette[palette.length - 1];
    palette.pop();
    context.fillRect(0, 0, width, height);

    context.strokeStyle = '#fff';
    context.lineWidth = 2;

    // Find a new random point on the grid
    const getPoint = (x, y) => {
      // point = grid[random.rangeFloor(count)][random.rangeFloor(count)];
      point = grid[x][y];
      neighborPoints = getNeighbors(point.x, point.y, neighborDirs);
    };

    const drawCircle = (x, y) => {
      context.beginPath();
      context.arc(margin + x * 100, margin + y * 100, 2, 0, Math.PI * 2, false);
      context.fillStyle = 'rgba(255,255,255, 0.3)';
      context.fill();
    };

    const drawShape = (point, neighbors) => {
      // Draw a bunch of lines to and from the neighbors
      // context.strokeStyle = 'rgba(255,255,255, 0.1)';
      const color = hexToRGB(random.pick(palette), 0.4);
      context.strokeStyle = color;

      context.beginPath();
      context.moveTo(margin + point.x * 100, margin + point.y * 100);
      for (let i = 0; i < 15; i++) {
        const nextPoint = random.pick(neighbors);
        context.lineTo(
          margin + nextPoint[0] * 100,
          margin + nextPoint[1] * 100,
        );
      }
      // Close the shape
      context.lineTo(margin + point.x * 100, margin + point.y * 100);
      context.stroke();
    };

    // Draw a shape at every third point
    for (let i = 0; i < count; ) {
      for (let j = 0; j < count; ) {
        getPoint(i, j);
        drawCircle(point.x, point.y);
        drawShape(point, neighborPoints);
        j = j + 2;
      }
      i = i + 2;
    }
  };
};

canvasSketch(sketch, settings);
