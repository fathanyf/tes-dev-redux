import '../../styles/custom.css'
import Navbar from '../components/main-components/Navbar'
import { wrapper } from '../store'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar/>
      <Component {...pageProps} />
    </>
  )

}

export default wrapper.withRedux(MyApp) 
