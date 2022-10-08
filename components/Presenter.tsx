import {css} from '@emotion/react';
import useIndex from '~/components/hooks/useIndex';

const indexContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const canvas = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const button = css`
  position: relative;
`

const Presenter = () => {
  const { canvasRef, buttonRef, onPlayAudioHandler } = useIndex();

  return (
    <div css={indexContainer}>
      <canvas css={canvas} ref={canvasRef} />
      <button css={button} ref={buttonRef} onClick={onPlayAudioHandler}>▷</button>
    </div>
  );
};

export default Presenter;
