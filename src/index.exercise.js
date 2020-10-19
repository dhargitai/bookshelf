import '@reach/dialog/styles.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'

function collectFormValues(formElements) {
  return Object.keys(formElements)
    .filter(isNaN)
    .reduce(
      (newValues, key) => ({
        ...newValues,
        [key]: formElements[key].value,
      }),
      {},
    )
}

function App() {
  const [openModal, setOpenModal] = React.useState('none')

  function onSubmit(formValues) {
    console.log(formValues)
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
        <LoginForm onSubmit={onSubmit} />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <RegisterForm onSubmit={onSubmit} />
      </Dialog>
    </div>
  )
}

function LoginForm({onSubmit}) {
  const [loginFormData, setLoginFormData] = React.useState({})

  function onFormChange(event) {
    setLoginFormData(collectFormValues(event.currentTarget.elements))
  }

  return (
    <form
      onChange={onFormChange}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(collectFormValues(event.target.elements))
      }}
    >
      <p>
        <label htmlFor="username">
          Username:{' '}
          <input id="username" defaultValue={loginFormData.username || ''} />
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
      <button type="submit">Log in</button>
    </form>
  )
}

function RegisterForm({onSubmit}) {
  const [registerFormData, setRegisterFormData] = React.useState({})

  function onFormChange(event) {
    setRegisterFormData(collectFormValues(event.currentTarget.elements))
  }

  return (
    <form
      onChange={onFormChange}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(collectFormValues(event.target.elements))
      }}
    >
      <p>
        <label htmlFor="username">
          Username:{' '}
          <input id="username" defaultValue={registerFormData.username || ''} />
        </label>
      </p>
      <p>
        <label htmlFor="password">
          Password:{' '}
          <input
            id="password"
            defaultValue={registerFormData.password || ''}
            type="password"
          />
        </label>
      </p>
      <button type="submit">Register</button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
