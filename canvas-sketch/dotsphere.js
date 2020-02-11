const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  const pointNumber = 5000;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context,
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(0, 10, 15);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);
  controls.autoRotate = true;

  // Setup your scene
  const scene = new THREE.Scene();

  // Geometry holds information about a shape
  // Verticies, position, colors, etc
  const geometry = new THREE.Geometry();

  // Create random coordinates and add it as a vertex
  for (let i = 0; i < pointNumber; i++) {
    let point = translateToVector3(random.onSphere(10));
    geometry.vertices.push(point);
  }

  function translateToVector3(array) {
    var v = new THREE.Vector3(array[0], array[1], array[2]);
    return v;
  }

  const material = new THREE.PointsMaterial({
    color: 'white',
    size: 0.1,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Simple Line
  // geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  // geometry.vertices.push(new THREE.Vector3(0, 10, 0));
  // geometry.vertices.push(new THREE.Vector3(10, 0, 0));

  // const material = new THREE.LineBasicMaterial({ color: 'white' });

  // var line = new THREE.Line(geometry, material);
  // scene.add(line);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
