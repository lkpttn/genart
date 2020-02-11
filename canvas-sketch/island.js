const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Functions
  const margin = 100;

  const palette = random.pick(palettes);
  const color = random.pick(palette);

  const boxHeight = 50;
  const boxWidth = 150;

  const tilesX = 6;
  const tilesY = 6;

  const tileColumnOffset = boxWidth * 2; // pixels
  const tileRowOffset = boxWidth; // pixels

  const gridWidth = (boxWidth * 2 * (tilesX + tilesY)) / 2;

  const originX = (2048 - gridWidth) / 2; // offset from left
  const originY = 2048 / 2 + margin * 2; // offset from top

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);

    drawTiles();

    function drawTiles() {
      // Nested for loop to create a diamond pattern
      for (let i = tilesX; i > 0; i--) {
        for (let j = 0; j < tilesY; j++) {
          var offsetX =
            (i * tileColumnOffset) / 2 + (j * tileColumnOffset) / 2 + originX;
          var offsetY =
            (j * tileRowOffset) / 2 - (i * tileRowOffset) / 2 + originY;

          var colorNoise = Math.abs(random.noise2D(offsetX, offsetY, 2) * 30);

          // Drop a couple tiles
          if (random.value() > 0.2) {
            drawTile(
              offsetX,
              offsetY,
              boxWidth,
              boxHeight,
              shadeColor(palette[4], colorNoise),
            );
          }
        }
      }
    }

    function drawTile(x, y, sideWidth, height, color) {
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

    function drawHouse(x, y, color) {
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
      context.fillStyle = color;
      context.fill();
    }
  };
};

canvasSketch(sketch, settings);
