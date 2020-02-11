const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [1125, 2436],
};

const sketch = ({ context, width, height }) => {
  // Variables
  const palette = [
    '#04111A',
    '#04111A',
    '#F7EE99',
    '#918228',
    '#F4E9D5',
    '#767474',
  ];
  const columnWidth = width / 12;
  const rowHeight = height / 6;

  const rows = [];

  // Make rows and columns
  for (let i = 0; i < height; ) {
    for (let j = 0; j < width; ) {
      rows.push({
        x: j,
        y: i,
        color: random.pick(palette),
        marked: random.boolean(),
        markedColor: random.pick(palette),
      });
      j = j + columnWidth;
    }
    i = i + rowHeight;
  }

  console.log(palette);

  // Return
  return ({ context, width, height }) => {
    // Clear palette
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    rows.forEach(data => {
      const { x, y, color, marked, markedColor } = data;

      // Draw the rows and columns
      context.fillStyle = color;
      context.fillRect(x, y, width, y + rowHeight);

      if (marked == true) {
        // Subdivide the space again
        const subHeight = rowHeight / 6;
        let iterator = 0;
        for (let i = 0; i < 6; i++) {
          if (i % 2 == 0) {
            context.fillStyle = markedColor;
            context.fillRect(x, y + iterator, columnWidth, i + subHeight);
          }
          iterator += subHeight;
        }
      }
    });
  };
};

canvasSketch(sketch, settings);
