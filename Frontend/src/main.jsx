import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/Store.js'
import SearchContextProvider from './SearchContext/SearchContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </SearchContextProvider>
  </StrictMode>,
)
