require('react-hot-loader')
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { App } from './App'
import { store } from './store'
import { history } from '_/history'

const app_element = document.getElementById('app')

const Root = () => (
   <Provider store={store}>
      <Router history={history}>
         <App />
      </Router>
   </Provider>
)

ReactDOM.render(<Root />, app_element)
