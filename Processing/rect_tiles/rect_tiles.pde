void setup() {
  size(600, 600);
  background(0);
  rectMode(CENTER);
  color gray = color(#cccccc, 100);
  fill(gray);

  // Faux margins
  translate(width / 2, height / 2);
  scale(0.9);
  translate(-width / 2, -height / 2);

  int h = height / 11;
  float segments;
  for (int y = 0; y < height; y += h) {
    // Random number of segments
    // segments = int(random(10, 24));
    segments = 3;

    float[] numbers = new float[int(segments)];
    for (int i = 0; i <= segments - 1; i++) {
      numbers[i] = i;
    }

    // shuffle(numbers);
    // println(numbers);
    
    //int cc = int(random(segments * 0.5));
    //for (int i = 0; i < cc; i++) {
    //  numbers = splice();
    //}
    //numbers = sort(numbers);
    
    float boxWidth = width / segments;
    
    for (int i = 0; i < numbers.length; i++) {
      float number = numbers[i];
      float x = number * boxWidth;
      float ww = number * boxWidth;

      rect(x, y + h / 2, boxWidth, h);
      println("Drawing a box with width = " + ww);
      //fill(colors[(i + 3) % colors.length]);
      //superMiracleShape(x + ww / 2, y + h / 2, ww, h);
    }
  }
}

void shuffle (String[] inputArray) {                //We setup the function, 'shuffle'
  String sValue;                                    //This variable is later used to swap two values in the array
  for (int i=0; i<inputArray.length-1; i++) {       //We create a loop from 0 to the length of the array - 1. The i++ means we increase the variable, i, by 1 each time a loop is completed in the for loop.
    int iUpperLimit = inputArray.length-i;          //Here we set what the max range of what our random number can go to. In this example, the value will be 8, then 7, then 6, then 5, then 4, then 3, then 2.
    int iRandomNumber = int(random(iUpperLimit));   //Here we will get a random number which is from 0 to iUpperlimit -1 (Including both 0 and iUpperlimit -1). The random function in Processing chooses a float value that does not include the number specified. Thus, random(8) will only output numbers from 0 to 7 (including 0 and 7). Luckily, array numbering systems work similairly and range from [0] to [7] in this instance. The length of the array will be 8, and so the random function will range from 0 to 7, which is exactly what we want. I also used int() to translate the float value the random function outputs into an integer.
    sValue = inputArray[iRandomNumber];             //Here we use a variable to store the array value which is to be swapped first.
    inputArray[iRandomNumber] =inputArray[iUpperLimit -1]; //We then overwrite the value of that item in the array with the one it is to be swapped with
    inputArray[iUpperLimit-1] =sValue;                //We then overrwrite the other item in the array with the value we stored in sValue. //<>//
  }
}
