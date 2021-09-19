import {css} from "@emotion/react"
import useIndex from '~/components/hooks/useIndex'

const indexContainer = css`
  position: relative;
`

const canvasStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const Presenter = () => {
  const {} = useIndex

  return (
    <div css={indexContainer}>
      <canvas css={canvasStyle} />
    </div>
  )
}

export default Presenter
