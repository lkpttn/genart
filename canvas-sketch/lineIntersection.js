const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check to see if lines aren't length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // Is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return the coordinates with x,y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);
    return { x, y };
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    var allLines = [];

    // Start the first line
    let line1 = createLine();
    allLines.push(line1);

    while (allLines.length < 10) {
      var newLine = createLine();
      var stopLine;
      var linesIntersect = false;
      // Test intersection of new line versus all lines
      for (let j = 0; j < allLines.length; j++) {
        let oldLine = allLines[j];
        let intersection = intersect(
          oldLine.x1,
          oldLine.y1,
          oldLine.x2,
          oldLine.y2,
          newLine.x1,
          newLine.y1,
          newLine.x2,
          newLine.y2,
        );

        if (intersection !== false) {
          linesIntersect = true;
          stopLine = {
            x1: newLine.x1,
            y1: newLine.y2,
            x2: intersection.x,
            y2: intersection.y,
          };
        }
      }
      if (linesIntersect == false) {
        allLines.push(newLine);
      } else if (linesIntersect == true) {
        allLines.push(stopLine);
      }
    }

    // Draw the lines
    allLines.forEach(line => {
      const { x1, y1, x2, y2 } = line;

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    });

    // FUNCTIONS ************************************
    function createLine() {
      return {
        x1: random.rangeFloor(0, width),
        y1: random.rangeFloor(0, height),
        x2: random.rangeFloor(0, width),
        y2: random.rangeFloor(0, height),
      };
    }
  };
};

canvasSketch(sketch, settings);
