const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [512, 512],
  animate: true,
  duration: 4,
};

const sketch = () => {
  // Whatever
  const createGrid = () => {
    const points = [];
    const count = 60;

    // Nested for loop to create x and y coordinates
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // Working in uv space instead of final pixel coordinates
        // For added flexibility
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = 0.03 + Math.abs(random.noise2D(u, v, 3) * 0.05);
        points.push({
          radius: radius,
          postion: [u, v],
        });
      }
    }
    return points;
  };

  const grid = createGrid();
  const margin = 50;

  // Return
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    grid.forEach(data => {
      // Destructure the data parameter so we can access the grid object properties
      const { postion, radius } = data;
      const [u, v] = postion;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      const radiusZ =
        0.03 + Math.abs(random.noise3D(u, v, Math.sin(playhead), 2) * 0.05);

      // fill the grid with circles
      context.beginPath();
      context.arc(x, y, (radiusZ * width) / 8, 0, Math.PI * 2, false);
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
