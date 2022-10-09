import { IUniform, Mesh, OrthographicCamera, PlaneGeometry, Scene, Shader, ShaderMaterial, Vector3, WebGLRenderer } from 'three';

export class WebGL {
  private static _instance: WebGL

  private _canvas: HTMLCanvasElement | null
  public set canvas(value: HTMLCanvasElement) {
    this._canvas = value
  }

  private _uniforms: { [uniform: string]: IUniform<any> }
  private _scene: Scene
  private _renderer: WebGLRenderer | null
  private _material: ShaderMaterial | null
  private _camera: OrthographicCamera

  constructor() {
    this._canvas = null
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
    if (!this._canvas) return

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

  public render(time: number) {
    if (!this._canvas || !this._renderer) return

    time *= 0.001;
    this._uniforms.iResolution.value.set(this._canvas.width, this._canvas.height, 1);
    this._uniforms.iTime.value = time;
    this._renderer.render(this._scene, this._camera);
  };

  public reset() {
    if (!this._material) return;

    this._material.dispose();
    window.removeEventListener('resize', this._handleResize);
  }
}