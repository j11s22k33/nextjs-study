import '../styles/index.scss'
// import '../styles/globals.css'
import { useStateCallbackWrapper } from '../utils/common.tsx'

function MyApp({ Component, pageProps }) {
  const [, uTmp] = useStateCallbackWrapper(0)
  function updateUI({ useLayoutEffect, useEffect }) {
    uTmp({
      setState: c => c + 1,
      useLayoutEffect,
      useEffect
    })
  }

  return (
    <>
      <Component {...pageProps} updateUI={updateUI} />
    </>
  )
}

export default MyApp
