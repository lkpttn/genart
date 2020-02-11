const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [500, 500],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.translate(width / 2, height / 2);

    drawCube(0, 100, 150, 50, '#4434f4');

    function drawHouse(x, y) {
      // Side
      context.beginPath();
      context.moveTo(x - 75, y - 35);
      context.lineTo(x - 75, y - 60);
      context.lineTo(x - 25, y - 43);
      context.lineTo(x - 25, y - 18);
      context.lineTo(x - 75, y - 35);
      context.stroke();
      context.fill();

      // Front
      context.beginPath();
      context.moveTo(x - 25, y - 18);
      context.lineTo(x - 25, y - 50);
      context.lineTo(x - 15, y - 70);
      context.lineTo(x - 3, y - 52);
      context.lineTo(x - 3, y - 24);
      context.lineTo(x - 25, y - 18);
      context.stroke();

      // Roof
      context.beginPath();
      context.moveTo(x - 15, y - 70);
      context.lineTo(x - 60, y - 85);
      context.lineTo(x - 78, y - 55);
      context.lineTo(x - 28, y - 39);
      context.lineTo(x - 15, y - 70);
      context.stroke();
      context.fill();
    }

    function drawCube(x, y, sideWidth, height, color) {
      // Left side
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x - sideWidth, y - sideWidth * 0.5);
      context.lineTo(x - sideWidth, y - height - sideWidth * 0.5);
      context.lineTo(x, y - height);
      context.closePath();
      context.fillStyle = shadeColor(color, -10);
      context.strokeStyle = color;
      context.stroke();
      context.fill();

      // Right side
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + sideWidth, y - sideWidth * 0.5);
      context.lineTo(x + sideWidth, y - height - sideWidth * 0.5);
      context.lineTo(x, y - height);
      context.closePath();
      context.fillStyle = shadeColor(color, 10);
      context.strokeStyle = shadeColor(color, 50);
      context.stroke();
      context.fill();

      // Top side
      context.beginPath();
      context.moveTo(x, y - height);
      context.lineTo(x - sideWidth, y - height - sideWidth * 0.5);
      context.lineTo(
        x - sideWidth + sideWidth,
        y - height - (sideWidth * 0.5 + sideWidth * 0.5),
      );
      context.lineTo(x + sideWidth, y - height - sideWidth * 0.5);
      context.closePath();
      context.fillStyle = shadeColor(color, 20);
      context.strokeStyle = shadeColor(color, 60);
      context.stroke();
      context.fill();
    }

    function shadeColor(color, percent) {
      color = color.substr(1);
      var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = ((num >> 8) & 0x00ff) + amt,
        B = (num & 0x0000ff) + amt;
      return (
        '#' +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)
      );
    }

    function drawBox(x, y) {
      //
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.fillStyle = 'white';

      // Top face
      context.beginPath();
      context.moveTo(x - 150, y - 25);
      context.lineTo(x, y + 25);
      context.lineTo(x + 150, y - 25);
      context.lineTo(x, y - 75);
      context.lineTo(x - 150, y - 25);
      context.stroke();
      context.fill();

      // Bottom half
      context.beginPath();
      context.moveTo(x - 150, y - 25);
      context.lineTo(x - 150, y + 25);
      context.lineTo(x, y + 75);
      context.lineTo(x + 150, y + 25);
      context.lineTo(x + 150, y - 25);
      context.lineTo(x, y + 25);
      context.lineTo(x - 150, y - 25);
      context.fill();
      context.moveTo(x, y + 25);
      context.lineTo(x, y + 75);
      context.stroke();

      // Center circle
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2, false);
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);

// CODEPEN CUBE
// http://nick-aschenbach.github.io/blog/2015/02/25/isometric-tile-engine/
// https://codepen.io/AshKyd/pen/JYXEpL
// function drawCube(x, y, wx, wy, h, color) {
//   context.beginPath();
//   context.moveTo(x, y);
//   context.lineTo(x - wx, y - wx * 0.5);
//   context.lineTo(x - wx, y - h - wx * 0.5);
//   context.lineTo(x, y - h * 1);
//   context.closePath();
//   context.fillStyle = shadeColor(color, -10);
//   context.strokeStyle = color;
//   context.stroke();
//   context.fill();

//   context.beginPath();
//   context.moveTo(x, y);
//   context.lineTo(x + wy, y - wy * 0.5);
//   context.lineTo(x + wy, y - h - wy * 0.5);
//   context.lineTo(x, y - h * 1);
//   context.closePath();
//   context.fillStyle = shadeColor(color, 10);
//   context.strokeStyle = shadeColor(color, 50);
//   context.stroke();
//   context.fill();

//   context.beginPath();
//   context.moveTo(x, y - h);
//   context.lineTo(x - wx, y - h - wx * 0.5);
//   context.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
//   context.lineTo(x + wy, y - h - wy * 0.5);
//   context.closePath();
//   context.fillStyle = shadeColor(color, 20);
//   context.strokeStyle = shadeColor(color, 60);
//   context.stroke();
//   context.fill();
// }
