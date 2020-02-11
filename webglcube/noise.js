const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Noise
  let noiseArray = [];
  for (let i = 0; i < 10; i++) {
    const noise = Math.abs(random.noise1D(i, 1));
    noiseArray.push(noise);
  }

  console.log(noiseArray);

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
