const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.arc(width / 2, height / 2, width * 0.4, 0, Math.PI * 2, false);
    context.clip();

    var colors = [
      '#FFB713', // Gold
      '#5200C5', // Purple
      '#009F45', // Green
      '#FFB084', // peach
      '#007EBE', // sea blue
      '#0035A0', // deep blue
      '#892F54', // mauve
      '#FF002B', // red
      '#FFB084', // peach
      '#007EBE', // sea blue
      '#FF95BA', // pink
    ];

    context.globalCompositeOperation = 'exclusion';

    // Draw a deformed circle
    for (let i = 0; i < 25; i++) {
      fillDeformedCircle(
        random.rangeFloor(0, width),
        random.rangeFloor(0, height),
        random.rangeFloor(200, 800 - i * 10),
        random.range(0.3, 0.5),
        0.1,
        random.pick(colors),
      );
    }

    function stampCircle(x, y, rings = 30, gap = 10, frequency, magnitude) {
      for (let i = 0; i < rings; i++) {
        drawDeformedCircle(x, y, 1 + i * gap, frequency, magnitude);
      }
    }

    function fillDeformedCircle(x, y, radius, frequency, magnitude, color) {
      context.save();
      context.translate(x, y);
      context.beginPath();
      let points = Math.floor(4 * radius);
      for (let i = 0; i < points + 1; ++i) {
        // Is this in radians?
        const angle = (2 * Math.PI * i) / points;

        // Figure out the x/y coordinates for the given angle
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const deformation = Math.abs(
          random.noise2D(x * frequency, y * frequency),
        );
        const deformedRadius = radius * (1 + magnitude * deformation);
        context.lineTo(deformedRadius * x, deformedRadius * y);
      }
      context.fillStyle = color;
      context.fill();
      context.restore();
    }

    function drawDeformedCircle(x, y, radius, frequency, magnitude) {
      context.save();
      context.translate(x, y);
      context.beginPath();
      let points = Math.floor(4 * radius);
      for (let i = 0; i < points + 1; ++i) {
        // Is this in radians?
        const angle = (2 * Math.PI * i) / points;

        // Figure out the x/y coordinates for the given angle
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const deformation = Math.abs(
          random.noise2D(x * frequency, y * frequency),
        );
        const deformedRadius = radius * (1 + magnitude * deformation);
        context.lineTo(deformedRadius * x, deformedRadius * y);
      }
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
