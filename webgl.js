const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  dimensions: [512, 512],
  fps: 24,
  duration: 4,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context,
  });

  // WebGL background color
  renderer.setClearColor('#F2F2F2', 1.0);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera);
  controls.autoRotate = false;
  controls.autoRotateSpeed = Math.PI * 2;

  // Setup your scene
  const scene = new THREE.Scene();

  const palette = random.pick(palettes);

  // Create the mesh once, use it many times
  const box = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 40; i++) {
    mesh = new THREE.Mesh(
      box,
      new THREE.MeshStandardMaterial({
        color: random.pick(palette),
        wireframe: false,
      }),
    );
    mesh.position.set(
      random.range(-2, 2),
      random.range(-2, 2),
      random.range(-2, 2),
    );
    mesh.scale.set(random.range(0.5, 2), 5, random.range(1, 1.5));

    // Multiply all xyz by this value
    mesh.scale.multiplyScalar(0.5);
    scene.add(mesh);
  }

  // Light
  scene.add(new THREE.AmbientLight('white'));
  const light = new THREE.DirectionalLight('#white', 0.4);
  light.position.set(0, 4, 0);
  const sideLight = new THREE.DirectionalLight('#white', 0.4);
  sideLight.position.set(4, 4, 0);
  scene.add(sideLight);
  scene.add(light);

  console.log(scene.children);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 4;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead }) {
      // Playhead is 0 to 1 for our defined duration, so * 2PI gives us a full circle (loop)
      const t = playhead * Math.PI * 2;
      for (let i = 0; i < scene.children.length - 2; i++) {
        // Each cube is getting a unique waveform based on it's index
        scene.children[i].position.y = Math.sin(t + i);
      }

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
