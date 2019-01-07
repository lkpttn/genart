const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  // Enable an animation loop
  animate: true,
  dimensions: [512, 512],
  duration: 4,
  playbackRate: 'throttle',
  fps: 24,
};

canvasSketch(() => {
  // https://inconvergent.net/2016/shepherding-random-numbers/#introduction
  // Causing randomized drifts of nodes
  const nodes = 17;
  const margin = 100;
  let drift = 0;

  // This is only returning one random value per run, duh
  let randomY = random.range(margin, 512 - margin);

  // Render
  return ({ context, width, height, playhead }) => {
    // Everything in here will be rendered 24 times per second

    const position = {
      oldPoints: [width / 2, 100],
      newPoints: [width / 2, 300],
    };

    // Renew the white bg every frame
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Grab random xy coodinates
    const { oldPoints, newPoints } = position;
    let [u1, v1] = oldPoints;
    const [u2, v2] = newPoints;

    // Gather points inbetween old and new coordinates
    const x = lerp(u1, u2, playhead);
    const y = lerp(v1, v2, playhead);

    context.stokeStyle = 'black';
    context.fillStyle = 'black';

    // Old location circle
    context.beginPath();
    context.arc(u1, v1, 5, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

    // New location circle
    context.beginPath();
    context.arc(u2, v2, 5, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

    // Moving circle
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
  };
}, settings);
