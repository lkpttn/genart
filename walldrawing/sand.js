const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Pick a number of grains, n.
  // Pick a color, and a corresponding transparency, rgba.
  // Pick two points, v and w.
  // Randomly draw n points (uniformly distributed) between v and w, using color rgba.
  // Move v and w slightly, then draw again.

  // Variables
  const margin = 300;
  const grains = 30;
  const sandColor = 'rgba(0,0,0,0.1)';
  const points = [];
  const radius = 0.003;

  // Calculate 0..1 x positions of the grains : u space
  for (let x = 0; x < grains; x++) {
    const u = grains <= 1 ? 0.5 : x / (grains - 1);
    points.push(u);
  }

  console.log(points);

  // Render
  return ({ context, width, height }) => {
    // Variables
    let v = margin;
    let w = width - margin;

    // Drawing
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Draw many lines, slightly offset
    for (let x = 0; x < 40; x++) {
      // randomize the offset
      const drift = random.range(-20, 20);
      v += drift;
      w += drift;

      // Draw a circle for each value in points
      points.forEach(u => {
        // Lerp using the u space variable as progress
        // x is a point u% between the first two arguments
        const x = lerp(v, w, u);

        context.beginPath();
        context.arc(x, margin, radius * width, 0, Math.PI * 2, false);
        context.fillStyle = sandColor;
        context.fill();
      });
    }
  };
};

canvasSketch(sketch, settings);
