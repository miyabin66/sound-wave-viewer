import {IndexContextProvider} from '~/contexts/IndexContext'
import DefaultLayout from "~/layouts/DefaultLayout"
import MainIndex from '~/components/Index'

const Index = () => {
  return (
    <IndexContextProvider>
      <DefaultLayout>
        <MainIndex />
      </DefaultLayout>
    </IndexContextProvider>
  )
}

export default Index
