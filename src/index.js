import './index.css'

import { App } from './components'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
    
registerServiceWorker()
