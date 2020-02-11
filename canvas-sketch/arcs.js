const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [500, 500],
};

const sketch = () => {
  // Variables
  const lineWidth = 0.005;
  const count = 15;

  // Squiggle line
  const generatePoints = () => {
    const points = [];
    for (let i = 0; i < count; i++) {
      let offset = random.range(0, 100);
      points.push({
        control1: { x: 40 * i, y: 55 * i },
        control2: { x: 50 * i, y: 40 * i },
        end: { x: 50 * i, y: 50 * i },
      });
    }
    return points;
  };

  // Circle
  const points = [
    {
      control1: { x: 350, y: 160 },
      control2: { x: 250, y: 180 },
      end: { x: 350, y: 250 },
    },
    {
      control1: { x: 340, y: 355 },
      control2: { x: 300, y: 320 },
      end: { x: 250, y: 350 },
    },
    {
      control1: { x: 200, y: 275 },
      control2: { x: 150, y: 340 },
      end: { x: 150, y: 250 },
    },
    {
      control1: { x: 140, y: 155 },
      control2: { x: 200, y: 200 },
      end: { x: 250, y: 150 },
    },
  ];

  // const points = generatePoints();
  console.log(points);

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'black';
    context.lineWidth = width * lineWidth;

    // lines
    context.beginPath();
    context.moveTo(250, 150);
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

    // End point
    context.fillStyle = 'red';
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      context.beginPath();
      context.arc(point.end.x, point.end.y, 5, 0, Math.PI * 2, false);
      context.fill();
    }

    // Control points
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      context.beginPath();
      context.fillStyle = 'blue';
      context.arc(point.control1.x, point.control1.y, 3, 0, Math.PI * 2, false);
      context.fill();
      context.beginPath();
      context.fillStyle = 'green';
      context.arc(point.control2.x, point.control2.y, 3, 0, Math.PI * 2, false);
      context.fill();
    }

    // Showing the control points
    // context.fillStyle = 'red';
    // context.beginPath();
    // context.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
    // context.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI); // Control point two
    // context.fill();
  };
};

canvasSketch(sketch, settings);
