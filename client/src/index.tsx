import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import Amplify from 'aws-amplify'
import { awsConfig } from './aws-exports'

import * as Highcharts from 'highcharts'
import more from 'highcharts/highcharts-more'
import exporting from 'highcharts/modules/exporting'

import { Provider as StoreProvider } from 'react-redux'
import { store } from './common/redux'

Amplify.configure(awsConfig)

more(Highcharts)
exporting(Highcharts)

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
