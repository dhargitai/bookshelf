function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
      const resonseJSON = await response.json()
      if (resonseJSON?.status >= 400) {
        throw new Error(resonseJSON?.message)
      }
      return resonseJSON
    })
}

export {client}
