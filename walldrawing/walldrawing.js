const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.pick(palettes);

  // Make 6x6 grid
  const createGrid = () => {
    const points = [];
    const count = 6;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push([u, v]);
      }
    }
    return points;
  };

  const createLines = () => {
    // An array of objects that contains each line
    const lines = [];
    const count = points.length;

    for (let x = 0; x < count; x++) {
      // Pick two random points on the grid
      // Add them as a line to the array and remove them from the array of unused points
      const firstPoint = random.pick(points);
      const firstIndex = points.indexOf(firstPoint);
      points.splice(firstIndex, 1);

      const secondPoint = random.pick(points);
      const secondIndex = points.indexOf(secondPoint);
      points.splice(secondIndex, 1);

      lines.push({ firstPoints: firstPoint, secondPoints: secondPoint });
    }
    return lines;
  };
  const points = createGrid();
  const lines = createLines();
  const margin = 300;

  // Layer the shapes by average Y position of their two grid points (taller in the back)

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'white';
    context.lineWidth = 0.01 * width;

    // Draw the lines
    lines.forEach(data => {
      // Destructure the data parameter so we can access the grid object properties
      const { firstPoints, secondPoints } = data;
      const [u1, v1] = firstPoints;
      const [u2, v2] = secondPoints;
      console.log(firstPoints);

      const yEdge = height - margin;

      const x1 = lerp(margin, width - margin, u1);
      const y1 = lerp(margin, height - margin, v1);

      const x2 = lerp(margin, width - margin, u2);
      const y2 = lerp(margin, height - margin, v2);

      context.fillStyle = random.pick(palette);
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x1, yEdge);
      context.lineTo(x2, yEdge);
      context.lineTo(x2, y2);
      context.lineTo(x1, y1);
      context.lineTo(x1, yEdge);
      context.fill();
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
