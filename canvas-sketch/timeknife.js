const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2000, 2000],
};

const sketch = () => {
  const count = 60;
  const margin = 200;

  // Made a grid
  const createGrid = () => {
    const points = [];

    // Nested for loop to create x and y coordinates
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // Working in uv space instead of final pixel coordinates
        // For added flexibility
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  // Render stuff
  return ({ context, width, height }) => {
    const cellSize = (width - margin * 2) / count + 1;
    const corners = {
      left: -cellSize / 2,
      right: cellSize / 2,
      top: -cellSize / 2,
      bottom: cellSize / 2,
      center: 0,
    };
    const patterns = [
      drawHorizontal,
      drawVertical,
      drawPlus,
      drawX,
      slashLeft,
      halfSlashLeft,
      slashRight,
      halfSlashRight,
      tripleSlash,
      largeCircle,
      smallCircle,
      largeSquare,
      smallSquare,
      halfBoxLower,
      halfBoxUpper,
      arcs,
    ];

    // const patterns = [largeSquare, arcs, tripleSlash];
    const pointArray = createGrid();

    // BG
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2;

    // Draw a symbol at each grid point
    pointArray.forEach(data => {
      // Destructure the data parameter so we can access the grid object properties
      const [u, v] = data;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // Translate to that grid point and draw
      context.save();
      context.translate(x, y);
      context.beginPath();
      context.fillStyle = 'rgba(255,255,255,0.3)';
      context.strokeStyle = 'rgba(255,255,255,0.8)';
      // x,y is the center of the grid point so offset by half of cellsize
      if (u + random.value() > 0.6)
        patterns[random.rangeFloor(0, patterns.length)](corners);
      context.beginPath();
      if (u > random.value()) {
        patterns[random.rangeFloor(0, patterns.length)](corners);
      }
      if (u > random.value(0.8, 0.9)) {
        patterns[random.rangeFloor(0, patterns.length)](corners);
      }
      context.restore();
    });

    // Pattern functions
    function drawHorizontal(corners) {
      context.moveTo(corners.left, corners.center);
      context.lineTo(corners.right, corners.center);
      context.stroke();
    }

    function drawVertical(corners) {
      context.moveTo(corners.center, corners.top);
      context.lineTo(corners.center, corners.bottom);
      context.stroke();
    }

    function drawPlus(corners) {
      context.moveTo(corners.left, corners.center);
      context.lineTo(corners.right, corners.center);
      context.moveTo(corners.center, corners.top);
      context.lineTo(corners.center, corners.bottom);
      context.stroke();
    }

    function drawX(corners) {
      context.moveTo(corners.left, corners.top);
      context.lineTo(corners.right, corners.bottom);
      context.moveTo(corners.right, corners.top);
      context.lineTo(corners.left, corners.bottom);
      context.stroke();
    }

    function tripleSlash(corners) {
      context.moveTo(corners.left, corners.top);
      context.lineTo(corners.right, corners.bottom);
      context.moveTo(corners.left, corners.center);
      context.lineTo(corners.center, corners.bottom);
      context.moveTo(corners.center, corners.top);
      context.lineTo(corners.right, corners.center);
      context.stroke();
    }

    function slashLeft(corners) {
      context.moveTo(corners.left, corners.top);
      context.lineTo(corners.right, corners.bottom);
      context.stroke();
    }

    function halfSlashLeft(corners) {
      context.moveTo(corners.center, corners.center);
      context.lineTo(corners.right, corners.bottom);
      context.stroke();
    }

    function slashRight(corners) {
      context.moveTo(corners.right, corners.top);
      context.lineTo(corners.left, corners.bottom);
      context.stroke();
    }

    function halfSlashRight(corners) {
      context.moveTo(corners.right, corners.top);
      context.lineTo(corners.center, corners.center);
      context.stroke();
    }

    function largeCircle(corners) {
      context.arc(0, 0, cellSize / 2, 0, Math.PI * 2, false);
      context.stroke();
    }

    function smallCircle(corners) {
      context.arc(0, 0, cellSize / 4, 0, Math.PI * 2, false);
      context.stroke();
    }

    function largeSquare(corners) {
      context.strokeRect(corners.left, corners.top, cellSize, cellSize);
      context.stroke();
    }

    function smallSquare(corners) {
      context.strokeRect(corners.left, corners.top, cellSize / 2, cellSize / 2);
      context.stroke();
    }

    function halfBoxLower(corners) {
      context.moveTo(corners.left, corners.top);
      context.lineTo(corners.left, corners.bottom);
      context.lineTo(corners.right, corners.bottom);
      context.stroke();
    }

    function halfBoxUpper(corners) {
      context.moveTo(corners.left, corners.top);
      context.lineTo(corners.left, corners.bottom);
      context.lineTo(corners.right, corners.bottom);
      context.stroke();
    }

    function arcs(corners) {
      context.arc(
        corners.left,
        corners.bottom,
        cellSize,
        (3 * Math.PI) / 2,
        0,
        false,
      );
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
