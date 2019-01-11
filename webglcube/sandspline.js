const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Number of lines in the grid
  const count = 30;
  const xyPoints = 30;

  const createLine = x => {
    const line = [];

    // Creates #count lines starting at the x value
    for (let i = 0; i < xyPoints; i++) {
      const points = [];
      for (let y = 0; y < xyPoints; y++) {
        // The line should get more sporadic as y increases, tempered by x
        // y increases constantly 0..1
        // x increases by random value between -y/xyPoints and y/xyPoints  y bounded at 0?
        const u =
          count <= 1
            ? 0.5
            : (x + random.range(-1 * (y / xyPoints), y / xyPoints)) /
              (xyPoints - 1);
        const v = count <= 1 ? 0.5 : y / (xyPoints - 1);

        points.push([u, v]);
      }

      line.push(points);
    }
    return line;
  };

  const createLineGrid = () => {
    const lineGrid = [];

    // Create a line at x value of count
    for (let i = 0; i < count; i++) {
      console.log('Creating a set of lines at ' + count);
      lineGrid.push(createLine(i));
    }

    return lineGrid;
  };

  const lineGrid = createLineGrid();
  console.log(lineGrid);
  const margin = 300;

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = 'rgba(255,255,255,0.1)';
    context.lineWidth = (0.01 * width) / 10;

    // Take apart the lineGrid to get to each line
    // Which is really #count lines
    // Each made up of points
    for (let i = 0; i < lineGrid.length; i++) {
      const line = lineGrid[i];

      for (let j = 0; j < line.length; j++) {
        const pointArray = line[j];

        context.beginPath();
        moveTo(pointArray[0][0], pointArray[0][1]);
        for (let k = 0; k < pointArray.length; k++) {
          // Lerp back up to the regular value
          let x = lerp(margin, width - margin, pointArray[k][1]);
          let y = lerp(margin, width - margin, pointArray[k][0]);
          context.lineTo(x, y);
        }

        // Draw the actual line
        context.stroke();
      }
    }

    // Turn each item in line array into a separate line
  };
};

canvasSketch(sketch, settings);
