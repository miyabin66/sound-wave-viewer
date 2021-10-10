import { PerspectiveCamera, Scene } from "three";

const useIndex = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

  }

  return {
    onCanvasLoaded
  }
}

export default useIndex;
