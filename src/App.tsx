import React from 'react'
import './App.scss'
import { Converter } from './containers/Converter'
import { Exchanges } from './containers/Exchanges'

const App: React.FC = () => {
  return (
    <div className="App">
      <Exchanges />
      <Converter />
    </div>
  )
}

export default App
