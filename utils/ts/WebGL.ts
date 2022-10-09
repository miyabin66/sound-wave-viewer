import { IUniform, Mesh, OrthographicCamera, PlaneGeometry, Scene, Shader, ShaderMaterial, Vector3, WebGLRenderer } from 'three';

export class WebGL {
  private static _instance: WebGL

  private _canvas: HTMLCanvasElement | null

  private _uniforms: { [uniform: string]: IUniform<any> }
  private _scene: Scene
  private _renderer: WebGLRenderer | null
  private _material: ShaderMaterial | null
  private _camera: OrthographicCamera

  private _drawTimer: number
  public get drawTimer(): number {
    return this._drawTimer
  }

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this._canvas = canvas
    this._uniforms = {
      iTime: { value: 0 },
      iResolution:  { value: new Vector3() },
    }
    this._scene = new Scene();
    this._renderer = null;
    this._material = null;
    this._camera = new OrthographicCamera(
      -1, // left
       1, // right
       1, // top
      -1, // bottom
      -1, // near,
       1, // far
    );
    this._drawTimer = 0;
  }

  private _handleResize() {
    if (!this._renderer) return

    const width = window.innerWidth;
    const height = window.innerHeight;
    this._renderer.setSize(width, height);
  };

  // インスタンス取得
  public static get instance() {
    if (!this._instance) {
      this._instance = new WebGL()
    }

    return this._instance
  }

  public init() {
    const fragmentShader = `
      uniform vec3 iResolution;
      uniform float iTime;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyy + vec3(0, 2, 4));
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this._renderer = new WebGLRenderer({ canvas: this._canvas, antialias: true });
    const plane = new PlaneGeometry(2, 2);
    this._material = new ShaderMaterial({
      fragmentShader,
      uniforms: this._uniforms,
    });
    this._scene.add(new Mesh(plane, this._material));

    this._renderer.setSize(width, height);

    window.addEventListener('resize', this._handleResize, { passive: true });
  }

  public render() {
    console.log(this._canvas)
    if (!this._canvas || !this._renderer) return

    const canvas = this._canvas;
    const uniforms = this._uniforms;
    const renderer = this._renderer;
    const scene = this._scene;
    const camera = this._camera;

    const drowing = (time: number) => {
      time *= 0.001;
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
      uniforms.iTime.value = time;
      renderer.render(scene, camera);

      requestAnimationFrame(drowing)
    }
    this._drawTimer = requestAnimationFrame(drowing);
  };

  public reset() {
    if (!this._material) return;

    this._material.dispose();
    window.removeEventListener('resize', this._handleResize);
  }
}