const express = require('express')
const app = express()

const { port } = require('../config')
console.log(port)

app.get('/', (req, res) => {
  res.send('Probando github actions!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})