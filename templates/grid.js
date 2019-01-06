// Makes an evenly spaced grid of dot/circles surrounded by the margin value

const sketch = () => {
  // Make the grid
  const createGrid = () => {
    const points = [];
    const count = 20;

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

  const points = createGrid();
  const margin = 300;

  // Render
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      // Destructure the data parameter so we can access the grid object properties
      const [u, v] = data;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // fill the grid with circles
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2, false);
      context.fillStyle = 'black';
      context.fill();
    });
  };
};
