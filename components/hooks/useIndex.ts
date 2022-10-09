import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector3, WebGLRenderer } from 'three';
import { Sound } from '~/utils/ts/Sound';
import { WebGL } from '~/utils/ts/WebGL';

const useIndex = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    new Sound();

    const webgl = new WebGL()

    webgl.canvas = canvasRef.current

    webgl.init()

    return () => {
      webgl.reset()
    };
  }, []);

  const onPlayAudioHandler = useCallback(() => {
    const sound = Sound.instance
    sound.playAudioHandler()
  }, [])

  return {
    canvasRef,
    buttonRef,
    onPlayAudioHandler,
  };
};

export default useIndex;
