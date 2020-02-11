const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  // Enable an animation loop
  animate: true,
  dimensions: [512, 512],
  fps: 24,
};

canvasSketch(({ context, width, height }) => {
  // https://inconvergent.net/2016/shepherding-random-numbers/#introduction
  // Causing randomized drifts of nodes

  // https://codepen.io/DonKarlssonSan/post/random-walk
  // Random walker explanation

  // Create a particle
  // Move it step by step
  // Random direction
  // Set interval
  // Repeat forever

  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
  context.lineWidth = 20;

  // The first value of x,y will be the center
  let penX = random.range(0, width);
  let penY = random.range(0, height);

  // Render
  return ({ context, width, height, playhead }) => {
    // Everything in here will be requested fps times per second

    // Restart after the duration is finished
    if (playhead > 0.99) {
      context.fillRect(0, 0, width, height);
      penX = width / 2;
      penY = height / 2;
    }
    // Add random value to previous value
    // constrain distance of movement between -4 and 4

    // We want to choose a random angle and move there instead
    let newY = penY + random.range(-4, 4);
    let newX = penX + random.range(-4, 4);

    // Wrap around boundaries of canvas
    let wrapped = false;
    if (newX > width) {
      newX -= width;
      wrapped = true;
    }
    if (newX < 0) {
      newX += width;
      wrapped = true;
    }
    if (newY > height) {
      newY -= height;
      wrapped = true;
    }
    if (newY < 0) {
      newY += height;
      wrapped = true;
    }

    if (!wrapped) {
      // draw from previous x,y to new x,y
      context.beginPath();
      context.moveTo(penX, penY);
      context.lineWidth = 2;
      context.strokeStyle = '#f05d05';
      context.lineTo(newX, newY);
      context.stroke();
    }

    // save x,y for next frame of animation drawing
    penX = newX;
    penY = newY;
  };
}, settings);
