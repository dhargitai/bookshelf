import '@reach/dialog/styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'

function App() {
  const [openModal, setOpenModal] = React.useState('none')
  const [loginFormData, setLoginFormData] = React.useState({})

  function onLoginFormChange(event) {
    const formElements = event.currentTarget.elements
    setLoginFormData(
      Object.keys(formElements)
        .filter(isNaN)
        .reduce(
          (newValues, key) => ({
            ...newValues,
            [key]: formElements[key].value,
          }),
          {},
        ),
    )
  }

  function onLoginFormSubmit(event) {
    event.preventDefault()
    const formElements = event.currentTarget.elements
    console.log(
      Object.keys(formElements)
        .filter(isNaN)
        .map(key => `${key}: ${formElements[key].value}`)
        .join(' | '),
    )
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <form onChange={onLoginFormChange} onSubmit={onLoginFormSubmit}>
          <p>
            <label htmlFor="username">
              Username:{' '}
              <input
                id="username"
                defaultValue={loginFormData.username || ''}
              />
            </label>
          </p>
          <p>
            <label htmlFor="password">
              Password:{' '}
              <input
                id="password"
                defaultValue={loginFormData.password || ''}
                type="password"
              />
            </label>
          </p>
          <button type="submit">Send</button>
        </form>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
