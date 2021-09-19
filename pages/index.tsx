import {IndexContextProvider} from '~/context/IndexContext'
import DefaultLayout from "~/layout/DefaultLayout";
import {css} from "@emotion/react";
import useIndex from '~/hooks/useIndex'

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

const Index = () => {
  const {} = useIndex()
  return (
    <IndexContextProvider>
      <DefaultLayout>
        <div css={indexContainer}>
          <canvas css={canvasStyle} />
        </div>
      </DefaultLayout>
    </IndexContextProvider>
  )
}

export default Index
