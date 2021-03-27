import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {AuthProvider} from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>Magia de Luz</title>
        </Head>
        <Navbar/>
        <main>
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </>
  )
  
}

export default MyApp
