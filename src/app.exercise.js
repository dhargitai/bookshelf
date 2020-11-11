/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import * as auth from 'auth-provider'
import {client} from './utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {useAsync} from 'utils/hooks'
import * as colors from './styles/colors'
import {FullPageSpinner} from 'components/lib'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    user = (await client('me', {token})).user
  }

  return user
}

function App() {
  const {isIdle, isLoading, isError, setData, error, data} = useAsync(null)

  React.useEffect(() => {
    getUser().then(u => setData(u))
  }, [])

  const login = form => auth.login(form).then(u => setData(u))
  const register = form => auth.register(form).then(u => setData(u))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  } else if (isIdle || isLoading) {
    return <FullPageSpinner />
  }

  return data ? (
    <AuthenticatedApp user={data} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}
