function proxy(app) {
  app.get(/^\/$/, function (req, res) {
    res.redirect(301, '/discover')
  })
  return app
}

module.exports = proxy
