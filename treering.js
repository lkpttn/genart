const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  animate: true,
  dimensions: [512, 512],
  duration: 3,
};

const sketch = ({ context, width, height }) => {
  // Variables
  const count = 15;
  const step = 16;
  let radius;
  let movement = [];

  const generateRings = () => {
    const rings = [];
    for (let i = 0; i < count; i++) {
      movement.push(0);
      rings.push({
        radius: i * step,
        arcStart: random.range(1, 2 * Math.PI),
        arcEnd: random.range(1, 2 * Math.PI),
        velocity: random.range(-0.05, 0.05),
        index: i,
      });
    }
    return rings;
  };

  const rings = generateRings();

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    context.strokeStyle = 'white';
    context.lineWidth = 3;

    rings.forEach(ring => {
      // Destructure
      const { radius, arcStart, arcEnd, velocity, index } = ring;

      // Draw the ring
      context.beginPath();
      context.arc(
        0,
        0,
        radius,
        arcStart + movement[index],
        arcEnd + movement[index],
        false,
      );
      context.stroke();

      // Increment the movement
      movement[index] += velocity;
    });
  };
};

canvasSketch(sketch, settings);
