const HiscoresApi = require('./lib/HiscoresApi')
const express = require('express')
const app = express()
const port = 3000

const api = new HiscoresApi()

app.get('/stats/:name', (req, res) => {
  api.getStats(req.params.name, req.query.mode).then(data => {
    res.status(data.status)
    res.send(data.body)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
