<!-- filepath: /Users/mahmoudtamaa/projects/proposals/portfolio-custom/.vitepress/theme/components/ThreeScene.vue -->
<template>
    <div ref="threeContainer" :style="{ height }" class="three-container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    props: {
        setupScene: {
          type: Function,
          required: true,
        },
        height: {
          type: String,
          default: '50vh',
        },
      },
    mounted() {
      // Create the Three.js scene
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // Make the renderer match the container size (we'll size to container clientWidth/Height)
      const container = this.$refs.threeContainer;
      const rect = container.getBoundingClientRect();
      this.renderer.setSize(rect.width, rect.height);
      this.$refs.threeContainer.appendChild(this.renderer.domElement);

      // Ensure methods keep the correct `this` when used as callbacks
      this.animate = this.animate.bind(this);
      this.onWindowResize = this.onWindowResize.bind(this);

      // Style the canvas so it fits the container and doesn't block interactions
      const canvas = this.renderer.domElement;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '0';
      canvas.style.pointerEvents = 'none';
  
      // Call the setupScene function to customize the scene
      this.setupScene(this.scene, this.camera, this.renderer);
  
      // Start the animation loop
      this.animate();
      window.addEventListener('resize', this.onWindowResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
      if (this.renderer) {
        // remove canvas from DOM
        try {
          const canvas = this.renderer.domElement;
          if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        } catch (e) {}
        this.renderer.dispose();
        this.renderer = null;
      }
    },
    methods: {
      animate() {
        requestAnimationFrame(this.animate);
        if (this.scene && this.camera && this.renderer) {
          this.renderer.render(this.scene, this.camera);
        }
      },
      onWindowResize() {
        if (!this.camera || !this.renderer) return;
        // Resize renderer to match container
        const container = this.$refs.threeContainer;
        const rect = container.getBoundingClientRect();
        this.camera.aspect = rect.width / rect.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(rect.width, rect.height);
      },
    },
  };
  </script>
  
  <style scoped>
  .three-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }
  </style>