const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'black';
    context.lineWidth = 3;

    context.translate(width / 2, height / 2);

    for (let i = 0; i < 120; i++) {
      drawDeformedCircle(50 + i * 10);
    }

    // Draw a deformed circle
    function drawDeformedCircle(radius) {
      context.beginPath();
      let points = Math.floor(4 * radius);
      for (let i = 0; i < points + 1; ++i) {
        // Is this in radians?
        const angle = (2 * Math.PI * i) / points;

        // Figure out the x/y coordinates for the given angle
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const deformedRadius = radius + 100 * Math.abs(random.noise2D(x, y));
        context.lineTo(deformedRadius * x, deformedRadius * y);
      }
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
