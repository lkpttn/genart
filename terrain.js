const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [512, 512],
  animate: false,
  duration: 4,
};

const sketch = () => {
  // Whatever
  const createGrid = () => {
    const points = [];
    const countX = 60;
    const countY = 60;

    // Nested for loop to create x and y coordinates
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        // Working in uv space instead of final pixel coordinates
        // For added flexibility
        const u = countX <= 1 ? 0.5 : x / (countX - 1);
        const v = countY <= 1 ? 0.5 : y / (countY - 1);
        const z = 0.03 + Math.abs(random.noise2D(u, v, 2));
        points.push({
          u: u,
          v: v,
          z: z,
        });
      }
    }
    return points;
  };

  // Find a plane slice by filtering our grid to only include points who's
  // z value is within a certain value
  const grid = createGrid().filter(point => point.z > 0.3 && point.z < 0.35);
  const margin = 50;

  // Return
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    grid.forEach(data => {
      // Destructure the data parameter so we can access the grid object properties
      const { u, v, z } = data;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // 3D noise time variable stuff
      // const radiusZ =
      //   0.03 + Math.abs(random.noise3D(u, v, Math.sin(playhead), 2) * 0.03);

      // Draw a black circle at each point
      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2, false);
      context.fillStyle = 'black';
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
