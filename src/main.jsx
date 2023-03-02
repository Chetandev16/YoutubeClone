import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import videosReducer from './features/videos'
import toggleReducer from './features/toggle'

const store = configureStore({
  reducer: {
    videos: videosReducer,
    toggle: toggleReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
)
