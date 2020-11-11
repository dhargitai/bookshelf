/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  /* const [user, setUser] = React.useState(async () => {
    const token = await auth.getToken()
    if (token) {
      return (await client('me', {token})).user
    } else {
      return null
    }
  }) */
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    if (user) {
      return
    }
    ;(async () => {
      const token = await auth.getToken()
      if (token) {
        const userResponse = await client('me', {token})
        setUser(userResponse.user)
      } else {
        setUser(null)
      }
    })()
  }, [user])

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}
