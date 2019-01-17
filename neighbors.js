const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const count = 15;
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
  const point = grid[random.rangeFloor(count)][random.rangeFloor(count)];
  const neighborPoints = getNeighbors(point.x, point.y, neighborDirs);

  // Render
  return ({ context, width, height }) => {
    const drawCircle = (x, y) => {
      context.beginPath();
      context.arc(
        margin + x * 100,
        margin + y * 100,
        15,
        0,
        Math.PI * 2,
        false,
      );
      context.fillStyle = 'blue';
      context.fill();
    };

    // Clear screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Draw the grid
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        let x = margin + i * 100;
        let y = margin + j * 100;
        context.beginPath();
        context.arc(x, y, 5, 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();
      }
    }

    // Draw the main point
    context.beginPath();
    context.arc(
      margin + point.x * 100,
      margin + point.y * 100,
      15,
      0,
      Math.PI * 2,
      false,
    );
    context.fillStyle = 'red';
    context.fill();

    // Draw the neighbors
    neighborPoints.forEach(point => {
      drawCircle(point[0], point[1]);
    });
  };
};

canvasSketch(sketch, settings);
