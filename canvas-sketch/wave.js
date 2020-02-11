const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Variables
  const steps = 200;

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.fillRect(0, 0, width, height);

    const y = height / 2;

    context.beginPath();
    context.moveTo(0, y);
    for (let i = 0; i < width; i += steps) {
      context.quadraticCurveTo(i + 10, y, i, y + Math.sin(i) * 50);
      context.arc(i, y + Math.sin(i) * 50, 10, 0, Math.Pi * 2, false);
    }

    context.fillStyle = 'black';
    context.fill();
    context.stroke();
  };
};

canvasSketch(sketch, settings);
