import { useEffect, useRef } from 'react';
import { Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, Scene, WebGLRenderer } from 'three';

const useIndex = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = (renderer: WebGLRenderer) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new WebGLRenderer({ canvas, antialias: true });
    const camera = new OrthographicCamera(
      -1, // left
       1, // right
       1, // top
      -1, // bottom
      -1, // near,
       1, // far
    );
    const scene = new Scene();
    const plane = new PlaneGeometry(2, 2);
    const material = new MeshBasicMaterial({
        color: 'red',
    });
    scene.add(new Mesh(plane, material));

    renderer.setSize(width, height);
    
    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    window.addEventListener('resize', () => handleResize(renderer), false);

    return () => window.removeEventListener('resize', () => handleResize);
  }, []);

  return {
    canvasRef,
  };
};

export default useIndex;
