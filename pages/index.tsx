import {IndexContextProvider} from '~/context/IndexContext'
import DefaultLayout from "~/layout/DefaultLayout";

const Index = () => {
  return (
    <IndexContextProvider>
      <DefaultLayout>
        <p>ok</p>
      </DefaultLayout>
    </IndexContextProvider>
  )
}

export default Index
