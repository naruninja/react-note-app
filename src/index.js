import 'react-hot-loader'
import 'bulma/css/bulma.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './store'
import { history } from '_/history'
import { BrowserRouter } from 'react-router-dom'

const app_element = document.getElementById('app')

const Root = () => (
   <Provider store={store}>
      <BrowserRouter history={history}>
         <App />
      </BrowserRouter>
   </Provider>
)

ReactDOM.render(<Root />, app_element)
