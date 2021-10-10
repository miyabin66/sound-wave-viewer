import { useEffect, useRef } from 'react';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

const useIndex = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);
    const renderer = new WebGLRenderer({ canvas, antialias: true });

    renderer.setClearColor('#000000');
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    window.addEventListener('resize', () => handleResize(camera, renderer), false);

    return () => window.removeEventListener('resize', () => handleResize);
  }, []);

  return {
    canvasRef,
  };
};

export default useIndex;
