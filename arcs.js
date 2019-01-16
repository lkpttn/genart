const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [514, 514],
};

const sketch = () => {
  // Variables
  const lineWidth = 0.005;
  const count = 15;

  const generatePoints = () => {
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push({
        start: { x: 50 + i * 2, y: 20 + i * 2 },
        control1: { x: 230 + i * 40, y: 30 + i * 40 },
        control2: { x: 150 + i * 40, y: 80 + i * 40 },
        end: { x: 250 + i * 40, y: 100 + i * 40 },
      });
    }
    return points;
  };

  const points = generatePoints();
  console.log(points);

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'black';
    context.lineWidth = width * lineWidth;

    context.beginPath();
    context.moveTo(100, 100);
    // context.lineTo(point.start.x, point.start.y);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      context.bezierCurveTo(
        point.control1.x,
        point.control1.y,
        point.control2.x,
        point.control2.y,
        point.end.x,
        point.end.y,
      );
    }
    context.stroke();

    // Showing the control points
    // context.fillStyle = 'red';
    // context.beginPath();
    // context.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
    // context.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI); // Control point two
    // context.fill();
  };
};

canvasSketch(sketch, settings);
