const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const margin = 300;
  const grains = 70;
  const grid = 30;
  const sandColor = 'rgba(0,0,0,0.1)';
  const points = [];
  const targets = [];

  // Returns a random set of coordinates when called
  const generateCoordinates = array => {
    const randomCoords = random.pick(array);
    return randomCoords;
  };

  // 1D array of grains between points
  for (let x = 0; x < grains; x++) {
    const u = grains <= 1 ? 0.5 : x / (grains - 1);
    points.push(u);
  }

  // 2D array
  const createGrid = () => {
    const points = [];

    for (let x = 0; x < grid; x++) {
      for (let y = 0; y < grid; y++) {
        const u = grid <= 1 ? 0.5 : x / (grid - 1);
        const v = grid <= 1 ? 0.5 : y / (grid - 1);

        points.push([u, v]);
      }
    }
    return points;
  };

  // Provides an offset each time it's called
  const generateDrift = () => {
    return random.range(-3, 3);
  };

  const gridArray = createGrid();

  // Get an array of 16 targets
  for (let x = 0; x < 16; x++) {
    targets.push(generateCoordinates(gridArray));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Variables
    let x1 = 0.5;
    let y1 = 0.5;
    let x2 = 1.0;
    let y2 = 1.0;

    // For each point in the points array, draw a sand line
    targets.forEach(point => {
      // Destructure the data parameter so we can access the grid object properties
      // u2 and v2 are mapped in a 0..1 range
      const u2 = point[0];
      const v2 = point[1];

      // Each of these should represent a point in space
      let x1 = width / 2;
      let y1 = height / 2;
      let x2 = lerp(margin, width - margin, u2);
      let y2 = lerp(margin, height - margin, v2);

      // Draw many lines, slightly offset
      for (let i = 0; i < 50; i++) {
        // randomize the offset a bit
        x1 += generateDrift();
        x2 += generateDrift();
        y1 += generateDrift();
        y2 += generateDrift();

        // Draw a circle for each value in points
        points.forEach(u => {
          // Lerp using the u space variable as progress
          // x is a point u% between the first two arguments
          const x = lerp(x1, x2, u);
          const y = lerp(y1, y2, u);

          context.beginPath();
          context.arc(x, y, 0.001 * width, 0, Math.PI * 2, false);
          context.fillStyle = sandColor;
          context.fill();
        });
      }
    });
  };
};

canvasSketch(sketch, settings);
