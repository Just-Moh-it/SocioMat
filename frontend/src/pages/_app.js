import { RecoilRoot } from "recoil";
import '../styles/globals.scss'

const App = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default App;
