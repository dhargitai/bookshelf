import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog, DialogContent} from '@reach/dialog'
import '@reach/dialog/styles.css'

const PageState = {
  default: 'default',
  loginDialogOpen: 'loginDialogOpen',
  registerDialogOpen: 'registerDialogOpen',
}

function App() {
  // const [dialogType, setDialogType] = useState('login')
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pageState, setPageState] = useState(PageState.default)

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setPageState(PageState.loginDialogOpen)}>
          Login
        </button>
      </div>
      <div>
        <button onClick={() => setPageState(PageState.registerDialogOpen)}>
          Register
        </button>
      </div>
      {pageState === PageState.loginDialogOpen && (
        <Dialog onDismiss={() => setPageState(PageState.default)}>
          <p>Login</p>
        </Dialog>
      )}
      {pageState === PageState.registerDialogOpen && (
        <Dialog onDismiss={() => setPageState(PageState.default)}>
          <p>Register</p>
        </Dialog>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
