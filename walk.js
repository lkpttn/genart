const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  // Enable an animation loop
  animate: true,
  dimensions: [512, 512],
  playbackRate: 'throttle',
  fps: 24,
};

canvasSketch(() => {
  // https://inconvergent.net/2016/shepherding-random-numbers/#introduction
  // Causing randomized drifts of nodes

  // https://codepen.io/DonKarlssonSan/post/random-walk
  // Random walker explanation
  
  const nodes = 17;
  const margin = 100;
  let drift = 0;

  // We want an infinite animation where a dot moves to a new location randomly
  // Randomly generate new coordinates
  // Interpolate to the new coordinate over 1 second
  // Choose a new destination
  // Interpolate and repeat

  // Render
  return ({ context, width, height, time }) => {
    // Everything in here will be requested fps times per second

    // Returns a random set of coordinates when called
    const generateCoordinates = () => {
      const randomX = random.range(margin, width - margin);
      const randomY = random.range(margin, height - margin);
      return [randomX, randomY];
    };

    const draw = () => {
      const { oldPoints, newPoints } = position;
      let [u1, v1] = oldPoints;
      let [u2, v2] = newPoints;

      // Renew the white bg every frame
      context.fillStyle = 'white';
      // context.fillRect(0, 0, width, height);
      context.stokeStyle = 'black';

      // Old location circle
      context.beginPath();
      context.arc(u1, v1, 5, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();

      // Line between points
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u2, v2);
      context.stroke();

      // New points circle
      context.beginPath();
      context.arc(u2, v2, 5, 0, Math.PI * 2, false);
      context.stroke();
      context.fill();
      context.closePath();
    };

    // Get some coordnates at the beginning of the sketch
    // We don't want to set a new position every frame
    const position = {
      oldPoints: generateCoordinates(),
      newPoints: generateCoordinates(),
    };

    // Draw a singular line between the new and old coordinates
    draw();

    // Gather points inbetween old and new coordinates
    // const x = lerp(u1, u2, time);
    // const y = lerp(v1, v2, time);

    // Moving circle
    // context.beginPath();
    // context.arc(x, y, 5, 0, Math.PI * 2, false);
    // context.fill();
    // context.closePath();
  };
}, settings);
