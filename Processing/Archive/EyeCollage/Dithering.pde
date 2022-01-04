
void ditherImage(PImage img, int num, int imgX, int imgY, int imgW, int imgH) {
  img.loadPixels();

  // y first is important
  for (int y = 0; y < img.height-1; y++) {
    for (int x = 1; x < img.width-1; x++) {
      color pixel = img.pixels[index(x, y)];

      float oldR = red(pixel);
      float oldG = green(pixel);
      float oldB = blue(pixel);

      // Calculate a new pixel value by mapping the value to a rounded value between 0..1
      // then scaling back up to the 255 range
      int newR = round(num * oldR / 255) * (180 / num);
      int newG = round(num * oldG / 255) * (180 / num);
      int newB = round(num * oldB / 255) * (180 / num);

      img.pixels[index(x, y)] = color(newR, newG, newB);

      // Get the residual quantization error
      float errorR = oldR - newR;
      float errorG = oldG - newG;
      float errorB = oldB - newB;

      // Calculate a neighboring pixel and push some of the error there
      // 7/16
      int index = index(x+1, y);
      color col = img.pixels[index];
      float r = red(col);
      float g = green(col);
      float b = blue(col);
      r = r + errorR * 7/16.0;
      g = g + errorG * 7/16.0;
      b = b + errorB * 7/16.0;
      img.pixels[index] = color(r, g, b);

      // 3/16
      index = index(x-1, y+1);
      col = img.pixels[index];
      r = red(col);
      g = green(col);
      b = blue(col);
      r = r + errorR * 3/16.0;
      g = g + errorG * 3/16.0;
      b = b + errorB * 3/16.0;
      img.pixels[index] = color(r, g, b);

      // 5/16
      index = index(x, y+1);
      col = img.pixels[index];
      r = red(col);
      g = green(col);
      b = blue(col);
      r = r + errorR * 5/16.0;
      g = g + errorG * 5/16.0;
      b = b + errorB * 5/16.0;
      img.pixels[index] = color(r, g, b);

      // 1/16
      index = index(x+1, y+1);
      col = img.pixels[index];
      r = red(col);
      g = green(col);
      b = blue(col);
      r = r + errorR * 1/16.0;
      g = g + errorG * 1/16.0;
      b = b + errorB * 1/16.0;
      img.pixels[index] = color(r, g, b);
    }
  }
  img.updatePixels();
  image(img, imgX, imgY, imgW, imgH);
}

int index(int x, int y) {
  return x + y * eye.width;
}
