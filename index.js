const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to the homepage my guy.')
})

app.listen(3000, () => {
    console.log("Got this far bruv.")
})