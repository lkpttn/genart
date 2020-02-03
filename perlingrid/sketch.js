var increment = 0.02; // Amount of change

function setup() {
  // put setup code here
  createCanvas(200, 200);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  var yoff = 0;
  for (let y = 0; y < height; y++) {
    var xoff = 0; // Reset xoffset for each row
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = 255;
      pixels[index + 2] = 140;
      pixels[index + 3] = 255;

      xoff += increment;
    }
    yoff += increment; // Increment after each row
  }

  updatePixels();
}
