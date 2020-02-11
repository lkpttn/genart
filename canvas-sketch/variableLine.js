const canvasSketch = require('canvas-sketch');
const { lerp, degToRad } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1000, 1000],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
    context.strokeStyle = 'black';

    var startX = 50;
    var endX = 950;

    variableThickLine(startX, endX, 360);
    drawNoiseCircle(300, 300, 50);

    // Variable Line **************************
    function variableThickLine(start, end, points, thinMoments) {
      const pointArray = [];

      for (let x = 0; x < points; x++) {
        let u = points <= 1 ? 0.5 : x / (points - 1);
        pointArray.push({
          u: u,
          v: 100,
          rotation: x,
        });
      }

      pointArray.forEach(data => {
        // Destructure the data parameter so we can access the grid object properties
        const u = data.u;
        const v = data.v;
        const rotation = data.rotation;
        const x = lerp(start, end, u);
        drawHatch(x, v, 20, degToRad(rotation));
      });
    }

    function drawHatch(x, y, length, rotation) {
      context.beginPath();
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.moveTo(-length / 2, 0);
      context.lineTo(length / 2, 0);
      context.stroke();
      context.restore();
    }

    // Noise shapes *************************

    function drawNoiseCircle(x, y, radius) {
      context.beginPath();
      context.translate(x, y);
      let points = Math.floor(4 * radius);
      for (let j = 0; j < points + 1; ++j) {
        const angle = (2 * Math.PI * j) / points;

        // Figure out the x/y coordinates for the given angle
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const radius = 100 + 15 * Math.abs(random.noise2D(x, y, 2));
        context.lineTo(radius * x, radius * y);
      }
      context.fill();
    }

    const createGrid = () => {
      const points = [];
      const count = 60;

      // Nested for loop to create x and y coordinates
      for (let x = 0; x < count; x++) {
        for (let y = 0; y < count; y++) {
          // Working in uv space instead of final pixel coordinates
          // For added flexibility
          const u = count <= 1 ? 0.5 : x / (count - 1);
          const v = count <= 1 ? 0.5 : y / (count - 1);

          // Using 2D noise will return relatively similar values that move slowly between -1 and 1
          const radius = 0.03 + Math.abs(random.noise2D(u, v, 2) * 0.05);
          points.push({
            radius: radius,
            color: random.pick(palette),
            rotation: random.noise2D(u, v),
            character: random.pick(symbols),
            postion: [u, v],
          });
        }
      }
      return points;
    };
  };
};

canvasSketch(sketch, settings);
