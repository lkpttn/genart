const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  animate: true,
  dimensions: [1000, 1000],
};

const sketch = () => {
  var colors = [
    '#FF4748',
    '#FF6C5B',
    '#FF9070',
    '#FFAF86',
    '#FFCA9D',
    '#FFDFB4',
    '#FFF0CC',
  ];

  return ({ context, width, height, time, playhead }) => {
    const frequency = 0.01;
    const phase = time;
    const amplitude = height * 0.1;
    const linesAmount = 20;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.translate(0, height / 2);

    context.lineWidth = 2;
    context.strokeStyle = 'white';

    for (let i = 0; i < linesAmount; i++) {
      drawSineWaveHorizontalOffset(frequency, phase, amplitude, i, colors[1]);
    }

    // const bigNumber = 720;
    // const one = 200;

    // for (let i = 0; i < 3; i++) {
    //   context.strokeStyle = colors[i];
    //   for (let j = 0; j < 24; j++) {
    //     context.beginPath();
    //     for (let k = 0; k < bigNumber; k++) {
    //       let qq = i / bigNumber - 1;
    //       let twoPI = Math.PI * 2;
    //       let amplitude = one / 2;

    //       let x = lerp(200, 800, k);
    //       let y =
    //         amplitude +
    //         Math.sin(Math.PI * qq - (twoPI * playhead) / 3 + (twoPI * j) / 24);
    //       context.lineTo(x, y);
    //     }
    //     context.stroke();
    //   }
    // }

    // Draw sine wave
    function drawSineWaveHorizontalOffset(
      frequency,
      phase,
      amplitude,
      iteration,
      color,
    ) {
      const offset = (1 - iteration / linesAmount) * 4;
      let colorFade = `rgba(255, 255, 255, ${iteration / (linesAmount - 1)}`;
      context.beginPath();
      context.strokeStyle = colorFade;
      for (let i = 0; i < width + 4 + Math.abs(offset); i += 4) {
        let y = 0;
        y += Math.sin(i * frequency - phase + offset) * amplitude;
        y += Math.sin(i * 0.02 - phase + offset) * amplitude;
        y += Math.sin(i * 0.04 - phase + offset) * amplitude;

        context.lineTo(i, y);
      }
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
