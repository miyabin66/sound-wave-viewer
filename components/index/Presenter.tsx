import { Canvas } from "@react-three/fiber"
import { css } from '@emotion/react'
import Thing from "./Thing"

const container = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Presenter = () => {
  return (
    <div css={container}>
      <Canvas>
        <Thing />
        <gridHelper />
      </Canvas>
    </div>
  )
}

export default Presenter
