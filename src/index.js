import 'react-hot-loader'
import 'bulma/css/bulma.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { store } from './store'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '_/inst'

const app_element = document.getElementById('app')

const Root = () => (
   <Provider store={store}>
      <ConnectedRouter history={history}>
         <App />
      </ConnectedRouter>
   </Provider>
)

ReactDOM.render(<Root />, app_element)
