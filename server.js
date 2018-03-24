const express = require('express')
const consts = require('./consts')

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(consts.PORT, () => console.log(`Listening on port ${consts.PORT}`))