const HiscoresApi = require('./lib/HiscoresApi')
const express = require('express')
const app = express()
const port = 3000

const api = new HiscoresApi()

app.get('/v1/stats/:name', (req, res) => {
  api
    .getStats(req.params.name, req.query.mode)
    .then(data => {
      res.type('json')
      res.status(200)
      res.send(data)
    })
    .catch(e => {
      res.type('json')
      res.status(e.status)
      res.send({ message: e.message })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
