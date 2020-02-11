const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const margin = 300;
  const targets = [];
  const radius = 0.01;
  const palette = random.pick(palettes);

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

  for (let i = 0; i < 180; i++) {
    targets.push(random.pick(points));
  }

  return ({ context, width, height }) => {
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'black';

    targets.forEach(points => {
      const u = points[0];
      const v = points[1];

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      const color = random.pick(palette);

      context.beginPath();
      context.moveTo(width / 2, height / 2);
      context.lineTo(x, y);
      context.lineWidth = (radius * width) / 8;
      context.strokeStyle = color;
      context.stroke();

      context.beginPath();
      context.arc(x, y, (radius * width) / 4, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
