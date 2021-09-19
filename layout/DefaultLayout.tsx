import Head from "next/head";
import {ReactNode} from "react";

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>sound-wave-viewer</title>
        <meta name="description" content="音楽再生アプリ" />
      </Head>
      {children}
    </div>
  )
}

export default DefaultLayout
