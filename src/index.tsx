import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './style/Global.scss'
import './style/Code.scss'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
