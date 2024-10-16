
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "react-alice-carousel/lib/alice-carousel.css";
import { Provider } from 'react-redux'
import store from './redux/store/Store.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
)
