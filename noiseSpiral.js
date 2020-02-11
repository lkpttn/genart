const canvasSketch = require('canvas-sketch');
const { lerp, degToRad } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const points = 500;
  const numberOfCompletions = points / 25;
  const frequency = random.range(0.1, 2.9);
  const magnitude = 0.4;

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.translate(width / 2, height / 2);

    // Draw a spiral
    context.beginPath();
    for (let i = 0; i < points; i++) {
      const angle = (i * Math.PI * 2 * numberOfCompletions) / points;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const deformation = Math.abs(
        random.noise2D(x * frequency, y * frequency),
      );
      const deformedRadius = i * (1 + magnitude * deformation) - 10;
      // const radius = i;
      // const radius = i * Math.abs(random.noise2D(x, y, 1, 1));
      context.lineTo(deformedRadius * x, deformedRadius * y);
    }
    context.stroke();
  };
};

canvasSketch(sketch, settings);
