const canvasSketch = require('canvas-sketch');
const { lerp, degToRad } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1000, 1000],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'black';

    var startX = 100;
    var endX = 900;

    variableThickLine(startX, endX, 60);

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
        drawHatch(x, v, 40, degToRad(rotation));
      });

      // Vector is made between start and end

      // Hatchmark at start of vector and oriented parallel to vector

      // for each thickMoment
      // determine rotationAmount by dividing  180 by the number of copies needed
      // while thiuckMoment has not been reached
      // copy hatchmark in the direction of vector and rotate by rotationAmount
      // determine rotationAmount to reach endPoint
      // while the endPoint has not been reached
      // copy hatchmark in the direction of vector and rotate by rotationamount
    }

    function drawHatch(x, y, length, rotation) {
      context.beginPath();
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.moveTo(0, 0);
      context.lineTo(length, 0);
      context.stroke();
      context.restore();
      console.log('Draw a line');
    }
  };
};

canvasSketch(sketch, settings);
