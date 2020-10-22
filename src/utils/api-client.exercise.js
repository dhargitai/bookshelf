function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return new Promise((resolve, reject) => {
    window
      .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
      .then(result => result.json())
      .then(resolve)
      .catch(reject)
  })
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
