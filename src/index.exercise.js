import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from 'components/logo'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Logo />
      <h1>Bookshelf</h1>
      <div
        style={{
          justifyContent: 'space-between',
          columnGap: '5px',
          display: 'flex',
        }}
      >
        <button onClick={() => alert('Login klikkd')}>Login</button>
        <button onClick={() => alert('Redzsiszter klikkd')}>Register</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
