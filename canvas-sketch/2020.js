const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    var dimX = width;
    var dimY = height;
    var crackGrid = [];

    crackGrid.push(dimX * dimY);

    class SandPainter {
      constructor(color, gain) {
        color = '#000000',
        gain = '0.05'
      }
    }

    render(x, y, ox, oy) {
      // Modulate gain
      gain += random.range(-0.50, 0.50);
      var maxGain = 1.0;
      if (gain < 0) {
        gain = 0;
      }
      if (gain > maxGain) {
        gain = maxGain;
      }

      // Calculate grains by distance
      var grains = 64;

      // Lay down grains (transparent pixels)
      var w = gain/(grains - 1);
      for(let i = 0; i < grains; i++) {
        let alpha = 0.1 - i/(grains*10.0);
        context.strokeStyle=`rgba(0,0,0,${alpha})`;
        context.beginPath();
        context.arc(ox+(x-ox)*Math.sin(Math.sin(i*w)), oy+(y-oy)*Math.sin(Math.sin(i*w)), 1, 0, Math.PI * 2, false);
        context.strokeStyle();
      }
    }

    class Crack {
      constructor(x, y, travel, painter) {
        painter = new SandPainter;
      }

      findStart() {
        // Pick random point
        var pointX = 0;
        var pointY = 0;

        // Shift until crack is found
        var found = false;
        var timeout = 0;
        while((!found) || (timeout++>1000)) {
          pointX = random.rangeFloor(dimX);
          pointY = random.rangeFloor(dimY);
          if(crackGrid[pointY*dimX*pointX]<10000) {
            found = true;
          }
        }
        if (found) {
          // Start crack
        }
      }

    }
  };
};

canvasSketch(sketch, settings);
