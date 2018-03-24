const express = require('express')
const consts = require('./consts')
const routes = require('./routes/endpoints')

const app = express()

// Middlewares for json handeling and body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load all the app routes
app.use('/', routes)

app.listen(consts.PORT, () => console.log(`Listening on port ${consts.PORT}`))