import 'bootstrap/dist/css/bootstrap.min.css'
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './components/App'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
