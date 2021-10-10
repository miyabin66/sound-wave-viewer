import { useEffect, useRef } from 'react';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector3, WebGLRenderer } from 'three';

const useIndex = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = (renderer: WebGLRenderer) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
  };

  const fragmentShader = `
    uniform vec3 iResolution;
    uniform float iTime;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy;
      vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyy + vec3(0, 2, 4));
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const uniforms = {
    iTime: { value: 0 },
    iResolution:  { value: new Vector3() },
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
    const material = new ShaderMaterial({
      fragmentShader,
      uniforms,
    });
    scene.add(new Mesh(plane, material));

    renderer.setSize(width, height);
    
    const render = (time: number) => {
      time *= 0.001;
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
      uniforms.iTime.value = time;
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
