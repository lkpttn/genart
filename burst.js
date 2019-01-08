const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const margin = 300;
  const targets = [];

  // Generate grid
  const createGrid = () => {
    const points = [];
    const count = 60;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push([u, v]);
      }
    }
    return points;
  };

  const points = createGrid();

  for (let i = 0; i < 1000; i++) {
    targets.push(random.pick(points));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'black';
    context.fillStyle = 'black';

    targets.forEach(points => {
      const u = points[0];
      const v = points[1];

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.moveTo(width / 2, height / 2);
      context.lineTo(x, y);
      context.lineWidth = 0.1 + u;
      context.stroke();

      context.beginPath();
      // context.arc(x, y, 0.003 * width, 0, Math.PI * 2, false);
      context.fillStyle = 'rgba(0,0,0,0.1)';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
